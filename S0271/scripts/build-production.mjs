import { access, cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = new URL('../', import.meta.url);
const source = new URL('src/', root);
const output = new URL('dist/', root);
const sourceIndex = new URL('index.html', source);

// `dist` is a fixed child of the project root; never accept a caller-provided path.
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(source, output, { recursive: true });

const html = await readFile(sourceIndex, 'utf8');
const assetPaths = [...html.matchAll(/(?:src|href|data-src|data-poster|srcset)="([^"]+)"/g)]
  .flatMap(([, value]) => value.split(',').map(candidate => candidate.trim().split(/\s+/)[0]))
  .filter(value => value.startsWith('../asset/'));

for (const relativePath of [...new Set(assetPaths)]) {
  const input = new URL(relativePath, sourceIndex);
  await access(input, constants.R_OK);
  const assetRelativePath = relativePath.slice('../asset/'.length);
  const destination = new URL(`asset/${assetRelativePath}`, output);
  await mkdir(new URL('./', destination), { recursive: true });
  await cp(input, destination);
}

const builtIndexUrl = new URL('index.html', output);
await writeFile(builtIndexUrl, html.replaceAll('../asset/', './asset/'), 'utf8');

const builtMediaUrl = new URL('js/data/media.js', output);
const builtMedia = await readFile(builtMediaUrl, 'utf8');
await writeFile(builtMediaUrl, builtMedia.replace('../../../asset/', '../../asset/'), 'utf8');

const manifest = {
  entry: 'index.html',
  assets: [...new Set(assetPaths)].map(path => path.slice('../asset/'.length)).sort(),
};
await writeFile(new URL('build-manifest.json', output), `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');

console.log(`Production build created at ${fileURLToPath(output)} with ${manifest.assets.length} referenced assets.`);
