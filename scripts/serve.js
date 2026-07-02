/* Servidor estático simple para ver el sitio en local.
   Uso: node scripts/serve.js [puerto]  (por defecto 8129) */
const http = require("http");
const fs = require("fs");
const path = require("path");

const PUERTO = process.argv[2] ? parseInt(process.argv[2], 10) : 8129;
const RAIZ = path.join(__dirname, "..");

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".mp4": "video/mp4",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".woff": "font/woff",
  ".woff2": "font/woff2"
};

http
  .createServer((req, res) => {
    let ruta = decodeURIComponent(req.url.split("?")[0]);
    if (ruta.endsWith("/")) ruta += "index.html";

    const archivo = path.normalize(path.join(RAIZ, ruta));
    if (!archivo.startsWith(RAIZ)) {
      res.writeHead(403);
      return res.end("Prohibido");
    }

    fs.readFile(archivo, (err, datos) => {
      if (err) {
        fs.readFile(path.join(RAIZ, "404.html"), (e2, notFound) => {
          res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
          res.end(e2 ? "404" : notFound);
        });
        return;
      }
      const ext = path.extname(archivo).toLowerCase();
      res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
      res.end(datos);
    });
  })
  .listen(PUERTO, () => {
    console.log("Sonríe México en http://localhost:" + PUERTO);
  });
