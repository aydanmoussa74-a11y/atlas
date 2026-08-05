/**
 * Atlas Constitution Architecture Contract
 * Enforces immutable rules governing ethics, privacy, attribution, transparency, safety, and reasoning.
 * All reasoning and agent outputs must pass through Constitution validation.
 */

export interface ConstitutionRule {
  readonly id: string;
  readonly category: "ethics" | "copyright" | "attribution" | "privacy" | "transparency" | "safety";
  readonly description: string;
  readonly isImmutable: true;
}

export interface GovernanceAuditResult {
  passed: boolean;
  violations: Array<{
    ruleId: string;
    severity: "advisory" | "blocking";
    reason: string;
  }>;
  attributionNotices?: string[];
}

export interface ConstitutionEngineContract {
  auditThoughtProposal(proposalContent: string): Promise<GovernanceAuditResult>;
  verifyAttribution(sourceContent: string): Promise<GovernanceAuditResult>;
}
