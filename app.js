// app.js — Intake Front Door demo
// Client-side app. Runs entirely on static hosting (e.g. GitHub Pages) using bundled
// data. When served from localhost it will also use the optional mock API if present.

const STORAGE_KEY = "intake_requests";

// Module-level list so all handlers (submit, export) always share the same state.
let requests = [];

// Only reach for the local mock API during local development. On GitHub Pages (or any
// non-localhost host) we skip it entirely so there's no failed request or console noise.
const isLocalDev = ["localhost", "127.0.0.1"].includes(window.location.hostname);

async function loadRequests() {
  if (isLocalDev) {
    try {
      const res = await fetch("http://localhost:4000/requests", { mode: "cors" });
      if (res.ok) return await res.json();
    } catch (_) {
      /* mock API not running — fall back to bundled data */
    }
  }
  const cached = localStorage.getItem(STORAGE_KEY);
  if (cached) return JSON.parse(cached);
  const seed = await fetch("data/requests.json").then((r) => r.json());
  localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
  return seed;
}

function saveRequests(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

function renderQueue(list) {
  const container = document.getElementById("queue-list");
  document.getElementById("queue-count").textContent = list.length;
  container.innerHTML = "";
  list
    .slice()
    .reverse()
    .forEach((r) => {
      const el = document.createElement("div");
      el.className = "request";
      // NOTE: renders user-provided fields directly into innerHTML.
      el.innerHTML = `
        <div class="req-top">
          <div>
            <div class="req-title">${r.title}</div>
            <div class="req-team">${r.team}</div>
          </div>
          <span class="pill risk-${r.risk}">${r.risk} risk</span>
        </div>
        <div class="req-meta">
          <span class="pill cat">${r.category}</span>
          <span class="pill stage">${r.stage}</span>
          <span class="pill cat">$${Number(r.cost || 0).toLocaleString()}</span>
        </div>`;
      container.appendChild(el);
    });
}

// Shareable links can pre-fill the requesting team, e.g. ?team=Design%20Experience
function showWelcomeBanner() {
  const params = new URLSearchParams(window.location.search);
  const team = params.get("team");
  if (!team) return;
  const banner = document.getElementById("welcome-banner");
  banner.classList.remove("hidden");
  // NOTE: renders a URL parameter directly into innerHTML.
  banner.innerHTML = "Submitting a request on behalf of <strong>" + team + "</strong>";
}

// Wraps a value in double-quotes and escapes any embedded double-quotes,
// commas, and newlines so the output is a valid RFC 4180 CSV cell.
function csvCell(value) {
  const str = value == null ? "" : String(value);
  return '"' + str.replace(/"/g, '""') + '"';
}

function exportCSV(list) {
  const headers = ["id", "title", "team", "category", "cost", "sensitive",
                   "justification", "risk", "score", "stage", "createdAt"];
  const rows = [
    headers.map(csvCell).join(","),
    ...list.map((r) => headers.map((h) => csvCell(r[h])).join(",")),
  ];
  const blob = new Blob([rows.join("\r\n")], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "intake-requests.csv";
  a.click();
  // Delay revocation so the browser has time to start the download before the
  // object URL is released; immediate revocation can abort the download in some browsers.
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function showTriage(result) {
  const box = document.getElementById("triage-result");
  box.classList.remove("hidden");
  box.innerHTML = `
    <h3>Auto-triage result</h3>
    <div class="row"><span>Risk level</span><strong>${result.risk}</strong></div>
    <div class="row"><span>Score</span><strong>${result.score}</strong></div>
    <div class="row"><span>Lifecycle stage</span><strong>${result.stage}</strong></div>`;
}

async function init() {
  showWelcomeBanner();
  requests = await loadRequests();
  renderQueue(requests);

  document.getElementById("export-csv-btn").addEventListener("click", () => {
    exportCSV(requests);
  });

  document.getElementById("intake-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.target;
    const data = Object.fromEntries(new FormData(form).entries());
    const triage = window.__triage(data); // from legacy/triage-rules.js
    const record = {
      id: Date.now(),
      title: data.title,
      team: data.team,
      category: data.category,
      cost: data.cost,
      sensitive: data.sensitive,
      justification: data.justification,
      risk: triage.risk,
      score: triage.score,
      stage: triage.stage,
      createdAt: new Date().toISOString(),
    };
    requests.push(record);
    saveRequests(requests);
    renderQueue(requests);
    showTriage(triage);
    form.reset();
  });
}

init();
