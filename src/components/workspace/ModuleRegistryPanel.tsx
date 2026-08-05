import React from "react";
import { Cpu, ShieldCheck, GitBranch, Terminal, Database, Sparkles, Brain, Bot, Search } from "lucide-react";

interface SystemContract {
  id: string;
  name: string;
  category: "Operating System" | "Governance" | "Orchestration" | "Domain" | "Integration";
  status: "Foundation Contract Ready" | "Deferred to Post-MVP";
  icon: React.ReactNode;
  description: string;
}

const REGISTERED_CONTRACTS: SystemContract[] = [
  {
    id: "thought-domain-matrix",
    name: "Unified Thought Domain Model",
    category: "Domain",
    status: "Foundation Contract Ready",
    icon: <Database className="w-4 h-4 text-emerald-500" />,
    description: "Core domain model (`Thought`, `ThoughtLink`, `ThoughtGraph`). Base representation of all workspace knowledge entities."
  },
  {
    id: "event-bus-bus",
    name: "System Event Bus Foundation",
    category: "Operating System",
    status: "Foundation Contract Ready",
    icon: <GitBranch className="w-4 h-4 text-emerald-500" />,
    description: "Decoupled domain publish/subscribe system for inter-module asynchronous event communication."
  },
  {
    id: "brain-core-contract",
    name: "The Brain (Cognitive OS)",
    category: "Operating System",
    status: "Deferred to Post-MVP",
    icon: <Brain className="w-4 h-4 text-amber-500" />,
    description: "Central cognitive OS contract stub. Behavioral implementation postponed to post-MVP phase."
  },
  {
    id: "brain-evolution-layer",
    name: "Brain Evolution Layer",
    category: "Operating System",
    status: "Deferred to Post-MVP",
    icon: <Sparkles className="w-4 h-4 text-amber-500" />,
    description: "Self-organizing structural evolution contract. Preserves immutable Constitution and user data privacy."
  },
  {
    id: "constitution-governance",
    name: "Constitution Layer",
    category: "Governance",
    status: "Foundation Contract Ready",
    icon: <ShieldCheck className="w-4 h-4 text-emerald-500" />,
    description: "Immutable governance rules contract (ethics, privacy, attribution, transparency, safety)."
  },
  {
    id: "reasoning-provider-contract",
    name: "Reasoning Provider Interface",
    category: "Integration",
    status: "Foundation Contract Ready",
    icon: <Terminal className="w-4 h-4 text-emerald-500" />,
    description: "Provider-agnostic abstraction contract. Ensures Atlas remains independent of any single external LLM/vendor."
  },
  {
    id: "agent-orchestrator-contract",
    name: "Agent Orchestration Fleet",
    category: "Orchestration",
    status: "Deferred to Post-MVP",
    icon: <Bot className="w-4 h-4 text-amber-500" />,
    description: "Multi-agent orchestration contract stub. Fleet behavioral logic deferred to future milestones."
  },
  {
    id: "scoutplex-atlext-stubs",
    name: "Scoutplex & Atlext Subsystems",
    category: "Orchestration",
    status: "Deferred to Post-MVP",
    icon: <Search className="w-4 h-4 text-amber-500" />,
    description: "Extended research and synthesis modules. Structural placeholders for future engineering."
  }
];

export const ModuleRegistryPanel: React.FC = () => {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-6">
        <h2 className="text-base font-semibold text-[var(--text-primary)] tracking-tight flex items-center space-x-2">
          <Cpu className="w-4 h-4 text-[var(--text-secondary)]" />
          <span>Architecture Contract Registry</span>
        </h2>
        <p className="text-xs text-[var(--text-tertiary)] mt-1 max-w-2xl leading-relaxed">
          The Milestone 1 Foundation establishes shared domain contracts and system architecture boundaries. Future cognitive and agent subsystems remain strict contract stubs awaiting future milestones.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {REGISTERED_CONTRACTS.map((contract) => (
          <div
            key={contract.id}
            className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-[var(--shadow-sm)] hover:border-[var(--border-focus)] transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2.5">
                  <div className="p-1.5 rounded-md bg-[var(--bg-subtle)] border border-[var(--border-color)]">
                    {contract.icon}
                  </div>
                  <h3 className="text-sm font-medium text-[var(--text-primary)]">
                    {contract.name}
                  </h3>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--bg-subtle)] text-[var(--text-tertiary)] border border-[var(--border-color)]">
                  {contract.category}
                </span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed mt-2 mb-3">
                {contract.description}
              </p>
            </div>

            <div className="pt-2 border-t border-[var(--border-color)] flex items-center justify-between text-[11px] font-mono">
              <span className="text-[var(--text-tertiary)]">Contract ID: {contract.id}</span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-sans font-medium ${
                  contract.status === "Foundation Contract Ready"
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                    : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                }`}
              >
                {contract.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
