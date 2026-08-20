export type Subject =
  | 'Python'
  | 'Java'
  | 'JavaScript'
  | 'DSA'
  | 'SQL'
  | 'DBMS'
  | 'Operating Systems'
  | 'Computer Networks'
  | 'Machine Learning'
  | 'Deep Learning'
  | 'Generative AI'
  | 'Web Development'
  | 'Interview Preparation'
  | 'Aptitude'
  | 'Communication';

export type ResourceType = 'Video' | 'Course' | 'Tutorial' | 'Documentation' | 'Practice' | 'Article';
export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface Resource {
  id: string;
  title: string;
  topic: Subject;
  description: string;
  difficulty: Difficulty;
  duration: string;
  type: ResourceType;
  provider: string;
  url: string;
  thumbnail: string;
}

export interface SkillScore {
  subject: string;
  score: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface QuizResult {
  score: number;
  total: number;
  understanding: number;
  feedback: string;
  weakArea: string;
}

export interface StudyPlanDay {
  day: number;
  title: string;
  topic: Subject;
  duration: string;
  aiRecommended?: boolean;
  completed?: boolean;
}

export interface StudyPlan {
  exam: string;
  daysRemaining: number;
  target: number;
  readiness: number;
  timeline: StudyPlanDay[];
}

export interface CareerStage {
  stage: string;
  topic: Subject;
  description: string;
  completed: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: number;
}

export interface StudentProfile {
  name: string;
  college: string;
  degree: string;
  branch: string;
  year: string;
  goal: string;
  studyTime: string;
  confidence: Record<string, number>;
  academicReadiness: number;
  careerReadiness: number;
  studyStreak: number;
  knowledgeCoverage: number;
  skills: SkillScore[];
  weakAreas: string[];
  strongAreas: string[];
}

export interface CodeReview {
  correctness: number;
  timeComplexity: string;
  spaceComplexity: string;
  feedback: string;
}

export interface SavedResource {
  resourceId: string;
  savedAt: number;
}

export interface CompletedResource {
  resourceId: string;
  completedAt: number;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}
