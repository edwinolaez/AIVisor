"use client";

import { useState } from "react";
import type { Credential, Goal, ProgramId, StudentProfile } from "@/types";
import { credentialLabels, goalLabels, programList } from "@/data";
import { useProfile } from "@/context/ProfileContext";

export function Onboarding() {
  const { setProfile } = useProfile();
  const [name, setName] = useState("");
  const [programId, setProgramId] = useState<ProgramId>("business");
  const [credential, setCredential] = useState<Credential>("diploma");
  const [year, setYear] = useState(2);
  const [goal, setGoal] = useState<Goal>("ladder-degree");

  const maxYear =
    credential === "diploma" ? 2 : credential === "ut-cert" ? 1 : credential === "bachelors" ? 4 : 2;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const profile: StudentProfile = {
      name: name.trim() || "Student",
      programId,
      credential,
      year: Math.min(year, maxYear),
      goal,
    };
    setProfile(profile);
  }

  function loadDemo(persona: "alex" | "jordan" | "eng") {
    if (persona === "alex") {
      setName("Alex");
      setProgramId("business");
      setCredential("diploma");
      setYear(2);
      setGoal("ladder-degree");
    } else if (persona === "jordan") {
      setName("Jordan");
      setProgramId("computer-science");
      setCredential("bachelors");
      setYear(4);
      setGoal("masters");
    } else {
      setName("Sam");
      setProgramId("engineering");
      setCredential("ut-cert");
      setYear(1);
      setGoal("coop-job");
    }
  }

  return (
    <div className="mx-auto max-w-lg">
      <div className="mb-8 text-center">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-indigo-100 px-4 py-1 text-sm font-medium text-indigo-700">
          Alberta Post-Secondary · Powered by ALIS
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
          AI<span className="text-indigo-600">Visor</span>
        </h1>
        <p className="mt-2 text-slate-600">
          Your AI guide from diploma to doctorate — roadmaps, soft skills, program
          switching, and co-op prep.
        </p>
      </div>

      <div className="mb-6 flex flex-wrap justify-center gap-2">
        <button
          type="button"
          onClick={() => loadDemo("alex")}
          className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:border-indigo-300 hover:text-indigo-600"
        >
          Demo: Alex (Business Diploma Y2)
        </button>
        <button
          type="button"
          onClick={() => loadDemo("jordan")}
          className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:border-indigo-300 hover:text-indigo-600"
        >
          Demo: Jordan (CS BSc Y4)
        </button>
        <button
          type="button"
          onClick={() => loadDemo("eng")}
          className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:border-indigo-300 hover:text-indigo-600"
        >
          Demo: Sam (Engineering UT)
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Your name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Alex"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Program</label>
          <select
            value={programId}
            onChange={(e) => setProgramId(e.target.value as ProgramId)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
          >
            {programList.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Current credential
          </label>
          <select
            value={credential}
            onChange={(e) => {
              const c = e.target.value as Credential;
              setCredential(c);
              setYear(1);
            }}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
          >
            {Object.entries(credentialLabels).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Current year (Year {year} of {maxYear})
          </label>
          <input
            type="range"
            min={1}
            max={maxYear}
            value={Math.min(year, maxYear)}
            onChange={(e) => setYear(Number(e.target.value))}
            className="w-full accent-indigo-600"
          />
          <div className="flex justify-between text-xs text-slate-400">
            <span>Year 1</span>
            <span>Year {maxYear}</span>
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Your goal</label>
          <select
            value={goal}
            onChange={(e) => setGoal(e.target.value as Goal)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
          >
            {Object.entries(goalLabels).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          Build My Pathway →
        </button>
      </form>
    </div>
  );
}
