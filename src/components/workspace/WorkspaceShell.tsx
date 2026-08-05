import React, { useState, useEffect } from "react";
import { Thought, ThoughtType } from "../../core/thought/types";
import { eventBus } from "../../core/events/eventBus";
import { ThoughtCard } from "./ThoughtCard";
import { Plus, Brain, Sparkles, ShieldCheck, Compass, Radio, LayoutGrid, ListFilter } from "lucide-react";

export const WorkspaceShell: React.FC = () => {
  const [thoughts, setThoughts] = useState<Thought[]>([
    {
      id: "thought-001",
      title: "Atlas Foundation Architectural Blueprint",
      content: "Atlas is an AI-Native Thinking Workspace. Every entity derives from the unified Thought domain model. The architecture is decoupled via domain event contracts and vendor-agnostic reasoning interfaces.",
      type: "concept",
      status: "active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      metadata: {
        author: "system",
        tags: ["architecture", "foundation", "milestone-1"],
        pinned: true
      },
      links: []
    },
    {
      id: "thought-002",
      title: "Immutable Governance Constitution Hypothesis",
      content: "All reasoning and agent operations must pass through an immutable Constitution layer evaluating ethics, privacy, attribution, transparency, and safety before user presentation.",
      type: "hypothesis",
      status: "active",
      createdAt: new Date(Date.now() - 3600000).toISOString(),
      updatedAt: new Date(Date.now() - 3600000).toISOString(),
      metadata: {
        author: "user",
        tags: ["constitution", "governance"],
        pinned: false
      },
      links: [
        {
          id: "link-001",
          sourceId: "thought-002",
          targetId: "thought-001",
          relationType: "supports"
        }
      ]
    }
  ]);

  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newType, setNewType] = useState<ThoughtType>("concept");
  const [isCreating, setIsCreating] = useState(false);
  const [filterType, setFilterType] = useState<string>("all");

  // Subscribe to EventBus for THOUGHT_CREATED
  useEffect(() => {
    const unsubscribe = eventBus.subscribe("THOUGHT_CREATED", ({ thought }) => {
      setThoughts((prev) => [thought, ...prev]);
    });
    return unsubscribe;
  }, []);

  const handleCreateThought = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newThought: Thought = {
      id: `thought-${Date.now()}`,
      title: newTitle.trim(),
      content: newContent.trim(),
      type: newType,
      status: "active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      metadata: {
        author: "user",
        tags: ["workspace"],
        pinned: false
      },
      links: []
    };

    // Publish to EventBus foundation
    eventBus.publish("THOUGHT_CREATED", { thought: newThought });

    setNewTitle("");
    setNewContent("");
    setIsCreating(false);
  };

  const filteredThoughts = thoughts.filter((t) => {
    if (filterType === "all") return true;
    return t.type === filterType;
  });

  return (
    <div className="flex-1 flex flex-col md:flex-row h-[calc(100vh-57px)] overflow-hidden bg-[var(--bg-primary)]">
      {/* Primary Workspace Stream */}
      <main className="flex-1 flex flex-col border-r border-[var(--border-color)] overflow-hidden">
        {/* Workspace Toolbar */}
        <div className="px-6 py-3 border-b border-[var(--border-color)] bg-[var(--bg-surface)] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Compass className="w-4 h-4 text-[var(--text-secondary)]" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)] font-mono">
              Spatial Canvas
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded bg-[var(--bg-subtle)] text-[var(--text-tertiary)] font-mono border border-[var(--border-color)]">
              {thoughts.length} Thoughts
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1.5 text-xs text-[var(--text-secondary)]">
              <ListFilter className="w-3.5 h-3.5 text-[var(--text-tertiary)]" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="bg-[var(--bg-subtle)] border border-[var(--border-color)] rounded px-2 py-1 text-xs text-[var(--text-primary)] focus:outline-none"
              >
                <option value="all">All Types</option>
                <option value="concept">Concept</option>
                <option value="hypothesis">Hypothesis</option>
                <option value="note">Note</option>
                <option value="synthesis">Synthesis</option>
                <option value="query">Query</option>
              </select>
            </div>

            <button
              onClick={() => setIsCreating(!isCreating)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-[var(--accent-primary)] text-[var(--accent-foreground)] hover:opacity-90 transition-opacity shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Capture Thought</span>
            </button>
          </div>
        </div>

        {/* Thought Input Drawer */}
        {isCreating && (
          <form
            onSubmit={handleCreateThought}
            className="p-4 bg-[var(--bg-surface)] border-b border-[var(--border-color)] space-y-3"
          >
            <div className="flex items-center space-x-3">
              <input
                type="text"
                placeholder="Thought Title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="flex-1 px-3 py-1.5 text-xs bg-[var(--bg-subtle)] border border-[var(--border-color)] rounded-md text-[var(--text-primary)] focus:outline-none focus:border-[var(--border-focus)]"
                autoFocus
              />
              <select
                value={newType}
                onChange={(e) => setNewType(e.target.value as ThoughtType)}
                className="px-2.5 py-1.5 text-xs bg-[var(--bg-subtle)] border border-[var(--border-color)] rounded-md text-[var(--text-primary)] focus:outline-none"
              >
                <option value="concept">Concept</option>
                <option value="hypothesis">Hypothesis</option>
                <option value="note">Note</option>
                <option value="synthesis">Synthesis</option>
                <option value="query">Query</option>
              </select>
            </div>

            <textarea
              placeholder="Detail your thought or query..."
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              rows={3}
              className="w-full p-3 text-xs bg-[var(--bg-subtle)] border border-[var(--border-color)] rounded-md text-[var(--text-primary)] focus:outline-none focus:border-[var(--border-focus)] resize-none"
            />

            <div className="flex items-center justify-end space-x-2">
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="px-3 py-1.5 rounded-md text-xs text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)] transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1.5 rounded-md text-xs font-medium bg-[var(--accent-primary)] text-[var(--accent-foreground)] hover:opacity-90 transition-opacity"
              >
                Save Thought
              </button>
            </div>
          </form>
        )}

        {/* Spatial Stream */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {filteredThoughts.length === 0 ? (
            <div className="text-center py-12 text-[var(--text-tertiary)]">
              <p className="text-xs">No thoughts matching the selected filter.</p>
            </div>
          ) : (
            filteredThoughts.map((t) => <ThoughtCard key={t.id} thought={t} />)
          )}
        </div>
      </main>

      {/* Secondary Spatial Subsystem Panel (Contract Placeholders) */}
      <aside className="w-full md:w-80 lg:w-96 bg-[var(--bg-surface)] flex flex-col overflow-y-auto border-t md:border-t-0 border-[var(--border-color)]">
        <div className="p-4 border-b border-[var(--border-color)]">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)] font-mono flex items-center space-x-2">
            <LayoutGrid className="w-3.5 h-3.5 text-[var(--text-secondary)]" />
            <span>Subsystem Architecture</span>
          </h2>
          <p className="text-[11px] text-[var(--text-tertiary)] mt-1">
            Contract boundaries defined in Milestone 1. Implementations deferred.
          </p>
        </div>

        <div className="p-4 space-y-4">
          {/* Brain OS Stub */}
          <div className="p-3.5 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border-color)]">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center space-x-2 text-xs font-medium text-[var(--text-primary)]">
                <Brain className="w-3.5 h-3.5 text-amber-500" />
                <span>The Brain (Cognitive OS)</span>
              </div>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--bg-surface)] text-[var(--text-tertiary)] border border-[var(--border-color)]">
                STUB
              </span>
            </div>
            <p className="text-[11px] text-[var(--text-tertiary)] leading-normal">
              Central operating system contract. Memory graphs, reasoning loops, and cognitive context deferred to post-MVP.
            </p>
          </div>

          {/* Brain Evolution Layer Stub */}
          <div className="p-3.5 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border-color)]">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center space-x-2 text-xs font-medium text-[var(--text-primary)]">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Brain Evolution Layer</span>
              </div>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--bg-surface)] text-[var(--text-tertiary)] border border-[var(--border-color)]">
                STUB
              </span>
            </div>
            <p className="text-[11px] text-[var(--text-tertiary)] leading-normal">
              Internal structure reorganization contract. Immutable constitution constraints intact.
            </p>
          </div>

          {/* Constitution Engine Stub */}
          <div className="p-3.5 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border-color)]">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center space-x-2 text-xs font-medium text-[var(--text-primary)]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Constitution Engine</span>
              </div>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--bg-surface)] text-[var(--text-tertiary)] border border-[var(--border-color)]">
                CONTRACT
              </span>
            </div>
            <p className="text-[11px] text-[var(--text-tertiary)] leading-normal">
              Safety, privacy, attribution, transparency, and ethics rules contract defined.
            </p>
          </div>

          {/* Event Bus Status */}
          <div className="p-3.5 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border-color)]">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center space-x-2 text-xs font-medium text-[var(--text-primary)]">
                <Radio className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
                <span>Event Bus Status</span>
              </div>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                ACTIVE
              </span>
            </div>
            <p className="text-[11px] text-[var(--text-tertiary)] leading-normal">
              Decoupled publish/subscribe bus active for domain events (`THOUGHT_CREATED`, `THEME_CHANGED`).
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
};
