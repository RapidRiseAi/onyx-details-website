import { mkdir, copyFile, access } from 'node:fs/promises';
import { constants } from 'node:fs';
import { resolve } from 'node:path';

const imageFiles = [
  'Before-After1.png',
  'Before-After2.png',
  'Before-After3.png',
  'Before-After4.png',
  'Built-Around-Convenience.png',
  'Clean-Car-1.png',
  'Clean-Car-2.png',
  'Clean-Car3.png',
  'Clean-Car4.png',
  'Home-Page-Hero.png',
  'Lifestyle1.png',
  'Lifestyle2.png',
  'Onyx-Details-Logo.png',
  'Premium-Service-Promise.png',
  'Team1.png',
  'Team2.png'
];

const root = process.cwd();
const publicDir = resolve(root, 'public');

await mkdir(publicDir, { recursive: true });

const missing = [];

for (const file of imageFiles) {
  const sourcePath = resolve(root, file);
  const destinationPath = resolve(publicDir, file);

  try {
    await access(sourcePath, constants.F_OK);
    await copyFile(sourcePath, destinationPath);
    console.log(`[sync-images] copied ${file} -> public/${file}`);
  } catch {
    missing.push(file);
  }
}

if (missing.length > 0) {
  console.warn(`[sync-images] missing in repo root (${missing.length}): ${missing.join(', ')}`);
}
