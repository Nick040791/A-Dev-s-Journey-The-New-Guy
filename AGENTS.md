# AGENTS.md

## Purpose
This repository is building **A Dev's Journey: The New Guy**, a desktop-first 2D retro-neon educational coding game. The product is best treated as a **narrative dev-team simulator powered by a curriculum engine**.

## Current build priority
The current priority is **Module 01: App Shell / Game Shell**.

The goal of Module 01 is to produce a polished, modular desktop shell that lets the team experiment with layout, visual direction, and extension points for future modules.

## Module 01 rules
- Focus on shell and layout only.
- Build the desktop frame and workspace structure.
- Use placeholder data where needed.
- Add clean contracts/stubs for future modules.
- Do not fully implement AI, scoring, curriculum logic, or sandbox execution yet.

## Desired layout
- top bar
- left chat panel
- center workspace/editor panel
- right mission/mentor panel
- bottom output drawer

## Architectural expectations
- keep modules replaceable
- keep theme values centralized
- keep mock data separate from components
- keep components small and focused
- avoid giant rewrites
- avoid coupling the shell to future module internals

## Visual direction
- desktop-first
- dark base
- neon accents
- readable text-heavy work zones
- retro arcade flavor without hurting usability

## Preferred stack
Unless the repo already establishes a different intentional standard, prefer:
- Electron
- Vite
- React
- TypeScript
- Tailwind CSS
- Monaco Editor

## Working norms for agents
1. Inspect existing files and conventions first.
2. Plan before broad edits.
3. Implement in small slices.
4. Validate with build/lint when possible.
5. Summarize changed files and unresolved issues.

## Out of scope right now
- real local model integration
- real scoring system
- real branching narrative engine
- real code execution sandbox
- deep animation systems
- multiplayer

## Definition of success for Module 01
- app runs locally
- shell layout feels believable
- visual baseline is strong
- design iteration is easy
- future modules have clear integration points
