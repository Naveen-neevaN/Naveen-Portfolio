const http = require('http');
const fs = require('fs');
const path = require('path');
const root = path.join(process.cwd(), 'out');
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.mp4': 'video/mp4', '.pdf': 'application/pdf', '.txt': 'text/plain; charset=utf-8' };
function send(res, status, body, type = 'text/plain; charset=utf-8') { res.writeHead(status, { 'Content-Type': type }); res.end(body); }
function resolveUrl(url) {
  let pathname = decodeURIComponent(new URL(url, 'http://localhost').pathname);
  if (pathname === '/Naveen-Portfolio') pathname = '/Naveen-Portfolio/';
  if (pathname.startsWith('/Naveen-Portfolio/')) pathname = pathname.replace('/Naveen-Portfolio', '') || '/';
  if (pathname === '/') pathname = '/index.html';
  const candidate = path.normalize(path.join(root, pathname));
  if (!candidate.startsWith(root)) return null;
  if (fs.existsSync(candidate) && fs.statSync(candidate).isDirectory()) return path.join(candidate, 'index.html');
  return candidate;
}
const server = http.createServer((req, res) => {
  const file = resolveUrl(req.url);
  if (!file || !fs.existsSync(file)) return send(res, 404, 'Not found');
  const ext = path.extname(file).toLowerCase();
  res.writeHead(200, { 'Content-Type': types[ext] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
});
server.listen(3000, '127.0.0.1', () => console.log('static server ready on 3000'));
