window.__ModuleLoader__.load({
  id: "no-ai-style",
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;
    Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
    'use strict';
    
    const React = require('react');
    const { createPortal } = require('react-dom');
    const h = React.createElement;
    const NS = 'no-ai-style';
    const STYLE_ID = 'dsh-no-ai-style-client-styles';
    
    const CSS = `
    .dsh-nas-root { position: relative; display: inline-flex; }
    .dsh-nas-trigger {
      display: inline-flex; align-items: center; justify-content: center; gap: 5px;
      height: 28px; padding: 0 10px; border: 0; border-radius: 14px;
      color: var(--dsw-alias-label-secondary, currentColor);
      background: transparent; cursor: pointer; font: inherit; line-height: 1;
    }
    .dsh-nas-trigger:hover { background: var(--dsw-alias-interactive-bg-hover, rgba(127,127,127,.16)); }
    .dsh-nas-trigger:focus-visible, .dsh-nas-option:focus-visible,
    .dsh-nas-action:focus-visible, .dsh-nas-close:focus-visible {
      outline: 2px solid var(--dsw-alias-state-business-primary, #4c84f4); outline-offset: 2px;
    }
    .dsh-nas-trigger-icon { font-size: 15px; line-height: 1; }
    .dsh-nas-trigger-label { font-size: 12px; line-height: 1; white-space: nowrap; }
    .dsh-nas-panel {
      position: fixed; z-index: 10000; box-sizing: border-box;
      width: min(340px, calc(100vw - 24px)); max-height: min(420px, calc(100vh - 24px));
      overflow-y: auto; padding: 12px;
      color: var(--dsw-alias-label-primary, #e6e8ee);
      background: var(--dsw-specific-tip, #202126);
      border: .5px solid var(--dsw-alias-border-l1, rgba(127,127,127,.35));
      border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,.28);
    }
    .dsh-nas-heading { display: flex; align-items: center; gap: 8px; margin: 0 0 4px; font-size: 14px; font-weight: 600; }
    .dsh-nas-hint { margin: 0 0 10px; color: var(--dsw-alias-label-tertiary, #92959d); font-size: 12px; line-height: 1.5; }
    .dsh-nas-options { display: flex; flex-direction: column; gap: 6px; }
    .dsh-nas-option {
      display: flex; flex-direction: column; align-items: flex-start; gap: 3px;
      width: 100%; padding: 8px 10px; border: .5px solid var(--dsw-alias-border-l1, rgba(127,127,127,.35));
      border-radius: 9px; color: var(--dsw-alias-label-primary, inherit);
      background: var(--dsw-alias-bg-base, transparent); text-align: left; cursor: pointer; font: inherit;
    }
    .dsh-nas-option:hover { background: var(--dsw-alias-interactive-bg-hover, rgba(127,127,127,.16)); }
    .dsh-nas-option[aria-checked="true"] { border-color: var(--dsw-alias-state-business-primary, #4c84f4); }
    .dsh-nas-option-title { font-size: 13px; font-weight: 500; line-height: 1.4; }
    .dsh-nas-option-desc { color: var(--dsw-alias-label-tertiary, #92959d); font-size: 11px; line-height: 1.45; }
    .dsh-nas-feedback { margin: 8px 0 0; color: var(--dsw-alias-state-error-primary, #e88484); font-size: 12px; line-height: 1.45; }
    .dsh-nas-footer { display: flex; justify-content: flex-end; gap: 8px; margin-top: 10px; }
    .dsh-nas-action {
      min-height: 28px; padding: 5px 11px; border: 0; border-radius: 7px;
      color: var(--dsw-alias-label-primary, inherit); background: var(--dsw-alias-interactive-bg-hover, rgba(127,127,127,.16));
      cursor: pointer; font: inherit; font-size: 12px;
    }
    .dsh-nas-action:hover:not(:disabled) { filter: brightness(1.08); }
    .dsh-nas-action:disabled { opacity: .45; cursor: default; }
    .dsh-nas-action-primary { color: #fff; background: var(--dsw-alias-button-info-fill, #3f76e1); }
    `;
    
    const zh = {
      'button.label': 'no ai style',
      'button.title': 'No AI Style 模式',
      'panel.title': '选择模式',
      'panel.hint': '选中的指令会插入到现有文字前面。',
      'mode.audit': '检查',
      'mode.audit.description': '只检查并给建议；询问能否提交时补充结论，不改原文。',
      'mode.revise': '润色',
      'mode.revise.description': '改善表达，保留原意、事实和引用。',
      'mode.compose': '起草',
      'mode.compose.description': '根据现有材料起草，不补充材料外的事实。',
      'prompt.audit': '请用 no-ai-style 检查文本，只指出问题和建议，不要直接修改。',
      'prompt.revise': '请用 no-ai-style 润色文本，保留原意、事实、数据和引用。',
      'prompt.compose': '请用 no-ai-style 根据材料起草文本，不要补充材料中没有的事实。',
      'button.cancel': '取消',
      'button.insert': '插入到输入框',
      'error.busy': '输入框正在提交，请稍后再试。',
      'error.references': '为保留文件或命令引用，此版本 DSH 无法安全插入。请先移除引用，或更新 DSH。',
      'error.changed': '草稿刚刚发生变化，未插入指令。请再试一次。',
      'error.unavailable': '当前输入框不支持插入操作。',
    };
    
    const en = {
      'button.label': 'no ai style',
      'button.title': 'No AI Style modes',
      'panel.title': 'Choose a mode',
      'panel.hint': 'The selected instruction will be inserted before your current text.',
      'mode.audit': 'Check',
      'mode.audit.description': 'Review without edits; add a readiness verdict when asked.',
      'mode.revise': 'Polish',
      'mode.revise.description': 'Improve wording while keeping the meaning and facts.',
      'mode.compose': 'Draft',
      'mode.compose.description': 'Draft from the supplied material; add no new facts.',
      'prompt.audit': 'Use no-ai-style to check the text below. List issues and suggestions without editing it. If asked whether it is ready to submit, add a verdict and unresolved issues.',
      'prompt.revise': 'Use no-ai-style to polish the text below while preserving its meaning, facts, data, and citations.',
      'prompt.compose': 'Use no-ai-style to draft from the material below. Do not add facts that are not provided.',
      'button.cancel': 'Cancel',
      'button.insert': 'Insert into input box',
      'error.busy': 'The composer is busy. Try again when it is idle.',
      'error.references': 'This DSH version cannot safely insert text without changing file or command references. Remove the references or update DSH first.',
      'error.changed': 'The draft changed before insertion. Nothing was added; please try again.',
      'error.unavailable': 'This composer does not support text insertion.',
    };
    
    const ja = {
      'button.label': 'no ai style',
      'button.title': 'No AI Style のモード',
      'panel.title': 'モードを選択',
      'panel.hint': '選択した指示を入力済みの文章の先頭に挿入します。',
      'mode.audit': '確認',
      'mode.audit.description': '文章は変更せず確認します。提出可否を尋ねられた場合は判定も示します。',
      'mode.revise': '推敲',
      'mode.revise.description': '意味や事実を保ちながら表現を整えます。',
      'mode.compose': '草稿',
      'mode.compose.description': '提供された資料に基づき、事実を加えずに起草します。',
      'prompt.audit': '次の文章を no-ai-style で確認してください。文章は変更せず、問題点と提案を示してください。提出可能か尋ねられた場合は、判定と未解決の問題も示してください。',
      'prompt.revise': '次の文章を no-ai-style で推敲してください。意味、事実、数値、引用を保ってください。',
      'prompt.compose': '次の資料に基づき、no-ai-style で文章を作成してください。資料にない事実は加えないでください。',
      'button.cancel': 'キャンセル',
      'button.insert': '入力欄に挿入',
      'error.busy': '入力欄は送信中です。完了してからもう一度お試しください。',
      'error.references': 'この DSH バージョンでは、ファイルやコマンドの参照を保ったまま挿入できません。参照を外すか DSH を更新してください。',
      'error.changed': '草稿が変更されたため、指示を挿入しませんでした。もう一度お試しください。',
      'error.unavailable': 'この入力欄ではテキストを挿入できません。',
    };
    
    const MODES = ['audit', 'revise', 'compose'];
    
    function getPosition(anchor) {
      if (!anchor || typeof window === 'undefined') return null;
      const rect = anchor.getBoundingClientRect();
      const panelHeight = Math.min(420, window.innerHeight * 0.7);
      const rightLimit = Math.max(12, window.innerWidth - 340 - 12);
      const right = Math.min(Math.max(12, window.innerWidth - rect.right), rightLimit);
      if (rect.top >= panelHeight + 20) {
        return { right, bottom: Math.max(12, window.innerHeight - rect.top + 8) };
      }
      return { right, top: Math.min(rect.bottom + 8, Math.max(12, window.innerHeight - 120)) };
    }
    
    function ModePicker(props) {
      const { t, useInput, inputActions } = props;
      const input = useInput((state) => state);
      const [open, setOpen] = React.useState(false);
      const [selected, setSelected] = React.useState(null);
      const [feedback, setFeedback] = React.useState('');
      const [position, setPosition] = React.useState(null);
      const triggerRef = React.useRef(null);
      const panelRef = React.useRef(null);
    
      const dismiss = (restoreFocus) => {
        setOpen(false);
        setSelected(null);
        setFeedback('');
        if (restoreFocus) requestAnimationFrame(() => triggerRef.current && triggerRef.current.focus());
      };
    
      const openPicker = () => {
        setPosition(getPosition(triggerRef.current));
        setSelected(null);
        setFeedback('');
        setOpen(true);
      };
    
      React.useEffect(() => {
        if (!open) return undefined;
        const place = () => setPosition(getPosition(triggerRef.current));
        const onPointerDown = (event) => {
          if (panelRef.current && panelRef.current.contains(event.target)) return;
          if (triggerRef.current && triggerRef.current.contains(event.target)) return;
          dismiss(false);
        };
        const onKeyDown = (event) => {
          if (event.key !== 'Escape' || event.isComposing) return;
          event.preventDefault();
          event.stopPropagation();
          dismiss(true);
        };
        document.addEventListener('pointerdown', onPointerDown, true);
        document.addEventListener('keydown', onKeyDown, true);
        window.addEventListener('resize', place);
        window.addEventListener('scroll', place, true);
        const firstOption = panelRef.current && panelRef.current.querySelector('[data-mode]');
        if (firstOption) firstOption.focus();
        return () => {
          document.removeEventListener('pointerdown', onPointerDown, true);
          document.removeEventListener('keydown', onKeyDown, true);
          window.removeEventListener('resize', place);
          window.removeEventListener('scroll', place, true);
        };
      }, [open]);
    
      const insert = () => {
        if (!selected) return;
        if (input && input.phase && input.phase !== 'plain') {
          setFeedback(t('error.busy'));
          return;
        }
        const draft = input && typeof input.draft === 'string' ? input.draft : '';
        const prefix = t(`prompt.${selected}`);
        const insertion = `${prefix}${draft.length > 0 ? '\n\n' : ''}`;
        const actions = inputActions || {};
    
        // Newer DSH releases expose a revision-guarded splice. It inserts at [0, 0]
        // and leaves the rest of the draft, including reference chips, intact.
        if (typeof actions.insertText === 'function') {
          let captured = {};
          if (typeof actions.captureInsertion === 'function') {
            try { captured = actions.captureInsertion() || {}; } catch { captured = {}; }
          }
          const span = { ...captured, start: 0, end: 0 };
          // A host action is not this plugin's contract to trust: a throw here would
          // escape the click handler, and React answers that by unmounting the slot
          // entry, taking the composer button with it. A refusal is recoverable.
          let applied = false;
          try {
            applied = actions.insertText(insertion, span) === true;
          } catch {
            setFeedback(t('error.unavailable'));
            return;
          }
          if (!applied) {
            setFeedback(t('error.changed'));
            return;
          }
          dismiss(false);
          return;
        }
    
        // Older DSH exposes only setDraft, which flattens rich references. Keep
        // ordinary text intact, but refuse that fallback when references are present.
        const occurrences = input && Array.isArray(input.occurrences) ? input.occurrences : [];
        if (occurrences.length > 0) {
          setFeedback(t('error.references'));
          return;
        }
        if (typeof actions.setDraft !== 'function') {
          setFeedback(t('error.unavailable'));
          return;
        }
        try {
          actions.setDraft(`${insertion}${draft}`);
        } catch {
          setFeedback(t('error.unavailable'));
          return;
        }
        dismiss(false);
      };
    
      const options = MODES.map((mode) => h('button', {
        key: mode,
        type: 'button',
        className: 'dsh-nas-option',
        role: 'radio',
        'aria-checked': selected === mode,
        'data-mode': mode,
        onClick: () => { setSelected(mode); setFeedback(''); },
      },
      h('span', { className: 'dsh-nas-option-title' }, t(`mode.${mode}`)),
      h('span', { className: 'dsh-nas-option-desc' }, t(`mode.${mode}.description`))));
    
      const panel = open && position ? createPortal(h('section', {
        ref: panelRef,
        className: 'dsh-nas-panel',
        role: 'dialog',
        'aria-label': t('panel.title'),
        style: position,
      },
      h('h2', { className: 'dsh-nas-heading' }, '⭐ ', t('panel.title')),
      h('p', { className: 'dsh-nas-hint' }, t('panel.hint')),
      h('div', { className: 'dsh-nas-options', role: 'radiogroup', 'aria-label': t('panel.title') }, options),
      feedback ? h('p', { className: 'dsh-nas-feedback', role: 'alert' }, feedback) : null,
      h('footer', { className: 'dsh-nas-footer' },
        h('button', { type: 'button', className: 'dsh-nas-action', onClick: () => dismiss(true) }, t('button.cancel')),
        h('button', { type: 'button', className: 'dsh-nas-action dsh-nas-action-primary', disabled: !selected, onClick: insert }, t('button.insert')),
      )), document.body) : null;
    
      return h(React.Fragment, null,
        h('span', { className: 'dsh-nas-root' },
          h('button', {
            ref: triggerRef,
            type: 'button',
            className: 'dsh-nas-trigger',
            title: t('button.title'),
            'aria-label': t('button.title'),
            'aria-haspopup': 'dialog',
            'aria-expanded': open,
            onClick: () => open ? dismiss(false) : openPicker(),
          }, h('span', { className: 'dsh-nas-trigger-icon', 'aria-hidden': true }, '⭐'),
            h('span', { className: 'dsh-nas-trigger-label' }, t('button.label'))),
        ),
        panel,
      );
    }
    
    function apply(ctx) {
      // The web shell fails the whole boot when an apply throws, and the locale and
      // slot surfaces are optional in a given profile. Every wiring step is
      // therefore caught: a missing surface costs the button, never the GUI.
      ctx.effect(() => {
        try {
          const style = document.createElement('style');
          style.id = STYLE_ID;
          style.textContent = CSS;
          document.head.appendChild(style);
          return () => style.remove();
        } catch {
          return () => {};
        }
      }, 'no-ai-style: composer styles');
    
      ctx.inject(['locale'], (localeCtx) => {
        // One effect per dictionary, each guarded on its own, so a single rejection
        // cannot cost the others. A profile with no locale service renders
        // dictionary keys instead of copy: degraded, not broken.
        const registerCopy = (...args) => {
          const label = typeof args[1] === 'string' ? args[1] : 'zh/en';
          ctx.effect(() => {
            try {
              return localeCtx.locale.register(...args);
            } catch {
              return () => {};
            }
          }, `no-ai-style: ${label} copy`);
        };
        registerCopy(NS, { zh, en });
        // DSH language packs can add Japanese. Registering this dictionary lets
        // the UI follow that locale without changing the user's global language list.
        registerCopy(NS, 'ja', ja);
        registerCopy(NS, 'ja-JP', ja);
      });
    
      ctx.inject(['slots'], (slotsCtx) => {
        const slots = slotsCtx.slots;
        return slots.inject('conversation.input.right', () => {
          try {
            return slots.register({
              name: 'conversation.input.right',
              id: 'no-ai-style-mode-picker',
              order: 65,
              locale: NS,
            }, ModePicker);
          } catch {
            return () => {};
          }
        });
      });
    }
    
    exports.name = 'no-ai-style';
    exports.inject = [];
    exports.apply = apply;
    
    return module.exports;
  }
});
