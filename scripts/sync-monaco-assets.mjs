import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, '..');
const sourceDir = path.join(repoRoot, 'node_modules', 'monaco-editor', 'min', 'vs');
const targetDir = path.join(repoRoot, 'public', 'monaco', 'vs');

if (!fs.existsSync(sourceDir)) {
  throw new Error(`Monaco static assets were not found at ${sourceDir}`);
}

fs.rmSync(targetDir, { force: true, recursive: true });
fs.mkdirSync(path.dirname(targetDir), { recursive: true });
fs.cpSync(sourceDir, targetDir, { recursive: true });

console.log(`Synced Monaco assets to ${path.relative(repoRoot, targetDir)}`);