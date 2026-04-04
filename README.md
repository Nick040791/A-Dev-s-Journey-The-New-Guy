# 🕹️ A Dev's Journey: The New Guy

**A Dev's Journey: The New Guy** is a neon-drenched, retro-arcade coding simulator that disguises a full-stack bootcamp as a video game. Write real code in an integrated IDE, survive sprint deadlines, and learn alongside a dynamic, AI-powered dev team that mentors, reviews, and challenges you. Welcome to your new internship!

## 🚀 Core Features

* **Desktop Shell / Game Shell:** A polished Electron shell with a top bar, chat lane, Monaco workspace, mission / mentor rail, and output drawer.
* **Retro-Neon Design Playground:** Centralized theme presets plus live controls for density, glow intensity, and accent behavior.
* **Replaceable Module Boundaries:** Mocked adapters for mission, evaluation, conversation, mentor, narrative, and presentation systems.
* **Persistent Shell State:** Theme, active view, panel open state, and panel layouts survive restarts for fast iteration.

## 🛠️ Tech Stack

We are building this using the modern web stack to create a seamless desktop application:
* **Desktop Runtime:** Electron
* **Frontend:** React + TypeScript + Vite
* **Styling:** Tailwind CSS + centralized shell tokens
* **Code Editor:** Monaco Editor
* **State Management:** Zustand
* **Layout System:** react-resizable-panels

## 🗺️ Roadmap: Where We Are At

We are currently in **Phase 1: Foundation**. The project is highly modular. 

- [x] **Module 1: The Shell.** Desktop shell, multi-panel workspace, theme presets, settings surface, and mocked module seams.
- [ ] **Module 2: Shell Systems.** Real shell interactions: richer layout memory, mission routing, and deeper workspace affordances.
- [ ] **Module 3: The Team.** Hook up the local conversation / mentor transport behind the existing shell adapters.
- [ ] **Module 4: Sprint 1.** Create the first playable tutorial mission flow on top of the established shell.

## 💻 Getting Started (Local Development)

Module 01 does **not** require Ollama yet. Local model integration remains intentionally out of scope for this shell build.

### Prerequisites

* Node.js 22+

### Install

```bash
npm install
```

### Run The Desktop Shell

```bash
npm run dev
```

### Build Production Assets

```bash
npm run build
```

### Lint

```bash
npm run lint
```
