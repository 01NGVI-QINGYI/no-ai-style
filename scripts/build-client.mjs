import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const pkg = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'));
const source = readFileSync(resolve(root, 'src/client.cjs'), 'utf8');
const output = `window.__ModuleLoader__.load({\n  id: ${JSON.stringify(pkg.name)},\n  factory: (require) => {\n    var module = { exports: {} };\n    var exports = module.exports;\n    Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });\n${source.split('\n').map((line) => `    ${line}`).join('\n')}\n    return module.exports;\n  }\n});\n`;

mkdirSync(resolve(root, 'lib'), { recursive: true });
writeFileSync(resolve(root, 'lib/client.js'), output);
