"use client";

import { useState } from "react";
import type { Program, ProgramId, StudentProfile } from "@/types";
import { getProgram, programList } from "@/data";
import { AlisPanel } from "./AlisPanel";

export function SwitchProgramTab({
  program,
  profile,
}: {
  program: Program;
  profile: StudentProfile;
}) {
  const [selectedId, setSelectedId] = useState<ProgramId>(
    program.switchOptions[0]?.targetProgramId ?? "computer-science"
  );

  const switchOption =
    program.switchOptions.find((s) => s.targetProgramId === selectedId) ??
    program.switchOptions[0];

  const targetProgram = switchOption ? getProgram(switchOption.targetProgramId) : null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Switch Program</h2>
        <p className="text-sm text-slate-500">
          Compare programs, plan your new pathway, and verify credits on Transfer Alberta.
        </p>
      </div>

      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
        ⚠️ Always meet with your academic advisor and confirm transfer credits on{" "}
        <a
          href="https://transferalberta.alberta.ca/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold underline"
        >
          Transfer Alberta
        </a>{" "}
        before switching programs.
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Switch from {program.name} to:
        </label>
        <div className="flex flex-wrap gap-2">
          {programList
            .filter((p) => p.id !== program.id)
            .map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelectedId(p.id)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                  selectedId === p.id
                    ? "bg-indigo-600 text-white"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-indigo-300"
                }`}
              >
                {p.name}
              </button>
            ))}
        </div>
      </div>

      {switchOption && targetProgram && (
        <>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-xs font-semibold uppercase text-slate-400">Current</p>
              <h3 className="text-lg font-bold text-slate-900">{program.name}</h3>
              <p className="mt-1 text-sm text-slate-500">
                {profile.credential}, Year {profile.year}
              </p>
            </div>
            <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-4">
              <p className="text-xs font-semibold uppercase text-indigo-400">Target</p>
              <h3 className="text-lg font-bold text-indigo-900">{targetProgram.name}</h3>
              <p className="mt-1 text-sm text-indigo-700">{switchOption.newPathSummary}</p>
            </div>
          </div>

          <p className="text-sm text-slate-600">{switchOption.summary}</p>

          <div>
            <h3 className="mb-2 font-semibold text-slate-800">Comparison</h3>
            <ul className="space-y-2">
              {switchOption.comparisonPoints.map((point) => (
                <li
                  key={point}
                  className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700"
                >
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-2 font-semibold text-slate-800">Transfer & action checklist</h3>
            <ul className="space-y-2">
              {switchOption.transferNotes.map((note) => (
                <li
                  key={note}
                  className="flex items-start gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700"
                >
                  <span className="text-indigo-500">☐</span>
                  {note}
                </li>
              ))}
              <li className="flex items-start gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700">
                <span className="text-indigo-500">☐</span>
                Book appointment with academic advisor at both programs
              </li>
              <li className="flex items-start gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700">
                <span className="text-indigo-500">☐</span>
                Verify course transfer on Transfer Alberta
              </li>
            </ul>
          </div>

          <AlisPanel resources={switchOption.alisResources} />
        </>
      )}
    </div>
  );
}
