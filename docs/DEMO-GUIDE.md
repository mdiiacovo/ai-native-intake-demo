# Presenter Demo Guide

One repo, two sessions. Everything below runs off this repository. The golden rule:
**only ever have ~2 things that can break live** — everything else is pre-built or static.

---

## Session 1 · Aug 5 — "Building with GitHub Copilot: The AI-Native Developer"

### Run-of-show
1. **Hook (3 min)** — Open the app (`index.html`). "This is a working intake front door.
   You're going to learn how to build things like this, fast."
2. **Copilot surface tour (10 min)** — completions, chat, edits/agent mode, coding agent.
3. **Comprehend inherited code (Acquire edge, ~7 min)** — open `legacy/triage-rules.js`.
   It's deliberately cryptic and undocumented. Use **Copilot Chat → /explain** to reverse it,
   then ask Copilot to add doc comments. This is the "understand acquired systems" moment.
4. **Grounding (7 min)** — show `.github/copilot-instructions.md` and how it shapes output.
5. **Best-in-class prompting (8 min)** — 4 patterns, quick before/after in chat.
6. **🔴 Live build (18 min)** — the seeded issue (below): add a **search/filter bar** to the
   queue. issue → chat plan → completions/edits build → delegate to coding agent → PR.
7. **Close (4 min)** — "This is day one of your hackathon project."

### Seed issue (create in the repo before the session)
> **Title:** Add search + risk filter to the request queue
> **Body:** The queue has no way to find a request. Add (1) a text search box that filters by
> title/team, and (2) a dropdown to filter by risk level (low/medium/high). Keep it
> zero-dependency and match the existing dark theme. Update the queue count to reflect
> filtered results.

### Live-build prompt sequence
1. Chat: *"Read this repo's copilot-instructions and the queue rendering in app.js. Propose a
   plan to add search + risk filtering without adding dependencies."*
2. Edits: *"Implement the plan: add the search box and risk dropdown to index.html and wire up
   filtering in app.js."*
3. Delegate the polish to the **coding agent** via the issue → let it open a PR.

### Fallback if the agent stalls
A **pre-baked PR** named `demo/search-filter` already exists. Open it and narrate: "here's the
result the agent produces." Never debug live.

---

## Session 2 · Aug 19 — "Best-in-Class AI Engineering: Quality, Security, Scale, Governance"

### Run-of-show
1. **Recap (3 min)** — the app now has the search/filter feature from Aug 5.
2. **AI code review (10 min)** — open the staged PR; run **Copilot code review**; walk the
   suggestions.
3. **🔴 AI + security (15 min)** — CodeQL flags an **XSS sink** in `app.js` (`renderQueue`
   builds `innerHTML` from unsanitized user input). Show the alert → **Copilot autofix** →
   sanitize → re-scan clean. *This is the main "can break" moment; have the fix ready.*
4. **Agentic at scale (8 min)** — talk track: chaining/parallelizing agents + MCP/tools.
5. **Economics (5 min)** — flip to the SDLC Experience `economics.html`: per-workflow credit
   cost + budget headroom. Pure clicking, no setup.
6. **Governance & adoption (5 min)** — controls, IP indemnity, usage visibility.
7. **Document before decommission (Decommission edge, ~5 min)** — point Copilot at
   `legacy/triage-rules.js` again: *"Produce a plain-English spec of this module's behavior so
   we can safely retire it."* Closes the A2D loop.
8. **Close (4 min)** — the review → secure → measure → govern loop as a repeatable standard.

### The planted vulnerability (for the security demo)
`app.js` → `showWelcomeBanner()` reads the `team` URL parameter and inserts it straight into
`banner.innerHTML` without escaping. Opening a shareable link like
`?team=<img src=x onerror=alert(1)>` triggers the XSS. This is a textbook reflected DOM XSS
(`js/xss`) that CodeQL's `security-extended` suite reliably flags.
**Autofix / manual fix:** use `textContent`, or escape the value before inserting.

> There is also a secondary unsanitized sink in `renderQueue()` (user-submitted `title`/`team`
> rendered via `innerHTML`) — a good "now find the others" follow-up once the first is fixed.

---

## Pre-flight checklist (do the day before)
- [ ] Repo cloned locally, Copilot signed in, extensions working
- [ ] Seed issue created (Session 1)
- [ ] Pre-baked `demo/search-filter` PR created (Session 1 fallback)
- [ ] Code scanning / CodeQL enabled and has run once (Session 2)
- [ ] A known-good XSS fix diff saved locally (Session 2 fallback)
- [ ] SDLC Experience site open in a tab (economics page ready)
- [ ] Screen recording of the agent run + autofix, as ultimate backup
