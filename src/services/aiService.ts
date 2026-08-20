import type {
  QuizResult,
  StudyPlan,
  CodeReview,
  Resource,
  ChatMessage,
} from '@/types';
import { quizQuestions, initialStudyPlan, adaptedStudyPlan } from '@/data/mockData';

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const tutorResponses: Record<string, string> = {
  'dynamic programming': `**Dynamic Programming** is a technique for solving problems by breaking them into smaller overlapping subproblems and storing results so you don't recompute them.

**Real-world analogy:** Imagine climbing stairs. To reach step 10, you must come from step 9 or step 8. The number of ways to reach step 10 = ways to reach step 9 + ways to reach step 8. You store each step's answer so you never recompute.

**Example — Fibonacci:**
\`\`\`python
def fib(n, memo={}):
    if n <= 1:
        return n
    if n not in memo:
        memo[n] = fib(n-1, memo) + fib(n-2, memo)
    return memo[n]
\`\`\`

**Quick check:** What is the time complexity of memoized Fibonacci?
- A) O(2^n)
- B) O(n) ✓
- C) O(n²)

Answer: **O(n)** — each subproblem is solved exactly once and cached.`,
  backpropagation: `**Backpropagation** is how neural networks learn. It calculates the gradient of the loss with respect to each weight by working backwards from the output layer to the input.

**Real-world analogy:** Think of a team building a product. If the final product fails quality checks, the manager traces back which team (layer) caused the error and tells them how much to adjust. Each team then nudges its output slightly.

**How it works:**
1. **Forward pass:** Input flows through the network producing a prediction.
2. **Loss:** Compare prediction to the true label.
3. **Backward pass:** Compute gradients using the chain rule, layer by layer.
4. **Update:** Adjust weights using gradient descent.

**Example:**
\`\`\`python
# Pseudocode
loss = criterion(output, target)
loss.backward()      # backpropagation
optimizer.step()     # update weights
\`\`\`

**Quick check:** What does backpropagation compute?
- A) The input data
- B) Gradients of the loss w.r.t. weights ✓
- C) The learning rate

Answer: **Gradients of the loss with respect to each weight.**`,
  normalization: `**Database Normalization** is the process of organizing tables and columns to minimize data redundancy and improve data integrity.

**Real-world analogy:** Instead of writing your full address on every package you send, you keep one address card and reference it. Normalization does the same — store data once, reference it everywhere.

**Normal Forms:**
- **1NF:** Each cell has a single value (atomic).
- **2NF:** No partial dependency on a composite key.
- **3NF:** No transitive dependency (non-key attributes don't depend on other non-key attributes).
- **BCNF:** A stricter version of 3NF.

**Example:**
\`\`\`sql
-- Before (violates 3NF):
Orders(order_id, customer_id, customer_name, customer_city)

-- After normalization:
Orders(order_id, customer_id)
Customers(customer_id, customer_name, customer_city)
\`\`\`

**Quick check:** Which normal form removes transitive dependencies?
- A) 1NF
- B) 2NF
- C) 3NF ✓

Answer: **3NF** removes transitive dependencies.`,
  'two sum': `**Two Sum** is a classic array problem. Given an array and a target, find two indices whose values sum to the target.

**Approach:** Use a hash map to store seen values. For each number, check if its complement (target - num) exists in the map.

**Example:**
\`\`\`python
def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        diff = target - num
        if diff in seen:
            return [seen[diff], i]
        seen[num] = i
    return []
\`\`\`

**Time:** O(n) | **Space:** O(n)

**Quick check:** Why is the hash map approach O(n)?
- A) Because we sort the array
- B) Because we visit each element once ✓
- C) Because we use recursion

Answer: **Each element is visited once** and hash map lookups are O(1).`,
};

const defaultResponse = `Great question! Let me break this down for you.

**Simple explanation:** This concept builds on fundamental principles. The key idea is to understand the core mechanism and then apply it step by step.

**Real-world analogy:** Think of it like assembling furniture — you follow instructions in order, and each piece connects to the previous one. Skipping a step leads to confusion.

**Example:**
\`\`\`python
# Example implementation
def solve(data):
    result = []
    for item in data:
        if condition(item):
            result.append(transform(item))
    return result
\`\`\`

**Quick check:** What is the main advantage of this approach?
- A) It's always the fastest
- B) It's clear and maintainable ✓
- C) It uses no memory

Answer: **Clarity and maintainability** — a well-structured solution is easier to debug and extend.`;

export async function askTutor(
  question: string,
  _mode: string = 'Intermediate',
  _language: string = 'English'
): Promise<string> {
  await delay(1200);
  const lower = question.toLowerCase();
  for (const key of Object.keys(tutorResponses)) {
    if (lower.includes(key)) {
      return tutorResponses[key];
    }
  }
  return defaultResponse;
}

export async function analyzeDocument(fileName: string): Promise<{
  summary: string;
  concepts: string[];
  examQuestions: string[];
  weakAreas: string[];
}> {
  await delay(1500);
  const lower = fileName.toLowerCase();
  if (lower.includes('machine learning') || lower.includes('ml')) {
    return {
      summary:
        'This document covers supervised and unsupervised learning, linear regression, logistic regression, decision trees, neural networks, and backpropagation. It includes mathematical derivations and practical examples.',
      concepts: [
        'Supervised vs Unsupervised Learning',
        'Linear Regression & Gradient Descent',
        'Logistic Regression & Classification',
        'Neural Networks Architecture',
        'Backpropagation Algorithm',
        'Overfitting & Regularization',
      ],
      examQuestions: [
        'Explain the difference between supervised and unsupervised learning with examples.',
        'Derive the gradient descent update rule for linear regression.',
        'What is the vanishing gradient problem and how does it affect deep networks?',
        'Compare L1 and L2 regularization. When would you use each?',
        'Explain backpropagation with a real-world analogy.',
      ],
      weakAreas: ['Backpropagation', 'Regularization techniques', 'Gradient descent math'],
    };
  }
  if (lower.includes('dbms')) {
    return {
      summary:
        'This document covers database fundamentals, ER modeling, normalization (1NF-BCNF), SQL queries, joins, transactions, and ACID properties.',
      concepts: [
        'ER Model & Mapping',
        'Normalization (1NF, 2NF, 3NF, BCNF)',
        'SQL Joins (INNER, LEFT, RIGHT, FULL)',
        'ACID Properties',
        'Concurrency Control',
        'Indexing & Query Optimization',
      ],
      examQuestions: [
        'Explain 3NF and BCNF with examples.',
        'What are the ACID properties? Give an example of each.',
        'Compare INNER JOIN and LEFT JOIN with examples.',
        'What is a transaction? Explain commit and rollback.',
        'How does normalization reduce data redundancy?',
      ],
      weakAreas: ['Normalization (BCNF)', 'Concurrency control', 'Transaction isolation levels'],
    };
  }
  return {
    summary:
      'This document covers fundamental data structures and algorithms including arrays, linked lists, stacks, queues, trees, graphs, sorting, and searching algorithms.',
    concepts: [
      'Arrays & Linked Lists',
      'Stacks & Queues',
      'Binary Trees & BST',
      'Graph Algorithms (BFS, DFS)',
      'Sorting Algorithms',
      'Dynamic Programming',
    ],
    examQuestions: [
      'Explain the difference between BFS and DFS. When would you use each?',
      'Implement a binary search tree insert and search operation.',
      'What is the time complexity of quicksort in best and worst case?',
      'Explain dynamic programming with the Fibonacci example.',
      'How does a hash table work? Explain collision handling.',
    ],
    weakAreas: ['Graph algorithms', 'Dynamic programming', 'Time complexity analysis'],
  };
}

export async function generateQuiz(topic: string): Promise<typeof quizQuestions> {
  await delay(1000);
  return quizQuestions;
}

export async function analyzeQuizResult(
  answers: number[],
  questions: typeof quizQuestions
): Promise<QuizResult> {
  await delay(800);
  let correct = 0;
  for (let i = 0; i < questions.length; i++) {
    if (answers[i] === questions[i].correctIndex) correct++;
  }
  const understanding = Math.round((correct / questions.length) * 100);
  const weakArea = correct < questions.length ? 'LEFT JOIN and NULL handling' : 'None — excellent work!';
  const feedback =
    correct >= 4
      ? `You understand INNER JOIN well. Review LEFT JOIN and NULL handling for full mastery.`
      : `Focus on reviewing JOIN types and NULL handling. You're making progress — keep practicing!`;
  return {
    score: correct,
    total: questions.length,
    understanding,
    feedback,
    weakArea,
  };
}

export async function generateStudyPlan(exam: string, days: number, target: number): Promise<StudyPlan> {
  await delay(1500);
  const topics = ['Neural Networks', 'Backpropagation', 'CNN', 'RNN', 'Revision', 'Mock Test'];
  const timeline = topics.slice(0, Math.min(days, 6)).map((title, idx) => ({
    day: idx + 1,
    title,
    topic: 'Machine Learning' as const,
    duration: '45 min',
  }));
  return {
    exam,
    daysRemaining: days,
    target,
    readiness: 68,
    timeline,
  };
}

export async function detectKnowledgeGap(): Promise<{
  gap: string;
  newReadiness: number;
  adaptedPlan: StudyPlan;
}> {
  await delay(2000);
  return {
    gap: 'Backpropagation',
    newReadiness: 72,
    adaptedPlan: adaptedStudyPlan,
  };
}

export async function generateCareerRoadmap(goal: string): Promise<
  { stage: string; topic: string; description: string; completed: boolean }[]
> {
  await delay(1500);
  return [
    { stage: 'Python', topic: 'Python', description: 'Master the fundamentals of Python programming', completed: true },
    { stage: 'Machine Learning', topic: 'Machine Learning', description: 'Learn supervised and unsupervised ML algorithms', completed: true },
    { stage: 'Deep Learning', topic: 'Deep Learning', description: 'Understand neural networks, CNNs, and RNNs', completed: false },
    { stage: 'PyTorch', topic: 'Deep Learning', description: 'Build and train models with PyTorch', completed: false },
    { stage: 'Projects', topic: 'Machine Learning', description: 'Build real-world ML projects for your portfolio', completed: false },
    { stage: 'MLOps', topic: 'Machine Learning', description: 'Deploy and manage ML models in production', completed: false },
    { stage: 'Internships', topic: 'Interview Preparation', description: 'Apply for ML internships and crack interviews', completed: false },
    { stage: 'AI/ML Engineer', topic: 'Interview Preparation', description: 'Land your dream AI/ML Engineer role', completed: false },
  ];
}

export async function analyzeCode(code: string, language: string): Promise<CodeReview> {
  await delay(1500);
  const hasHashMap =
    code.includes('seen') || code.includes('map') || code.includes('Map') || code.includes('hash');
  const correctness = hasHashMap ? 92 : 65;
  return {
    correctness,
    timeComplexity: hasHashMap ? 'O(n)' : 'O(n²)',
    spaceComplexity: hasHashMap ? 'O(n)' : 'O(1)',
    feedback: hasHashMap
      ? 'Your solution uses a hash map for O(n) time complexity. Good use of the complement lookup pattern. Consider adding input validation for edge cases like empty arrays.'
      : 'Your solution appears to use a brute-force approach. Consider using a hash map to reduce time complexity from O(n²) to O(n).',
  };
}

export async function generateWeeklyReport(): Promise<string[]> {
  await delay(1200);
  return [
    'You studied 8.4 hours this week.',
    'DBMS performance improved by 14%.',
    'You completed 83% of planned sessions.',
    'Recommended focus: Graph Algorithms + Probability.',
    'Your Python proficiency remains strong at 82%.',
    'Knowledge coverage grew from 68% to 71%.',
  ];
}

export function getRecommendedResources(weakSubject: string, allResources: Resource[]): Resource[] {
  const topicMap: Record<string, string> = {
    DBMS: 'DBMS',
    'Graph Algorithms': 'DSA',
    Probability: 'Aptitude',
    Backpropagation: 'Machine Learning',
  };
  const topic = topicMap[weakSubject] || weakSubject;
  return allResources.filter((r) => r.topic === topic).slice(0, 3);
}
