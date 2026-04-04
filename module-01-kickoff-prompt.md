# Module 01 Kickoff Prompt

Use this with the custom agent selected in GitHub Copilot Chat.

---

You are building **Module 01: App Shell / Game Shell** for a desktop-first 2D retro-neon educational coding game called **Software Engineer: The New Guy**.

## Product context
This product is a **narrative dev-team simulator powered by a curriculum engine**. The player is a new developer learning through tickets, chat, coding tasks, review feedback, and mentorship.

For now, do **not** build the full game. Build only the shell that future modules will plug into.

## Primary objective for Module 01
Create a **buildable, modular, visually impressive desktop shell** that lets us experiment with layout and art direction while keeping future modules easy to integrate.

This module is the foundation, not the whole product.

## Tech direction for this module
Use the following stack unless the repository already has an intentionally different standard:
- **Electron** for desktop shell
- **Vite** for frontend tooling
- **React + TypeScript** for UI
- **Tailwind CSS** for styling and theme token usage
- **Monaco Editor** embedded as a placeholder workspace editor
- **Local persistence** for UI state and settings

If the repo already contains equivalent infrastructure, adapt instead of replacing it.

## Module 01 scope
Build only these capabilities:

1. **Desktop app shell**
   - launches locally on Windows
   - has a stable app frame and workspace layout
   - has a polished retro-neon visual baseline

2. **Main workspace layout**
   - top bar
   - left team chat panel
   - center code workspace panel
   - right mission / mentor panel
   - bottom output / terminal drawer
   - resizable or collapsible panels where reasonable

3. **Design playground behavior**
   - theme tokens and neon accents are centralized
   - layout can be adjusted without major rewrites
   - include at least 2 visual presets or a settings panel for experimentation
   - allow quick tweaking of spacing, glow intensity, panel density, and accent style through structured constants or config

4. **Static placeholder content**
   - fake team chat messages
   - fake mission ticket content
   - fake character portrait slots / profile cards
   - fake output logs
   - placeholder editor content

5. **Module boundary stubs**
   - define clear interface points for future modules without implementing them fully:
     - Mission / Curriculum Engine
     - Workspace / Code Evaluation Engine
     - Team Chat / Conversation Engine
     - AI Mentor / Roleplay Layer
     - Narrative / Relationship State
     - Presentation / FX Layer
   - use lightweight interfaces, services, adapters, or placeholder hooks only

6. **Local state + persistence**
   - save layout preferences
   - save theme preference
   - save last opened screen or view

## Explicitly out of scope for Module 01
Do **not** fully implement:
- real AI model integration
- real team chat intelligence
- code execution sandbox
- scoring engine
- branching story system
- curriculum engine logic
- multiplayer
- production asset pipeline
- advanced animation systems

You may add stubs, interfaces, placeholder services, or mocked data for those items, but do not build their real implementations yet.

## Architecture rules
1. Keep the codebase **modular and replaceable**.
2. Avoid coupling shell code to future module internals.
3. Prefer **small focused components** over giant files.
4. Keep visual design tokens centralized.
5. Keep fake data separate from UI components.
6. Keep future integration points obvious.
7. Avoid overengineering, but do not write throwaway code.
8. Build a strong vertical foundation that can survive later expansion.

## Suggested folder direction
Use a structure similar to this unless the repo already has a better standard:

```text
src/
  app/
    providers/
    routes/
    layout/
  features/
    shell/
    chat/
    workspace/
    mission/
    output/
    settings/
  shared/
    ui/
    theme/
    types/
    config/
    hooks/
    lib/
  mocks/
  modules/
    mission-engine/
    evaluation-engine/
    conversation-engine/
    ai-mentor/
    narrative-state/
    presentation-fx/
```

## UX expectations
The app should feel like a stylish mix of:
- modern developer tooling
- retro arcade neon
- sci-fi command center
- readable educational software

Prioritize readability in text-heavy areas. The editor, chat, and mission panels must stay comfortable to use.

## Required workflow
Follow this exact sequence:

### Step 1: Inspect
Inspect the repository and identify:
- current stack
- current folder structure
- current build status
- anything that should be preserved
- any blockers

### Step 2: Plan
Produce a concise implementation plan for Module 01 that includes:
- files to create or modify
- architecture choices
- layout plan
- state management plan
- what will be mocked now vs deferred

### Step 3: Implement incrementally
Implement Module 01 in small, coherent slices. Prefer this order:
1. app shell bootstrap
2. layout skeleton
3. shared theme tokens
4. placeholder feature panels
5. settings / design playground controls
6. persistence
7. module stub contracts
8. polish and cleanup

### Step 4: Validate
After implementation:
- run build
- run lint if available
- fix obvious errors
- summarize unresolved issues clearly

### Step 5: Report
Provide:
- what was built
- what files changed
- what stubs were added for future modules
- what design toggles exist for experimentation
- what should be built in Module 02 next

## Acceptance criteria
Module 01 is complete when:
- the app runs locally
- the desktop shell is visually coherent
- the main multi-panel workspace exists
- the UI feels like a believable foundation for the game
- module boundaries for later work are visible in code
- theme/layout experimentation is easy
- no future module logic has been prematurely overbuilt

## Guardrails
- Do not generate massive monolithic components.
- Do not hardcode future module logic into the shell.
- Do not add unnecessary dependencies without explaining why.
- Do not replace working project conventions unless there is a real problem.
- Do not sacrifice clean architecture for quick visual hacks.

## Output style
When responding:
- be concrete
- be implementation-minded
- favor action over abstract brainstorming
- explain tradeoffs briefly when relevant
- keep momentum high

Start by inspecting the repository and producing the Module 01 implementation plan.
