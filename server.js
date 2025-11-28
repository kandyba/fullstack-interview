import { createServer } from "http";
import { readFile } from "fs";
import { extname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, "..");

const port = 3000;

const mimeTypes = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".json": "application/json",
  ".css": "text/css",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml"
};

createServer((req, res) => {
  const filePath =
    req.url === "/"
      ? join(__dirname, "index.html")
      : join(__dirname, req.url);

  const ext = extname(filePath);

  readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("File not found");
      return;
    }

    res.writeHead(200, { "Content-Type": mimeTypes[ext] || "text/plain" });
    res.end(data);
  });
}).listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
