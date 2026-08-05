/**
 * Atlas Core Domain Model: Thought Entity
 * Everything in Atlas derives from the unified Thought entity.
 */

export type ThoughtType =
  | "concept"
  | "hypothesis"
  | "note"
  | "synthesis"
  | "query"
  | "artifact"
  | "connection";

export type ThoughtStatus = "draft" | "active" | "archived" | "synthesized";

export interface ThoughtLink {
  id: string;
  sourceId: string;
  targetId: string;
  relationType: "supports" | "contradicts" | "expands" | "derives_from" | "relates_to";
  weight?: number;
  metadata?: Record<string, unknown>;
}

export interface ThoughtMetadata {
  author: "user" | "system" | "agent";
  agentId?: string;
  tags: string[];
  pinned?: boolean;
  confidenceScore?: number;
  provenance?: {
    sourceUrl?: string;
    citation?: string;
    generatedTimestamp?: string;
  };
}

export interface Thought {
  id: string;
  title: string;
  content: string;
  type: ThoughtType;
  status: ThoughtStatus;
  createdAt: string;
  updatedAt: string;
  metadata: ThoughtMetadata;
  links: ThoughtLink[];
}

export interface ThoughtGraph {
  nodes: Thought[];
  edges: ThoughtLink[];
}
