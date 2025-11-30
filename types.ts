
// Categories for the tasks
export enum TaskCategory {
  PREPARATION = '準備編',
  INPUT = '入力編',
  SUBMISSION = '提出編',
}

// Defines a single task (To-Do item)
export interface Task {
  id: string;
  title: string;
  category: TaskCategory;
  description?: string;
  referenceUrl?: string; // URL to official documentation
  referenceLabel?: string; // Label for the link (e.g. "国税庁：...")
}

// Defines an option for a question
export interface Option {
  id: string; // e.g., 'yes', 'no'
  label: string;
  nextQuestionId?: string | null; // null means end of wizard
  addTasks?: string[]; // IDs of tasks to add if this option is selected
}

// Defines a question in the wizard
export interface Question {
  id: string;
  text: string;
  options: Option[];
  guide?: string; // "How to check" guide text
  referenceUrl?: string; // URL for the question context (official source)
  referenceLabel?: string; // Label for the question reference
}

// User's answers
export type Answers = Record<string, string>; // questionId -> optionId
