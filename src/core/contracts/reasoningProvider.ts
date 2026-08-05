/**
 * Vendor-Agnostic Reasoning Provider Contract
 * External models provide reasoning capabilities but never define Atlas's identity.
 */

export interface ReasoningOptions {
  temperature?: number;
  maxTokens?: number;
  contextThoughtIds?: string[];
}

export interface ReasoningResponse {
  rawContent: string;
  structuredSyntheses?: string[];
  suggestedConnections?: Array<{
    targetThoughtId: string;
    relationship: string;
    rationale: string;
  }>;
}

export interface ReasoningProvider {
  readonly providerId: string;
  readonly providerName: string;
  isAvailable(): Promise<boolean>;
  processReasoning(
    prompt: string,
    options?: ReasoningOptions
  ): Promise<ReasoningResponse>;
}
