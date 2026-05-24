import type { StudentProfile } from "@/types";
import { getProgram, getSoftSkillsForProfile, getRoadmapForProfile, getPathwayForGoal } from "@/data";

export function buildStudentContext(profile: StudentProfile): string {
  const program = getProgram(profile.programId);
  const roadmap = getRoadmapForProfile(program, profile.credential, profile.year);
  const softSkills = getSoftSkillsForProfile(program, profile.credential, profile.year);
  const pathway = getPathwayForGoal(program, profile.goal, profile.credential);

  return `
Student Profile:
- Name: ${profile.name}
- Program: ${program.name}
- Credential: ${profile.credential}
- Year: ${profile.year}
- Goal: ${profile.goal}

Current Roadmap (${roadmap.label}):
- Courses: ${roadmap.courses.join(", ")}
- Milestones: ${roadmap.milestones.join(", ")}

Current Soft Skills Focus:
- Skills: ${softSkills.focusSkills.join(", ")}
- Why now: ${softSkills.whyNow}

Active Pathway: ${pathway.label}
Pathway steps: ${pathway.steps.map((s) => s.phase).join(" → ")}

Always reference ALIS (alis.alberta.ca) and Transfer Alberta (transferalberta.alberta.ca) when suggesting official resources.
AIVisor complements academic advisors — never tell students to skip speaking with their institution.
`.trim();
}

export function getFallbackResponse(profile: StudentProfile, message: string): string {
  const program = getProgram(profile.programId);
  const softSkills = getSoftSkillsForProfile(program, profile.credential, profile.year);
  const lower = message.toLowerCase();

  if (lower.includes("soft skill") || lower.includes("skill")) {
    return `For ${program.name} ${softSkills.label}, focus on: ${softSkills.focusSkills.join(", ")}.\n\nRecommended activities:\n${softSkills.activities.map((a) => `• ${a}`).join("\n")}\n\n${softSkills.whyNow}\n\nExplore CAREERinsite on ALIS: https://alis.alberta.ca/careerinsite/`;
  }

  if (lower.includes("co-op") || lower.includes("coop") || lower.includes("intern")) {
    return `Great question about co-op/internships! For your stage (${profile.credential}, Year ${profile.year}), check the Co-op & Career tab for a tailored checklist.\n\nAlso use ALIS Look for Work: https://alis.alberta.ca/look-for-work/ and OCCinfo job postings: https://alis.alberta.ca/occinfo/`;
  }

  if (lower.includes("switch") || lower.includes("transfer") || lower.includes("change program")) {
    return `Program switching requires careful planning. Use the Switch Program tab to compare options, and always verify credits on Transfer Alberta: https://transferalberta.alberta.ca/\n\nBook a meeting with your academic advisor before making changes.`;
  }

  if (lower.includes("master") || lower.includes("phd") || lower.includes("graduate") || lower.includes("grad school")) {
    return `Graduate school planning depends on your grades, research experience, and career goals. Review ALIS Plan for Graduate School: https://alis.alberta.ca/explore-education-and-training/plan-for-graduate-school/\n\nAsk yourself: Is grad school right for you? ALIS has a guide for that too.`;
  }

  if (lower.includes("roadmap") || lower.includes("path") || lower.includes("course")) {
    const roadmap = getRoadmapForProfile(program, profile.credential, profile.year);
    return `Your current roadmap (${roadmap.label}):\n\nCourses: ${roadmap.courses.join(", ")}\n\nMilestones: ${roadmap.milestones.map((m) => `• ${m}`).join("\n")}\n\nSee the My Pathway tab for your full education journey including diploma→degree and grad school options.`;
  }

  return `Hi ${profile.name}! I'm AIVisor, your Alberta post-secondary guide for ${program.name}.\n\nI can help with:\n• Your program roadmap and pathway (diploma → degree → grad school)\n• Year ${profile.year} soft skills development\n• Switching programs (with Transfer Alberta resources)\n• Co-op and internship prep\n\nWhat would you like to explore? You can also browse the tabs above for detailed guidance linked to ALIS resources.`;
}
