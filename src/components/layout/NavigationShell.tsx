import React, { useEffect, useState } from "react";
import { useTheme } from "../../theme/ThemeProvider";
import { Sun, Moon, Server, Activity, Compass, Cpu, Layers } from "lucide-react";

interface NavigationShellProps {
  activeTab: "workspace" | "matrix" | "registry";
  onTabChange: (tab: "workspace" | "matrix" | "registry") => void;
}

export const NavigationShell: React.FC<NavigationShellProps> = ({
  activeTab,
  onTabChange,
}) => {
  const { theme, toggleTheme } = useTheme();
  const [serverStatus, setServerStatus] = useState<"checking" | "online" | "offline">("checking");
  const [serverVersion, setServerVersion] = useState<string>("");

  useEffect(() => {
    fetch("/api/health")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          setServerStatus("online");
          setServerVersion(data.version || "0.1.0");
        } else {
          setServerStatus("offline");
        }
      })
      .catch(() => setServerStatus("offline"));
  }, []);

  return (
    <header className="border-b border-[var(--border-color)] bg-[var(--bg-surface)] px-6 py-3.5 flex items-center justify-between transition-colors">
      <div className="flex items-center space-x-8">
        {/* Brand identity */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-[var(--accent-primary)] text-[var(--accent-foreground)] flex items-center justify-center font-semibold text-sm shadow-sm tracking-wider">
            AT
          </div>
          <div>
            <h1 className="text-base font-semibold tracking-tight text-[var(--text-primary)]">
              Atlas
            </h1>
            <p className="text-xs text-[var(--text-tertiary)] tracking-wide font-mono">
              AI-Native Thinking Workspace
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center space-x-1 border-l border-[var(--border-color)] pl-6">
          <button
            onClick={() => onTabChange("workspace")}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              activeTab === "workspace"
                ? "bg-[var(--accent-subtle)] text-[var(--text-primary)]"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)]"
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Workspace Shell</span>
          </button>

          <button
            onClick={() => onTabChange("matrix")}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              activeTab === "matrix"
                ? "bg-[var(--accent-subtle)] text-[var(--text-primary)]"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)]"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Thought Matrix</span>
          </button>

          <button
            onClick={() => onTabChange("registry")}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              activeTab === "registry"
                ? "bg-[var(--accent-subtle)] text-[var(--text-primary)]"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)]"
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Architecture Registry</span>
          </button>
        </nav>
      </div>

      {/* Right side controls */}
      <div className="flex items-center space-x-4">
        {/* Server status pill */}
        <div className="flex items-center space-x-2 px-2.5 py-1 rounded-full bg-[var(--bg-subtle)] border border-[var(--border-color)] text-xs text-[var(--text-secondary)]">
          <Server className="w-3 h-3 text-[var(--text-tertiary)]" />
          <span className="font-mono text-[11px]">
            {serverStatus === "checking" && "Connecting..."}
            {serverStatus === "online" && `Engine v${serverVersion}`}
            {serverStatus === "offline" && "Engine Offline"}
          </span>
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              serverStatus === "online"
                ? "bg-[var(--status-active)]"
                : serverStatus === "checking"
                ? "bg-[var(--status-warning)] animate-pulse"
                : "bg-red-500"
            }`}
          />
        </div>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          className="p-1.5 rounded-md text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] border border-[var(--border-color)] transition-colors"
        >
          {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
};
