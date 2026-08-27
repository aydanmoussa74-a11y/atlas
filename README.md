# Atlas

**An AI-native thinking workspace built for deep thinking, research, and creation.**

Atlas is an experimental workspace for turning thoughts, ideas, questions, and connections into something more structured.

Instead of treating every thought as a separate note, Atlas uses a common `Thought` model that gives each thought a type, status, metadata, and relationships with other thoughts.

The project is still early. Right now, I'm focused on getting the underlying structure right before building the more advanced parts.

---

## Why Atlas?

I wanted a workspace that felt closer to how thinking actually happens.

Ideas don't always arrive as clean notes. Sometimes they're questions. Sometimes they're rough concepts, hypotheses, connections, or something that only becomes useful after being combined with another idea.

Atlas is an experiment around that idea:

**What if a thinking workspace treated thoughts as connected objects instead of isolated documents?**

---

## Current State

**Early architectural prototype**

The current version focuses on:

- The core Thought domain model
- Creating and displaying thoughts
- Filtering thoughts by type
- Thought relationships
- A Thought Matrix view
- Domain event handling
- Clear boundaries between major subsystems
- A basic module registry
- The foundation for future reasoning and governance systems

Some of the larger subsystems are currently only contracts or placeholders. They are intentionally left incomplete while the foundation is being developed.

---

## Core Concept

Everything in Atlas starts with a `Thought`.

A thought can currently be:

- Concept
- Hypothesis
- Note
- Synthesis
- Query
- Artifact
- Connection

Thoughts can also have relationships with one another, including:

- Supports
- Contradicts
- Expands
- Derives from
- Relates to

This gives Atlas a foundation for representing ideas as a connected structure rather than a collection of unrelated notes.

---

## Architecture

Atlas is organized around domain boundaries rather than putting everything into one large application layer.

At the center is the Thought domain.

```text
                    Atlas UI
                       │
          ┌────────────┴────────────┐
          │                         │
      Workspace                Thought Matrix
          │                         │
          └────────────┬────────────┘
                       │
                 Domain Events
                       │
                  Event Bus
                       │
          ┌────────────┼────────────┐
          │            │            │
       Thought     Governance    Subsystems
       Domain       Contracts      / Modules
