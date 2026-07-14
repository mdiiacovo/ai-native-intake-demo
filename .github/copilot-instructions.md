# Copilot instructions — Intake Front Door demo

This is a **zero-dependency** static web app that demonstrates an IT "intake front door":
users submit requests for software / vendors / tools, which are auto-triaged by risk and
tracked across the Acquire → Onboard → Operate → Decommission (A2D) lifecycle.

## Conventions
- **No build step and no runtime dependencies.** Plain HTML, CSS, and vanilla JS only.
  Do not introduce frameworks, bundlers, or npm packages.
- The only optional Node process is `mock-api/server.js`, which must stay dependency-free
  (Node built-in modules only).
- Match the existing dark GitHub-style theme defined by the CSS variables in `styles.css`.
- Keep everything runnable by simply opening `index.html` in a browser.

## Structure
- `index.html` — markup for the intake form and request queue
- `app.js` — app logic: load/save requests, render queue, handle submit
- `styles.css` — dark theme, design tokens live in `:root`
- `legacy/triage-rules.js` — **inherited, undocumented** scoring module (treat with care)
- `data/requests.json` — seed data / mock API source
- `mock-api/server.js` — optional zero-dep mock backend

## When suggesting code
- Prefer small, readable functions.
- Sanitize any user-provided content before inserting it into the DOM.
- Preserve the A2D lifecycle stages: Acquire, Onboard, Operate, Decommission.
