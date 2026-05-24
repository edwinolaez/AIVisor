"use client";

import { useState } from "react";
import type { TabId } from "@/types";
import { credentialLabels, getProgram, goalLabels } from "@/data";
import { useProfile } from "@/context/ProfileContext";
import { PathwayTab } from "./PathwayTab";
import { SoftSkillsTab } from "./SoftSkillsTab";
import { SwitchProgramTab } from "./SwitchProgramTab";
import { CoopTab } from "./CoopTab";
import { ChatTab } from "./ChatTab";
import { AlisGlobalFooter } from "./AlisGlobalFooter";

const TABS: { id: TabId; label: string; icon: string }[] = [
  { id: "pathway", label: "My Pathway", icon: "🗺️" },
  { id: "soft-skills", label: "Soft Skills", icon: "★" },
  { id: "switch", label: "Switch Program", icon: "↔" },
  { id: "coop", label: "Co-op & Career", icon: "💼" },
  { id: "chat", label: "Ask AIVisor", icon: "💬" },
];

export function Dashboard() {
  const { profile, clearProfile } = useProfile();
  const [tab, setTab] = useState<TabId>("pathway");

  if (!profile) return null;

  const program = getProgram(profile.programId);

  return (
    <div>
      <header className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">
              AI<span className="text-indigo-600">Visor</span>
            </h1>
            <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-700">
              {program.name}
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-500">
            Welcome, <span className="font-medium text-slate-700">{profile.name}</span> ·{" "}
            {credentialLabels[profile.credential]}, Year {profile.year} ·{" "}
            {goalLabels[profile.goal]}
          </p>
        </div>
        <button
          type="button"
          onClick={clearProfile}
          className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-500 hover:border-slate-300 hover:text-slate-700"
        >
          Reset profile
        </button>
      </header>

      <nav className="mb-6 flex flex-wrap gap-1 rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition ${
              tab === t.id
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <span>{t.icon}</span>
            <span className="hidden sm:inline">{t.label}</span>
          </button>
        ))}
      </nav>

      <main className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        {tab === "pathway" && <PathwayTab program={program} profile={profile} />}
        {tab === "soft-skills" && <SoftSkillsTab program={program} profile={profile} />}
        {tab === "switch" && <SwitchProgramTab program={program} profile={profile} />}
        {tab === "coop" && <CoopTab program={program} profile={profile} />}
        {tab === "chat" && <ChatTab profile={profile} />}
      </main>

      {tab !== "chat" && <AlisGlobalFooter />}
    </div>
  );
}
