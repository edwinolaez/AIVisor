"use client";

import { Onboarding } from "@/components/Onboarding";
import { Dashboard } from "@/components/Dashboard";
import { useProfile } from "@/context/ProfileContext";

export default function Home() {
  const { profile, loaded } = useProfile();

  if (!loaded) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-sm text-slate-400">Loading AIVisor…</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
        {profile ? <Dashboard /> : <Onboarding />}
      </div>
    </div>
  );
}
