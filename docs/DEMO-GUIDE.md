# Presenter Demo Guide

One repo, two sessions. Everything below runs off this repository. The golden rule:
**only ever have ~2 things that can break live** — everything else is pre-built or static.

---

## Session 1 · Aug 5 — "Building with GitHub Copilot: The AI-Native Developer"

### Run-of-show (browser-first — no IDE required)
> **Primary surface: the Copilot coding agent on github.com.** Everything happens in a
> browser, which suits the mixed audience (PMs, UX, data, engineers). The CLI and IDE are
> optional "power-user" alternates (see end of this section).

1. **Hook (3 min)** — Open the live app (https://mdiiacovo.github.io/ai-native-intake-demo/).
   "This is a working intake front door. You're going to learn how to build things like this,
   fast — without even opening an editor."
2. **Copilot surface tour (10 min)** — completions, chat, edits/agent mode, and the coding
   agent. Frame each by the job it does, not the feature name.
3. **Comprehend inherited code (Acquire edge, ~7 min)** — open `legacy/triage-rules.js` on
   github.com. It's deliberately cryptic and undocumented. Use **Copilot Chat (github.com) →
   "explain this file"** to reverse it, then ask it to add doc comments. The "understand
   acquired systems" moment.
4. **Grounding (7 min)** — show `.github/copilot-instructions.md` and how it shapes output.
5. **Best-in-class prompting (8 min)** — 4 patterns, quick before/after in Copilot Chat.
6. **🔴 Live build (18 min)** — the whole loop in the browser:
   - Open **Issue #1** ("Add search + risk filter to the request queue")
   - **Assign it to Copilot** → the coding agent starts working on its own
   - It opens a **pull request**; walk the diff and its description
   - **Merge** → GitHub Pages **auto-deploys** → refresh the live URL, feature is live
7. **Close (4 min)** — "That's issue → PR → shipped, no editor. This is day one of your
   hackathon project."

### Seed issue (already created — Issue #1)
> **Title:** Add search + risk filter to the request queue
> **Body:** The queue has no way to find a request. Add (1) a text search box that filters by
> title/team, and (2) a dropdown to filter by risk level (low/medium/high). Keep it
> zero-dependency and match the existing dark theme. Update the queue count to reflect
> filtered results.

### How to run the live build (github.com)
1. Repo → **Issues → #1** → in the sidebar, **Assignees → Copilot**.
2. Copilot posts progress and opens a PR (typically a few minutes — start it early / have a
   completed run ready, see fallback).
3. Open the PR, skim the diff, **Merge**.
4. Switch to the live URL and refresh — search + filter are now live (Pages auto-deploy).

### Fallbacks (never debug live)
- **If the agent is slow:** kick off the assignment *before* the session or during the surface
  tour so the PR is ready by step 6.
- **If the agent fails entirely:** a **pre-baked PR** (`demo/search-filter`, PR #2) already
  exists — open it and narrate it as "the result the agent produces," then merge that instead.
- **Ultimate backup:** a screen recording of a successful agent run.

### Optional power-user alternates (only if the room is technical)
- **Copilot CLI:** run the same issue from the terminal for "watch the agent work" energy.
- **IDE:** chat → edits → completions for the fullest control. Least accessible; use sparingly.

---

## Session 2 · Aug 19 — "Best-in-Class AI Engineering: Quality, Security, Scale, Governance"

### Run-of-show
1. **Recap (3 min)** — the app now has the search/filter feature from Aug 5.
2. **AI code review (10 min)** — open the staged PR; run **Copilot code review**; walk the
   suggestions.
3. **🔴 AI + security (15 min)** — **no GHAS required.** Open `app.js` and ask **Copilot
   Chat**: *"Review this file for security vulnerabilities."* It identifies the **XSS sink** in
   `showWelcomeBanner()` (`innerHTML` built from an unsanitized URL param). Ask Copilot to fix
   it (use `textContent` / escaping) → confirm the payload no longer fires. *Main "can break"
   moment; have the fix diff ready.*
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
that **Copilot Chat / code review reliably identifies** — no GHAS or CodeQL needed.
**Fix:** use `textContent`, or escape the value before inserting.

> Note: HPI does **not** have GHAS / Code Security, so this demo is intentionally
> Copilot-native (Chat + code review), which works with just a Copilot license. A CodeQL
> workflow still exists in `.github/workflows/` for reference, but the live demo does not
> depend on it.

> There is also a secondary unsanitized sink in `renderQueue()` (user-submitted `title`/`team`
> rendered via `innerHTML`) — a good "now find the others" follow-up once the first is fixed.

---

## Pre-flight checklist (do the day before)
- [ ] Repo cloned locally, Copilot signed in, extensions working
- [ ] Seed issue created (Session 1)
- [ ] Pre-baked `demo/search-filter` PR created (Session 1 fallback)
- [ ] Confirmed Copilot Chat identifies the XSS in `showWelcomeBanner()` (Session 2)
- [ ] A known-good XSS fix diff saved locally (Session 2 fallback)
- [ ] SDLC Experience site open in a tab (economics page ready)
- [ ] Screen recording of the agent run + Copilot security fix, as ultimate backup
