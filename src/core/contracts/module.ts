/**
 * Standard Domain Module Contract
 * Every subsystem in Atlas implements this interface for lifecycle governance.
 */

export type ModuleStatus = "uninitialized" | "ready" | "active" | "error" | "disabled";

export interface AtlasModule {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  getStatus(): ModuleStatus;
  initialize(): Promise<void>;
  shutdown(): Promise<void>;
}
