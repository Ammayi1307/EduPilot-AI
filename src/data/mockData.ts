import type { StudentProfile, Resource, QuizQuestion, StudyPlan, SkillScore } from '@/types';

export const demoStudent: StudentProfile = {
  name: 'Alex Johnson',
  college: 'National Institute of Technology',
  degree: 'B.Tech',
  branch: 'Computer Science',
  year: '3rd Year',
  goal: 'AI/ML Engineer',
  studyTime: '2 hours',
  confidence: {
    Python: 82,
    DSA: 67,
    DBMS: 54,
    'Machine Learning': 61,
    Mathematics: 58,
    Communication: 73,
  },
  academicReadiness: 78,
  careerReadiness: 64,
  studyStreak: 7,
  knowledgeCoverage: 71,
  skills: [
    { subject: 'Python', score: 82 },
    { subject: 'SQL', score: 79 },
    { subject: 'DSA', score: 67 },
    { subject: 'Machine Learning', score: 61 },
    { subject: 'DBMS', score: 54 },
    { subject: 'Communication', score: 73 },
  ],
  weakAreas: ['DBMS Normalization', 'Graph Algorithms', 'Probability'],
  strongAreas: ['Python', 'SQL', 'Web Development'],
};

export const radarSkills: SkillScore[] = [
  { subject: 'Python', score: 82 },
  { subject: 'SQL', score: 79 },
  { subject: 'DSA', score: 67 },
  { subject: 'Machine Learning', score: 61 },
  { subject: 'DBMS', score: 54 },
  { subject: 'Communication', score: 73 },
];

export const weeklyStudyData = [
  { day: 'Mon', hours: 1.5 },
  { day: 'Tue', hours: 2.0 },
  { day: 'Wed', hours: 1.0 },
  { day: 'Thu', hours: 2.5 },
  { day: 'Fri', hours: 1.2 },
  { day: 'Sat', hours: 0.8 },
  { day: 'Sun', hours: 1.4 },
];

export const knowledgeGrowthData = [
  { week: 'W1', coverage: 45 },
  { week: 'W2', coverage: 52 },
  { week: 'W3', coverage: 58 },
  { week: 'W4', coverage: 63 },
  { week: 'W5', coverage: 68 },
  { week: 'W6', coverage: 71 },
];

export const subjectPerformanceData = [
  { subject: 'Python', score: 82 },
  { subject: 'SQL', score: 79 },
  { subject: 'DSA', score: 67 },
  { subject: 'ML', score: 61 },
  { subject: 'DBMS', score: 54 },
  { subject: 'Comm', score: 73 },
];

export const weakTopicTrendData = [
  { week: 'W1', DBMS: 32, Graphs: 28, Probability: 25 },
  { week: 'W2', DBMS: 38, Graphs: 35, Probability: 30 },
  { week: 'W3', DBMS: 45, Graphs: 40, Probability: 35 },
  { week: 'W4', DBMS: 54, Graphs: 48, Probability: 42 },
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'Which SQL JOIN returns all rows from the left table and matched rows from the right table?',
    options: ['INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'FULL OUTER JOIN'],
    correctIndex: 1,
    explanation: 'LEFT JOIN returns all rows from the left table and the matched rows from the right table. Unmatched rows from the right side contain NULLs.',
  },
  {
    id: 'q2',
    question: 'What does NULL represent in a SQL JOIN result?',
    options: ['A zero value', 'An empty string', 'Missing or unknown data', 'A primary key'],
    correctIndex: 2,
    explanation: 'NULL in SQL represents missing or unknown data — not zero or an empty string. It requires special handling with IS NULL.',
  },
  {
    id: 'q3',
    question: 'Which JOIN returns only rows that have matches in both tables?',
    options: ['INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'CROSS JOIN'],
    correctIndex: 0,
    explanation: 'INNER JOIN returns only the rows where there is a match in both tables based on the join condition.',
  },
  {
    id: 'q4',
    question: 'What is the result of a CROSS JOIN between tables A (3 rows) and B (4 rows)?',
    options: ['7 rows', '12 rows', '4 rows', '3 rows'],
    correctIndex: 1,
    explanation: 'A CROSS JOIN produces a Cartesian product — 3 × 4 = 12 rows, combining every row of A with every row of B.',
  },
  {
    id: 'q5',
    question: 'Which clause filters rows AFTER a GROUP BY aggregation?',
    options: ['WHERE', 'HAVING', 'ORDER BY', 'DISTINCT'],
    correctIndex: 1,
    explanation: 'HAVING filters groups after aggregation, while WHERE filters individual rows before grouping occurs.',
  },
];

export const initialStudyPlan: StudyPlan = {
  exam: 'Machine Learning',
  daysRemaining: 14,
  target: 85,
  readiness: 68,
  timeline: [
    { day: 1, title: 'Neural Networks', topic: 'Machine Learning', duration: '45 min' },
    { day: 2, title: 'Backpropagation', topic: 'Machine Learning', duration: '50 min' },
    { day: 3, title: 'CNN', topic: 'Deep Learning', duration: '45 min' },
    { day: 4, title: 'RNN', topic: 'Deep Learning', duration: '45 min' },
    { day: 5, title: 'Revision', topic: 'Machine Learning', duration: '30 min' },
    { day: 6, title: 'Mock Test', topic: 'Machine Learning', duration: '60 min' },
  ],
};

export const adaptedStudyPlan: StudyPlan = {
  exam: 'Machine Learning',
  daysRemaining: 14,
  target: 85,
  readiness: 72,
  timeline: [
    { day: 1, title: 'Neural Networks', topic: 'Machine Learning', duration: '45 min', completed: true },
    { day: 2, title: 'Backpropagation', topic: 'Machine Learning', duration: '50 min', completed: true },
    { day: 3, title: 'Backpropagation Review', topic: 'Machine Learning', duration: '40 min', aiRecommended: true },
    { day: 4, title: 'Backpropagation Challenge', topic: 'Machine Learning', duration: '35 min', aiRecommended: true },
    { day: 5, title: 'CNN', topic: 'Deep Learning', duration: '45 min' },
    { day: 6, title: 'Revision', topic: 'Machine Learning', duration: '30 min' },
  ],
};

export const demoNotes = [
  { id: 'n1', name: 'Machine Learning Unit 3.pdf', type: 'PDF', size: '2.4 MB' },
  { id: 'n2', name: 'DBMS Notes.pdf', type: 'PDF', size: '1.8 MB' },
  { id: 'n3', name: 'Data Structures.pdf', type: 'PDF', size: '3.1 MB' },
];

export const careerRoadmapStages = [
  { stage: 'Python', topic: 'Python' as const, description: 'Master the fundamentals of Python programming', completed: true },
  { stage: 'Machine Learning', topic: 'Machine Learning' as const, description: 'Learn supervised and unsupervised ML algorithms', completed: true },
  { stage: 'Deep Learning', topic: 'Deep Learning' as const, description: 'Understand neural networks, CNNs, and RNNs', completed: false },
  { stage: 'PyTorch', topic: 'Deep Learning' as const, description: 'Build and train models with PyTorch', completed: false },
  { stage: 'Projects', topic: 'Machine Learning' as const, description: 'Build real-world ML projects for your portfolio', completed: false },
  { stage: 'MLOps', topic: 'Machine Learning' as const, description: 'Deploy and manage ML models in production', completed: false },
  { stage: 'Internships', topic: 'Interview Preparation' as const, description: 'Apply for ML internships and crack interviews', completed: false },
  { stage: 'AI/ML Engineer', topic: 'Interview Preparation' as const, description: 'Land your dream AI/ML Engineer role', completed: false },
];

export const careerSkills = [
  { subject: 'Python', score: 82 },
  { subject: 'SQL', score: 79 },
  { subject: 'Machine Learning', score: 61 },
  { subject: 'Deep Learning', score: 42 },
  { subject: 'PyTorch', score: 31 },
  { subject: 'MLOps', score: 18 },
];

export const careerSkillGaps = ['PyTorch', 'MLOps', 'System Design'];

export const codingProblem = {
  title: 'Two Sum',
  description:
    'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.',
  example: 'Input: nums = [2, 7, 11, 15], target = 9\nOutput: [0, 1]\nExplanation: nums[0] + nums[1] == 9, return [0, 1].',
};

export const codeTemplates: Record<string, string> = {
  Python: `def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        diff = target - num
        if diff in seen:
            return [seen[diff], i]
        seen[num] = i
    return []`,
  Java: `public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> seen = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        int diff = target - nums[i];
        if (seen.containsKey(diff)) {
            return new int[]{seen.get(diff), i};
        }
        seen.put(nums[i], i);
    }
    return new int[]{};
}`,
  JavaScript: `function twoSum(nums, target) {
    const seen = new Map();
    for (let i = 0; i < nums.length; i++) {
        const diff = target - nums[i];
        if (seen.has(diff)) {
            return [seen.get(diff), i];
        }
        seen.set(nums[i], i);
    }
    return [];
}`,
  'C++': `vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> seen;
    for (int i = 0; i < nums.size(); i++) {
        int diff = target - nums[i];
        if (seen.count(diff)) {
            return {seen[diff], i};
        }
        seen[nums[i]] = i;
    }
    return {};
}`,
};
