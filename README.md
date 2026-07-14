# Intake Front Door — AI-Native Demo

A **zero-dependency** demo web app used for GitHub Copilot enablement sessions. It models an
IT **intake front door**: a single place to request software, vendors, and tools, with
automatic risk triage and lifecycle tracking from **Acquire → Onboard → Operate → Decommission (A2D)**.

It replaces the classic "spreadsheet + email thread" intake process — the exact pain point
teams are asked to modernize.

> ⚠️ Illustrative demo only. Not a real HP system. Sample data is fictional.

## Run it

It's plain static files — just open `index.html`, or serve the folder:

```bash
python3 -m http.server 3000
# open http://localhost:3000/
```

Optional zero-dependency mock backend (Node built-ins only):

```bash
node mock-api/server.js   # serves the queue at http://localhost:4000/requests
```

The frontend automatically falls back to bundled data if the mock API isn't running.

## What's here

| Path | Purpose |
| --- | --- |
| `index.html` | Intake form + request queue |
| `app.js` | Load/save requests, render queue, handle submit |
| `styles.css` | Dark GitHub-style theme (tokens in `:root`) |
| `legacy/triage-rules.js` | **Inherited, undocumented** scoring module |
| `data/requests.json` | Seed data / mock API source |
| `mock-api/server.js` | Optional zero-dependency mock backend |
| `.github/copilot-instructions.md` | Repo grounding for Copilot |
| `docs/DEMO-GUIDE.md` | Presenter script for both sessions |

## For presenters

See **[docs/DEMO-GUIDE.md](docs/DEMO-GUIDE.md)** for the full run-of-show for the Aug 5
and Aug 19 sessions, including the seed issue, the live-build steps, and fallbacks.
