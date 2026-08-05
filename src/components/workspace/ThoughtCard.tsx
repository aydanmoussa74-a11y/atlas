import React from "react";
import { Thought } from "../../core/thought/types";
import { Tag, Link2, Clock, UserCheck } from "lucide-react";

interface ThoughtCardProps {
  thought: Thought;
}

export const ThoughtCard: React.FC<ThoughtCardProps> = ({ thought }) => {
  return (
    <div className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-[var(--shadow-sm)] hover:border-[var(--border-focus)] transition-all">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-[var(--bg-subtle)] text-[var(--text-secondary)] border border-[var(--border-color)]">
            {thought.type}
          </span>
          <h3 className="text-sm font-semibold text-[var(--text-primary)] tracking-tight">
            {thought.title}
          </h3>
        </div>
        <div className="flex items-center space-x-1 text-[11px] text-[var(--text-tertiary)] font-mono">
          <UserCheck className="w-3 h-3" />
          <span>{thought.metadata.author}</span>
        </div>
      </div>

      <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-3 whitespace-pre-wrap">
        {thought.content}
      </p>

      <div className="pt-2.5 border-t border-[var(--border-color)] flex items-center justify-between text-[11px] text-[var(--text-tertiary)] font-mono">
        <div className="flex items-center space-x-3">
          {thought.metadata.tags.length > 0 && (
            <div className="flex items-center space-x-1">
              <Tag className="w-3 h-3" />
              <span>{thought.metadata.tags.join(", ")}</span>
            </div>
          )}
          {thought.links.length > 0 && (
            <div className="flex items-center space-x-1">
              <Link2 className="w-3 h-3" />
              <span>{thought.links.length} connections</span>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-1">
          <Clock className="w-3 h-3" />
          <span>{new Date(thought.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>
    </div>
  );
};
