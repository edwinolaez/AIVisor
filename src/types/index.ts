export type ProgramId = "business" | "computer-science" | "engineering";

export type Credential =
  | "diploma"
  | "ut-cert"
  | "bachelors"
  | "masters";

export type Goal =
  | "finish-current"
  | "ladder-degree"
  | "masters"
  | "phd"
  | "coop-job";

export interface StudentProfile {
  name: string;
  programId: ProgramId;
  credential: Credential;
  year: number;
  goal: Goal;
}

export interface AlisResource {
  title: string;
  url: string;
  description?: string;
}

export interface PathwayStep {
  phase: string;
  duration?: string;
  credential?: string;
  requirements?: string;
  milestones?: string[];
  alisResources?: AlisResource[];
}

export interface Pathway {
  id: string;
  label: string;
  description: string;
  steps: PathwayStep[];
}

export interface SoftSkillsYear {
  credential: Credential;
  year: number;
  label: string;
  roadmapFocus: string;
  focusSkills: string[];
  activities: string[];
  whyNow: string;
  comingUp?: string;
  alisResources: AlisResource[];
}

export interface RoadmapYear {
  credential: Credential;
  year: number;
  label: string;
  courses: string[];
  milestones: string[];
}

export interface CoopPhase {
  credential: Credential;
  year: number;
  label: string;
  checklist: string[];
  tips: string[];
  alisResources: AlisResource[];
}

export interface SwitchOption {
  targetProgramId: ProgramId;
  summary: string;
  comparisonPoints: string[];
  transferNotes: string[];
  newPathSummary: string;
  alisResources: AlisResource[];
}

export interface Program {
  id: ProgramId;
  name: string;
  tagline: string;
  pathways: Pathway[];
  roadmap: RoadmapYear[];
  softSkills: SoftSkillsYear[];
  coop: CoopPhase[];
  switchOptions: SwitchOption[];
}

export type TabId =
  | "pathway"
  | "soft-skills"
  | "switch"
  | "coop"
  | "chat";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}
