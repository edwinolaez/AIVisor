"use client";

import type { Program, StudentProfile } from "@/types";
import { getSoftSkillsForProfile } from "@/data";
import { AlisPanel } from "./AlisPanel";

export function SoftSkillsTab({
  program,
  profile,
}: {
  program: Program;
  profile: StudentProfile;
}) {
  const skills = getSoftSkillsForProfile(program, profile.credential, profile.year);

  const maxYear =
    profile.credential === "diploma"
      ? 2
      : profile.credential === "ut-cert"
        ? 1
        : profile.credential === "bachelors"
          ? 4
          : 2;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Soft Skills Development</h2>
        <p className="text-sm text-slate-500">
          Year-aligned skills for {program.name} — {skills.label}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-emerald-500 transition-all"
            style={{ width: `${(profile.year / maxYear) * 100}%` }}
          />
        </div>
        <span className="text-sm font-medium text-slate-600">
          Year {profile.year} of {maxYear}
        </span>
      </div>

      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
          Roadmap focus this year
        </p>
        <p className="mt-1 font-medium text-emerald-900">{skills.roadmapFocus}</p>
      </div>

      <div>
        <h3 className="mb-3 font-semibold text-slate-800">Your focus this year</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {skills.focusSkills.map((skill) => (
            <div
              key={skill}
              className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-sm">
                ★
              </span>
              <span className="font-medium text-slate-800">{skill}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 font-semibold text-slate-800">Recommended activities</h3>
        <ul className="space-y-2">
          {skills.activities.map((activity) => (
            <li
              key={activity}
              className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"
            >
              <span className="mt-0.5 text-emerald-500">→</span>
              {activity}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">
          Why these skills now?
        </p>
        <p className="mt-2 text-sm text-amber-900">{skills.whyNow}</p>
      </div>

      {skills.comingUp && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Coming up next year
          </p>
          <p className="mt-2 text-sm text-slate-700">{skills.comingUp}</p>
        </div>
      )}

      <AlisPanel resources={skills.alisResources} />

      <div>
        <h3 className="mb-3 font-semibold text-slate-800">All years at a glance</h3>
        <div className="space-y-2">
          {program.softSkills
            .filter((s) => s.credential === profile.credential)
            .map((s) => (
              <div
                key={`${s.credential}-${s.year}`}
                className={`rounded-lg border px-4 py-3 text-sm ${
                  s.year === profile.year
                    ? "border-emerald-400 bg-emerald-50"
                    : "border-slate-200 bg-white text-slate-500"
                }`}
              >
                <span className="font-medium">{s.label}</span>
                <span className="ml-2">{s.focusSkills.slice(0, 2).join(", ")}…</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
