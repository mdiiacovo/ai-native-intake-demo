// Tiny zero-dependency mock backend for the Intake Front Door demo.
// Node's built-in http module only — no npm install required.
//
//   node mock-api/server.js
//
// Serves the request queue at http://localhost:4000/requests
// The frontend automatically falls back to bundled data if this isn't running,
// so it's entirely optional for the demo.

const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 4000;
const DATA_FILE = path.join(__dirname, "..", "data", "requests.json");

function readData() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  } catch {
    return [];
  }
}

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  if (req.method === "GET" && req.url === "/requests") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(readData()));
  }

  if (req.method === "GET" && req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ status: "ok" }));
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "not found" }));
});

server.listen(PORT, () => {
  console.log(`Intake mock API running at http://localhost:${PORT}`);
});
