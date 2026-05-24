import type { Program, ProgramId } from "@/types";
import { businessProgram } from "./programs/business";
import { computerScienceProgram } from "./programs/computer-science";
import { engineeringProgram } from "./programs/engineering";

export const programs: Record<ProgramId, Program> = {
  business: businessProgram,
  "computer-science": computerScienceProgram,
  engineering: engineeringProgram,
};

export const programList = Object.values(programs);

export function getProgram(id: ProgramId): Program {
  return programs[id];
}

export const credentialLabels: Record<string, string> = {
  diploma: "Diploma",
  "ut-cert": "University Transfer Certificate",
  bachelors: "Bachelor's Degree",
  masters: "Master's Degree",
};

export const goalLabels: Record<string, string> = {
  "finish-current": "Finish current program",
  "ladder-degree": "Ladder to a degree",
  masters: "Pursue a Master's",
  phd: "Pursue a PhD",
  "coop-job": "Land a co-op or job",
};

export function getPathwayForGoal(
  program: Program,
  goal: string,
  credential: string
): (typeof program.pathways)[0] {
  if (goal === "phd" || goal === "masters") {
    return (
      program.pathways.find((p) => p.id.includes("msc") || p.id.includes("meng") || p.id.includes("mba")) ??
      program.pathways[program.pathways.length - 1]
    );
  }
  if (goal === "ladder-degree" || credential === "diploma" || credential === "ut-cert") {
    return program.pathways[0];
  }
  if (goal === "coop-job") {
    return program.pathways[0];
  }
  return program.pathways[0];
}

export function getRoadmapForProfile(
  program: Program,
  credential: string,
  year: number
) {
  return (
    program.roadmap.find((r) => r.credential === credential && r.year === year) ??
    program.roadmap.find((r) => r.credential === credential) ??
    program.roadmap[0]
  );
}

export function getSoftSkillsForProfile(
  program: Program,
  credential: string,
  year: number
) {
  return (
    program.softSkills.find((s) => s.credential === credential && s.year === year) ??
    program.softSkills.find((s) => s.credential === credential) ??
    program.softSkills[0]
  );
}

export function getCoopForProfile(
  program: Program,
  credential: string,
  year: number
) {
  return (
    program.coop.find((c) => c.credential === credential && c.year === year) ??
    program.coop.find((c) => c.credential === credential) ??
    program.coop[0]
  );
}
