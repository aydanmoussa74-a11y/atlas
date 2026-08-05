import { useState } from "react";
import { ThemeProvider } from "./theme/ThemeProvider";
import { NavigationShell } from "./components/layout/NavigationShell";
import { WorkspaceShell } from "./components/workspace/WorkspaceShell";
import { ModuleRegistryPanel } from "./components/workspace/ModuleRegistryPanel";
import { ThoughtCard } from "./components/workspace/ThoughtCard";
import { Thought } from "./core/thought/types";

function AppContent() {
  const [activeTab, setActiveTab] = useState<"workspace" | "matrix" | "registry">("workspace");

  // Initial matrix demonstration thoughts derived from domain model
  const matrixThoughts: Thought[] = [
    {
      id: "matrix-001",
      title: "Core Architecture Principle: Domain Contracts First",
      content: "All modules interact solely via published event contracts and interface abstractions. No subsystem holds concrete dependencies on external providers or concrete models.",
      type: "synthesis",
      status: "active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      metadata: {
        author: "system",
        tags: ["architecture", "domain-contracts"],
        pinned: true
      },
      links: []
    },
    {
      id: "matrix-002",
      title: "Reasoning Provider Independence Contract",
      content: "External model providers supply computational reasoning capabilities to Atlas but never define Atlas identity or cognitive structure.",
      type: "concept",
      status: "active",
      createdAt: new Date(Date.now() - 1800000).toISOString(),
      updatedAt: new Date(Date.now() - 1800000).toISOString(),
      metadata: {
        author: "system",
        tags: ["reasoning-provider", "vendor-agnostic"],
        pinned: false
      },
      links: []
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors">
      <NavigationShell activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === "workspace" && <WorkspaceShell />}

      {activeTab === "matrix" && (
        <div className="flex-1 p-6 max-w-4xl mx-auto w-full space-y-4">
          <div className="mb-6">
            <h2 className="text-base font-semibold text-[var(--text-primary)] tracking-tight">
              Thought Matrix Overview
            </h2>
            <p className="text-xs text-[var(--text-tertiary)] mt-1">
              Visualizing domain thoughts, hypotheses, and syntheses across the active workspace.
            </p>
          </div>
          {matrixThoughts.map((thought) => (
            <ThoughtCard key={thought.id} thought={thought} />
          ))}
        </div>
      )}

      {activeTab === "registry" && <ModuleRegistryPanel />}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
