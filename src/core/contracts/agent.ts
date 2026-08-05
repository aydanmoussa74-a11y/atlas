import { AtlasModule } from "./module";

/**
 * Agent Orchestration Architecture Contract (Placeholder/Stub for future milestones)
 * Multi-agent coordination system contract.
 */
export interface AgentManifest {
  readonly agentId: string;
  readonly name: string;
  readonly role: string;
}

export interface AgentOrchestratorContract extends AtlasModule {
  registerAgent(manifest: AgentManifest): void;
  getRegisteredAgents(): AgentManifest[];
}
