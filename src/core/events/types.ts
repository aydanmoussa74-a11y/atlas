import { Thought, ThoughtLink } from "../thought/types";

export type SystemEventType =
  | "THOUGHT_CREATED"
  | "THOUGHT_UPDATED"
  | "THOUGHT_DELETED"
  | "THOUGHT_LINKED"
  | "THEME_CHANGED"
  | "MODULE_STATUS_CHANGED"
  | "SYSTEM_ALERT";

export interface SystemEventPayloadMap {
  THOUGHT_CREATED: { thought: Thought };
  THOUGHT_UPDATED: { thought: Thought };
  THOUGHT_DELETED: { thoughtId: string };
  THOUGHT_LINKED: { link: ThoughtLink };
  THEME_CHANGED: { theme: "light" | "dark" };
  MODULE_STATUS_CHANGED: { moduleId: string; status: "initialized" | "idle" | "active" | "error" };
  SYSTEM_ALERT: { level: "info" | "warning" | "error"; message: string };
}

export type EventCallback<T extends SystemEventType> = (
  payload: SystemEventPayloadMap[T]
) => void;
