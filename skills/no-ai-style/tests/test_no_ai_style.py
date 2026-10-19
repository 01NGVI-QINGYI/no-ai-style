"""Offline behavior checks for No AI Style's optional utilities."""
import importlib.util
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def load(name):
    spec = importlib.util.spec_from_file_location(name, ROOT / 'scripts' / f'{name}.py')
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


audit = load('audit_prose')
compare = load('compare_anchors')


class TestAuditor(unittest.TestCase):
    def test_empty_intro(self):
        self.assertIn('empty-preface', {r['rule'] for r in audit.scan('It is worth noting that 18 users participated.', 'en')})

    def test_protect_real_hedge(self):
        self.assertEqual(audit.scan('The findings may suggest an association.', 'en'), [])

    def test_redundant_modal_english(self):
        self.assertIn('stacked-uncertainty', [r['rule'] for r in audit.scan('This may potentially be useful.', 'en')])

    def test_chinese(self):
        self.assertTrue(audit.scan('众所周知，这个问题可能或许存在。', 'zh'))

    def test_japanese(self):
        self.assertTrue(audit.scan('可能性があるかもしれない。', 'ja'))

    def test_skip_code_block(self):
        self.assertEqual(audit.scan('```\nIt is worth noting that\n```', 'en'), [])

    def test_flag_placeholder(self):
        x = audit.scan('The result was meaningful [VERIFY: numerical estimate].')
        self.assertEqual(x[0]['severity'], 'high')

    def test_evidence_gap_is_high_severity(self):
        flagged = audit.scan('There were [EVIDENCE GAP: missing sample counts].')
        self.assertEqual(flagged[0]['severity'], 'high')

    def test_interpretation_flag_is_medium_severity(self):
        flagged = audit.scan('This effect has [INTERPRETATION FLAG: unclear direction].')
        self.assertEqual(flagged[0]['severity'], 'medium')

    def test_no_banlist(self):
        self.assertEqual(audit.scan('We found no statistically significant difference.', 'en'), [])


class TestMarkup(unittest.TestCase):
    def test_multiline_comments_and_visible_suffix(self):
        rows = audit.scan('<!--\nIt is worth noting that hidden.\n--> It is worth noting that visible.', 'en')
        self.assertEqual([(r['line'], r['start'], r['rule']) for r in rows], [(3, 5, 'empty-preface')])

    def test_inline_comment_preserves_columns(self):
        line = '<!-- hidden --> It is worth noting that visible.'
        rows = audit.scan(line, 'en')
        self.assertEqual(rows[0]['start'], line.index('It is') + 1)

    def test_multiple_comments(self):
        self.assertEqual(audit.scan('<!-- needless to say --> clean <!-- might possibly -->', 'en'), [])

    def test_unclosed_fence_is_reported(self):
        rows = audit.scan('```python\nIt is worth noting that hidden.', 'en')
        self.assertEqual([(r['line'], r['rule'], r['severity']) for r in rows], [(1, 'unclosed-code-fence', 'high')])

    def test_shorter_fence_does_not_close(self):
        rows = audit.scan('````\n```\nIt is worth noting that hidden.\n````\nIt is worth noting that visible.', 'en')
        self.assertEqual([r['line'] for r in rows], [5])

    def test_quoted_tilde_fence_and_crlf(self):
        rows = audit.scan('> ~~~\r\n> It is worth noting that hidden.\r\n> ~~~\r\nIt is worth noting that visible.', 'en')
        self.assertEqual([r['line'] for r in rows], [4])

    def test_unclosed_comment_is_reported(self):
        rows = audit.scan('<!--\nIt is worth noting that hidden.', 'en')
        self.assertEqual([(r['rule'], r['severity']) for r in rows], [('unclosed-html-comment', 'high')])

    def test_url_mask_preserves_columns(self):
        line = 'https://example.org/path It is worth noting that visible.'
        self.assertEqual(audit.scan(line, 'en')[0]['start'], line.index('It is') + 1)

    def test_markup_in_code_does_not_start_comment(self):
        self.assertEqual(audit.scan('```html\n<!--\n```\nPlain text.', 'en'), [])


class TestAnchors(unittest.TestCase):
    def test_detect_numeric_change(self):
        r = compare.compare('Accuracy was 81%.', 'Accuracy was 88%.')
        self.assertIn('81%', r['removed_anchors'])
        self.assertIn('88%', r['added_anchors'])

    def test_no_change(self):
        r = compare.compare('In 2025 we tested 30 participants.', 'We tested 30 participants in 2025.')
        self.assertEqual(r['removed_anchors'], {})
        self.assertEqual(r['added_anchors'], {})

    def test_citations(self):
        r = compare.compare('see [12]', 'see [13]')
        self.assertTrue(r['removed_anchors'] or r['added_anchors'])

    def test_ignores_code(self):
        r = compare.compare('```\n500\n```\nResult 20%', '```\n900\n```\nResult 20%')
        self.assertEqual(r['removed_anchors'], {})


class TestSkillInstructions(unittest.TestCase):
    """Instruction checks; not a model behavior test."""

    @classmethod
    def setUpClass(cls):
        cls.skill = (ROOT / 'SKILL.md').read_text(encoding='utf-8')
        cls.lang = (ROOT / 'references' / 'language-notes.md').read_text(encoding='utf-8')

    def test_chinese_academic_rules_present(self):
        for token in ('**Chinese academic:**', '笔者认为', '研究表明',
                      '相关', '导致', '倾向于'):
            self.assertIn(token, self.skill)

    def test_multilingual_evidential_hedges(self):
        for token in ('`may`', '`suggest`', '`可能`', '`或许`',
                      '`示唆する`', '`と考えられる`'):
            self.assertIn(token, self.skill)

    def test_backcheck_failure_behavior(self):
        self.assertIn('If 5.1 (anchors) or 5.2', self.skill)
        self.assertIn('report the failure and the required author input', self.skill)
        self.assertNotIn('Stop at the first failure', self.skill)

    def test_delivery_surface_wording(self):
        self.assertIn('must not reference\ndiscarded conversations', self.skill)
        self.assertNotIn('must not advertise', self.skill)

    def test_language_notes_chinese_distinctions(self):
        for token in ('笔者认为', '研究表明', '相关', '导致', '可能', '或许'):
            self.assertIn(token, self.lang)


class TestCompactGuidance(unittest.TestCase):
    """Keep boundaries actionable and avoid repeated disclaimer paragraphs."""

    @classmethod
    def setUpClass(cls):
        cls.skill = (ROOT / 'SKILL.md').read_text(encoding='utf-8')
        cls.readme = (ROOT.parents[1] / 'README.md').read_text(encoding='utf-8')

    def test_single_readme_detector_boundary(self):
        self.assertEqual(self.readme.lower().count('ai-detector'), 1)
        self.assertNotIn('plagiarism or AI-authorship certificates', self.readme)

    def test_backcheck_remains_operational(self):
        for phrase in ('Gate 2 (truth boundary) always wins',
                       'If 5.1 (anchors) or 5.2',
                       'report the failure and the required author input',
                       'Treat script findings as review flags'):
            self.assertIn(phrase, self.skill)

    def test_attribution_and_unknown_markers_remain(self):
        for phrase in ('retain attribution', '[EVIDENCE GAP]', '[INTERPRETATION FLAG]'):
            self.assertIn(phrase, self.skill)
        self.assertIn('blocks `ready`', self.readme)

    def test_no_repeated_defensive_script_language(self):
        self.assertNotIn('A clean report is not proof', self.skill)
        self.assertNotIn('never certify plagiarism freedom', self.skill)


if __name__ == '__main__':
    unittest.main()
