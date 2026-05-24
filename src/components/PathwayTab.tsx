"use client";

import type { Program, StudentProfile } from "@/types";
import { getPathwayForGoal, getRoadmapForProfile } from "@/data";
import { AlisPanel } from "./AlisPanel";

export function PathwayTab({
  program,
  profile,
}: {
  program: Program;
  profile: StudentProfile;
}) {
  const pathway = getPathwayForGoal(program, profile.goal, profile.credential);
  const currentRoadmap = getRoadmapForProfile(program, profile.credential, profile.year);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">My Pathway</h2>
        <p className="text-sm text-slate-500">{program.tagline}</p>
      </div>

      <div className="rounded-xl border-2 border-indigo-200 bg-indigo-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
          You are here
        </p>
        <h3 className="mt-1 text-lg font-bold text-indigo-900">{currentRoadmap.label}</h3>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs font-medium text-indigo-700">Courses this year</p>
            <ul className="mt-1 space-y-1">
              {currentRoadmap.courses.map((c) => (
                <li key={c} className="text-sm text-indigo-900">
                  • {c}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-medium text-indigo-700">Milestones</p>
            <ul className="mt-1 space-y-1">
              {currentRoadmap.milestones.map((m) => (
                <li key={m} className="text-sm text-indigo-900">
                  • {m}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-1 font-semibold text-slate-800">{pathway.label}</h3>
        <p className="mb-4 text-sm text-slate-500">{pathway.description}</p>

        <div className="relative space-y-0">
          {pathway.steps.map((step, i) => (
            <div key={step.phase} className="relative flex gap-4 pb-8 last:pb-0">
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    i === 0
                      ? "bg-indigo-600 text-white ring-4 ring-indigo-100"
                      : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {i + 1}
                </div>
                {i < pathway.steps.length - 1 && (
                  <div className="mt-1 w-0.5 flex-1 bg-slate-200" />
                )}
              </div>
              <div className="min-w-0 flex-1 pb-2">
                <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <h4 className="font-semibold text-slate-900">{step.phase}</h4>
                    {step.credential && (
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                        {step.credential}
                      </span>
                    )}
                  </div>
                  {step.duration && (
                    <p className="mt-1 text-xs text-slate-500">Duration: {step.duration}</p>
                  )}
                  {step.requirements && (
                    <p className="mt-2 text-sm text-slate-600">
                      <span className="font-medium">Requirements:</span> {step.requirements}
                    </p>
                  )}
                  {step.milestones && (
                    <ul className="mt-2 space-y-1">
                      {step.milestones.map((m) => (
                        <li key={m} className="text-sm text-slate-600">
                          ✓ {m}
                        </li>
                      ))}
                    </ul>
                  )}
                  {step.alisResources && step.alisResources.length > 0 && (
                    <div className="mt-3">
                      <AlisPanel resources={step.alisResources} title="Verify on ALIS" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 font-semibold text-slate-800">Full program roadmap</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {program.roadmap.map((r) => {
            const isCurrent =
              r.credential === profile.credential && r.year === profile.year;
            return (
              <div
                key={`${r.credential}-${r.year}`}
                className={`rounded-xl border p-3 text-sm ${
                  isCurrent
                    ? "border-indigo-400 bg-indigo-50 ring-2 ring-indigo-200"
                    : "border-slate-200 bg-white"
                }`}
              >
                <p
                  className={`font-semibold ${isCurrent ? "text-indigo-700" : "text-slate-700"}`}
                >
                  {r.label} {isCurrent && "← You"}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {r.courses.slice(0, 2).join(", ")}…
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
