// User type for authentication
// type User = {
//   name: string;
//   email: string;
//   image?: string;
//   accountId: string;
// };

enum Practice {
  meditation = "meditation",
  journaling = "journaling",
  negativeVisualization = "negative-visualization",
  virtueEthics = "virtue-ethics",
  dichotomyOfControl = "dichotomy-of-control",
  philosophicalReading = "philosophical-reading",
  contemplation = "contemplation",
  stoicPhysics = "stoic-physics",
  stoicLogic = "stoic-logic",
}

export type Mentor = Models.DocumentList<Models.Document> & {
  $id: string;
  name: string;
  practice: Practice;
  focus: string;
  duration: number;
  bookmarked: boolean;
  virtue?: "wisdom" | "courage" | "justice" | "temperance";
};

interface CreateMentor {
  name: string;
  practice: string;
  focus: string;
  voice: string;
  style: string; // "wise" | "conversational" | "socratic" | "formal"
  duration: number;
  philosopher?: string;
  virtue?: string;
}

interface GetAllMentors {
  limit?: number;
  page?: number;
  practice?: string | string[];
  focus?: string | string[];
  virtue?: string | string[];
  philosopher?: string;
}

interface BuildClient {
  key?: string;
  sessionToken?: string;
}

interface CreateUser {
  email: string;
  name: string;
  image?: string;
  accountId: string;
  philosopherTitle?: string; // e.g., "Novice Philosopher", "Practicing Stoic"
  preferredVirtue?: string;
}

interface SearchParams {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

interface Avatar {
  userName: string;
  width: number;
  height: number;
  className?: string;
  philosopherLevel?: "novice" | "practitioner" | "advanced" | "sage";
}

interface SavedMessage {
  role: "user" | "system" | "assistant";
  content: string;
  timestamp?: Date;
  practice?: Practice;
}

interface MentorComponentProps {
  mentorId: string;
  practice: string;
  focus: string;
  name: string;
  userName: string;
  userImage: string;
  voice: string;
  style: string;
  philosopher?: string;
  virtue?: string;
  sessionType?: "meditation" | "dialogue" | "exercise" | "reflection";
}

// Additional Stoic-specific types

interface StoicSession {
  id: string;
  userId: string;
  mentorId: string;
  practice: Practice;
  startTime: Date;
  endTime?: Date;
  reflections?: string;
  virtuesPracticed: string[];
  insightsGained?: string[];
}

interface DailyReflection {
  id: string;
  userId: string;
  date: Date;
  morningIntention?: string;
  eveningReview?: string;
  obstaclesEncountered?: string[];
  virtuesEmbodied?: string[];
  gratitude?: string[];
}

interface VirtueProgress {
  userId: string;
  virtue: "wisdom" | "courage" | "justice" | "temperance";
  currentLevel: number; // 0-100
  practiceCount: number;
  lastPracticed: Date;
  milestones: {
    date: Date;
    achievement: string;
  }[];
}

interface PhilosophicalJournal {
  id: string;
  userId: string;
  entries: {
    date: Date;
    prompt: string;
    response: string;
    mentorFeedback?: string;
    tags: string[];
  }[];
}

interface StoicExercise {
  id: string;
  name: string;
  description: string;
  practice: Practice;
  difficulty: "beginner" | "intermediate" | "advanced";
  duration: number;
  instructions: string[];
  targetVirtue?: string;
}

interface UserPhilosophyProfile {
  userId: string;
  favoritePhilosopher: string;
  personalPhilosophy: string;
  lifeGoals: string[];
  currentChallenges: string[];
  preferredPractices: Practice[];
  wisdomLevel: number; // Overall progress score
  totalPracticeMinutes: number;
  streakDays: number;
}