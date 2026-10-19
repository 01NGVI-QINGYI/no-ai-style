'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const hookState = [];
let hookIndex = 0;
let component;
let plugin;

const React = {
  Fragment: Symbol('Fragment'),
  createElement(type, props, ...children) {
    const elementProps = { ...(props || {}), children };
    if (elementProps.ref && typeof elementProps.ref === 'object') {
      elementProps.ref.current = {
        getBoundingClientRect: () => ({ top: 30, bottom: 50, right: 80 }),
        focus() {},
        contains() { return false; },
      };
    }
    return { type, props: elementProps };
  },
  useState(initial) {
    const index = hookIndex++;
    if (!(index in hookState)) hookState[index] = typeof initial === 'function' ? initial() : initial;
    return [hookState[index], (next) => {
      hookState[index] = typeof next === 'function' ? next(hookState[index]) : next;
    }];
  },
  useRef(initial) {
    const index = hookIndex++;
    if (!(index in hookState)) hookState[index] = { current: initial };
    return hookState[index];
  },
  useEffect() { hookIndex++; },
};

const browser = {
  window: { innerWidth: 1280, innerHeight: 800, addEventListener() {}, removeEventListener() {} },
  document: { body: {}, addEventListener() {}, removeEventListener() {} },
  requestAnimationFrame(callback) { callback(); },
  Symbol,
};
browser.window.__ModuleLoader__ = {
  load(entry) {
    plugin = entry.factory((id) => {
      if (id === 'react') return React;
      if (id === 'react-dom') return { createPortal: (node) => node };
      throw new Error(`Unexpected client import: ${id}`);
    });
  },
};
vm.runInNewContext(fs.readFileSync('lib/client.js', 'utf8'), browser, { filename: 'lib/client.js' });

const registeredLocales = [];
const slotRegistrations = [];
const effects = [];
const localeContext = {
  locale: {
    register(...args) { registeredLocales.push(args); return () => {}; },
  },
};
const slotsContext = {
  slots: {
    inject(name, setup) {
      assert.equal(name, 'conversation.input.right');
      return setup();
    },
    register(config, view) {
      slotRegistrations.push(config);
      component = view;
      return () => {};
    },
  },
};

plugin.apply({
  effect(fn, label) { effects.push({ fn, label }); return () => {}; },
  inject(names, callback) { callback(names[0] === 'locale' ? localeContext : slotsContext); },
});
assert.equal(plugin.name, 'no-ai-style');
assert.equal(slotRegistrations.length, 1);
assert.equal(slotRegistrations[0].id, 'no-ai-style-mode-picker');
for (const effect of effects.filter(({ label }) => label.includes('copy'))) effect.fn();
assert.deepEqual(registeredLocales.map(([namespace, locale]) => [namespace, typeof locale === 'string' ? locale : 'built-in']), [
  ['no-ai-style', 'built-in'],
  ['no-ai-style', 'ja'],
  ['no-ai-style', 'ja-JP'],
]);
assert.equal(registeredLocales[0][1].zh['mode.audit'], '检查');
assert.equal(registeredLocales[1][2]['mode.revise'], '推敲');

function render(props) {
  hookIndex = 0;
  return component(props);
}

function flatten(node, output = []) {
  if (Array.isArray(node)) node.forEach((child) => flatten(child, output));
  else if (node && typeof node === 'object') {
    output.push(node);
    flatten(node.props && node.props.children, output);
  }
  return output;
}

function findButton(tree, predicate) {
  return flatten(tree).find((node) => node.type === 'button' && predicate(node.props));
}

function chooseMode(props, mode) {
  let tree = render(props);
  findButton(tree, (item) => item['aria-haspopup'] === 'dialog').props.onClick();
  tree = render(props);
  findButton(tree, (item) => item['data-mode'] === mode).props.onClick();
  return render(props);
}

const english = registeredLocales[0][1].en;
const translated = {
  'prompt.audit': english['prompt.audit'],
  'button.insert': english['button.insert'],
};
hookState.length = 0;
const legacyWrites = [];
const legacyProps = {
  t: (key) => translated[key] || key,
  useInput: (select) => select({ draft: 'keep this suffix', phase: 'plain', occurrences: [] }),
  inputActions: { setDraft: (text) => legacyWrites.push(text) },
};
let tree = chooseMode(legacyProps, 'audit');
findButton(tree, (item) => item.children.includes(translated['button.insert'])).props.onClick();
assert.deepEqual(legacyWrites, [
  `${translated['prompt.audit']}\n\nkeep this suffix`,
]);

hookState.length = 0;
let insertedText;
let insertedSpan;
const modernProps = {
  t: (key) => key,
  useInput: (select) => select({ draft: 'existing text', phase: 'plain', occurrences: [{ source: 'file' }] }),
  inputActions: {
    captureInsertion: () => ({ draftRev: 17, start: 4, end: 8 }),
    insertText: (text, span) => { insertedText = text; insertedSpan = span; return true; },
  },
};
tree = chooseMode(modernProps, 'revise');
findButton(tree, (item) => item.children.includes('button.insert')).props.onClick();
assert.equal(insertedText, 'prompt.revise\n\n');
assert.deepEqual({ ...insertedSpan }, { draftRev: 17, start: 0, end: 0 });

hookState.length = 0;
let flattenedReference = false;
const referencedProps = {
  t: (key) => key,
  useInput: (select) => select({ draft: 'text', phase: 'plain', occurrences: [{ source: 'file' }] }),
  inputActions: { setDraft() { flattenedReference = true; } },
};
tree = chooseMode(referencedProps, 'compose');
findButton(tree, (item) => item.children.includes('button.insert')).props.onClick();
assert.equal(flattenedReference, false);
assert.ok(flatten(render(referencedProps)).some((node) => node.props && node.props.role === 'alert'));

hookState.length = 0;
let cancelledWrite = false;
const cancelProps = {
  t: (key) => key,
  useInput: (select) => select({ draft: 'leave this alone', phase: 'plain', occurrences: [] }),
  inputActions: { setDraft() { cancelledWrite = true; } },
};
tree = chooseMode(cancelProps, 'compose');
findButton(tree, (item) => item.children.includes('button.cancel')).props.onClick();
assert.equal(cancelledWrite, false);


// --- trigger label -----------------------------------------------------------
// The button carries a visible product label beside the glyph, not just an icon.
hookState.length = 0;
const labelled = render({
  t: (key) => (key === 'button.label' ? 'no ai style' : key),
  useInput: (select) => select({ draft: '', phase: 'plain', occurrences: [] }),
  inputActions: { setDraft() {} },
});
const labelledTrigger = findButton(labelled, (item) => item['aria-haspopup'] === 'dialog');
const labelNode = flatten(labelledTrigger).find(
  (node) => node.props && node.props.className === 'dsh-nas-trigger-label',
);
assert.ok(labelNode, 'the trigger renders a visible text label beside the icon');
assert.equal(labelNode.props.children[0], 'no ai style');

// --- every locale, every mode, verbatim --------------------------------------
// The inserted text is the locale's own prompt, in the locale the composer shows,
// and the draft the user typed survives untouched at the end of it.
const catalogs = {
  zh: registeredLocales[0][1].zh,
  en: registeredLocales[0][1].en,
  ja: registeredLocales[1][2],
};
for (const [localeId, catalog] of Object.entries(catalogs)) {
  for (const mode of ['audit', 'revise', 'compose']) {
    hookState.length = 0;
    const writes = [];
    const props = {
      t: (key) => catalog[key] || key,
      useInput: (select) => select({ draft: 'KEEP THIS', phase: 'plain', occurrences: [] }),
      inputActions: { setDraft: (text) => writes.push(text) },
    };
    const afterChoice = chooseMode(props, mode);
    findButton(afterChoice, (item) => item.children.includes(catalog['button.insert'])).props.onClick();
    assert.deepEqual(writes, [`${catalog[`prompt.${mode}`]}\n\nKEEP THIS`],
      `${localeId}/${mode}: the localized prompt is prepended and the draft is preserved`);
  }
}

// --- empty composer ----------------------------------------------------------
hookState.length = 0;
const emptyWrites = [];
const emptyProps = {
  t: (key) => english[key] || key,
  useInput: (select) => select({ draft: '', phase: 'plain', occurrences: [] }),
  inputActions: { setDraft: (text) => emptyWrites.push(text) },
};
tree = chooseMode(emptyProps, 'audit');
findButton(tree, (item) => item.children.includes(english['button.insert'])).props.onClick();
assert.deepEqual(emptyWrites, [english['prompt.audit']],
  'an empty composer receives the prompt alone, with no trailing blank line');

// --- a host whose composer snapshot has no draft -----------------------------
// Reading .draft off an absent field throws during render, and React answers a
// render throw by unmounting the slot entry behind its error boundary.
hookState.length = 0;
const noDraftWrites = [];
assert.doesNotThrow(() => {
  const bare = chooseMode({
    t: (key) => english[key] || key,
    useInput: (select) => select({ phase: 'plain', occurrences: [] }),
    inputActions: { setDraft: (text) => noDraftWrites.push(text) },
  }, 'audit');
  findButton(bare, (item) => item.children.includes(english['button.insert'])).props.onClick();
}, 'a missing draft field must not throw');
assert.deepEqual(noDraftWrites, [english['prompt.audit']],
  'a missing draft field is read as an empty draft, not a crash');

// --- a host whose setDraft throws -------------------------------------------
hookState.length = 0;
assert.doesNotThrow(() => {
  const hostile = chooseMode({
    t: (key) => english[key] || key,
    useInput: (select) => select({ draft: 'text', phase: 'plain', occurrences: [] }),
    inputActions: { setDraft() { throw new Error('host refused'); } },
  }, 'audit');
  findButton(hostile, (item) => item.children.includes(english['button.insert'])).props.onClick();
}, 'a throwing setDraft must not reach the error boundary');

// --- apply() against a profile whose optional services misbehave -------------
// The web shell treats a throwing apply as a boot failure, so a broken optional
// service must cost the button, never the GUI.
assert.doesNotThrow(() => {
  plugin.apply({
    effect(fn) { fn(); return () => {}; },
    inject(names, callback) {
      if (names[0] === 'locale') {
        callback({ locale: { register() { throw new Error('no locale'); } } });
      } else {
        callback({ slots: { inject(name, setup) { return setup(); }, register() { throw new Error('slot taken'); } } });
      }
    },
  });
}, 'apply() must survive every optional service failing');

console.log('client smoke passed: slot and locale wiring, prepend without replacement, rich-reference safety, cancel, trigger label, zh/en/ja x 3 modes, empty draft, absent draft, hostile host, hostile apply');
