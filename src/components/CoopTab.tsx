"use client";

import type { Program, StudentProfile } from "@/types";
import { getCoopForProfile } from "@/data";
import { AlisPanel } from "./AlisPanel";

export function CoopTab({
  program,
  profile,
}: {
  program: Program;
  profile: StudentProfile;
}) {
  const coop = getCoopForProfile(program, profile.credential, profile.year);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Co-op & Career Prep</h2>
        <p className="text-sm text-slate-500">
          Checklists and tips for {coop.label}
        </p>
      </div>

      <div className="rounded-xl border border-violet-200 bg-violet-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-violet-700">
          Your stage
        </p>
        <h3 className="mt-1 text-lg font-bold text-violet-900">{coop.label}</h3>
      </div>

      <div>
        <h3 className="mb-3 font-semibold text-slate-800">Checklist</h3>
        <ul className="space-y-2">
          {coop.checklist.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"
            >
              <span className="text-violet-500">☐</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="mb-3 font-semibold text-slate-800">Pro tips</h3>
        <ul className="space-y-2">
          {coop.tips.map((tip) => (
            <li
              key={tip}
              className="rounded-lg border border-violet-100 bg-violet-50 px-4 py-2 text-sm text-violet-900"
            >
              💡 {tip}
            </li>
          ))}
        </ul>
      </div>

      <AlisPanel resources={coop.alisResources} title="Job search resources (ALIS)" />

      <div>
        <h3 className="mb-3 font-semibold text-slate-800">All co-op stages</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {program.coop.map((c) => {
            const isCurrent =
              c.credential === profile.credential && c.year === profile.year;
            return (
              <div
                key={`${c.credential}-${c.year}`}
                className={`rounded-xl border p-3 text-sm ${
                  isCurrent
                    ? "border-violet-400 bg-violet-50 ring-2 ring-violet-200"
                    : "border-slate-200 bg-white"
                }`}
              >
                <p className={`font-semibold ${isCurrent ? "text-violet-700" : "text-slate-600"}`}>
                  {c.label} {isCurrent && "← You"}
                </p>
                <p className="mt-1 text-xs text-slate-500">{c.checklist[0]}…</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
