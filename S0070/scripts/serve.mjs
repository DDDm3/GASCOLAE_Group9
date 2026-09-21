import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { brotliCompressSync } from 'node:zlib';
import { createHash } from 'node:crypto';
import { serviceSchemaJson } from '../src/seo.mjs';

const root = fileURLToPath(new URL('../dist/', import.meta.url));
const port = Number(process.env.PORT || 4170);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.png': 'image/png', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.avif': 'image/avif' };
const schemaHash = createHash('sha256').update(serviceSchemaJson).digest('base64');
const csp = `default-src 'self'; script-src 'self' 'sha256-${schemaHash}'; style-src 'self'; img-src 'self'; font-src 'self'; connect-src 'none'; form-action 'none'; frame-ancestors 'none'; base-uri 'none'; object-src 'none'`;
export const server = http.createServer(async (req, res) => {
  res.setHeader('Content-Security-Policy', csp);
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'no-referrer');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Resource-Policy', 'same-origin');
  if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405, { Allow: 'GET, HEAD' }); res.end(); return; }
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const relative = pathname === '/' ? 'index.html' : pathname.slice(1);
    const file = path.resolve(root, relative);
    const inside = path.relative(root, file);
    if (inside.startsWith('..') || path.isAbsolute(inside) || relative.includes('\\') || relative.includes(':') || relative.includes('\0')) throw new Error('Invalid path');
    const extension = path.extname(file);
    if (!types[extension] || !(await stat(file)).isFile()) throw new Error('Not public');
    const body = await readFile(file);
    const etag = `"${createHash('sha256').update(body).digest('base64url')}"`;
    const cacheControl = extension === '.html' ? 'no-cache' : 'public, max-age=3600';
    res.setHeader('Cache-Control', cacheControl);
    res.setHeader('ETag', etag);
    if (req.headers['if-none-match'] === etag) { res.writeHead(304); res.end(); return; }
    const compressible = ['.html', '.css', '.js', '.svg'].includes(extension);
    const useBrotli = compressible && /(?:^|,)\s*br\s*(?:,|$)/.test(req.headers['accept-encoding'] || '');
    const responseBody = useBrotli ? brotliCompressSync(body) : body;
    if (useBrotli) {
      res.setHeader('Content-Encoding', 'br');
      res.setHeader('Vary', 'Accept-Encoding');
    }
    res.writeHead(200, { 'Content-Type': types[extension], 'Content-Length': responseBody.length });
    res.end(req.method === 'HEAD' ? undefined : responseBody);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Not found');
  }
});
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  server.listen(port, '127.0.0.1', () => console.log(`S0070 preview: http://127.0.0.1:${port}`));
}
