export interface InternshipLog {
  id: string;
  name: string;
  date: string;
  taskDescription: string;
  category: TaskCategory;
  hoursWorked: number;
  notes: string;
  weekNumber: number;
}

export type TaskCategory = 
  | "Research" 
  | "Design" 
  | "Communication" 
  | "Coding" 
  | "Testing" 
  | "Documentation";

export const TASK_CATEGORIES: TaskCategory[] = [
  "Research",
  "Design", 
  "Communication",
  "Coding",
  "Testing",
  "Documentation"
];

export interface WeeklySummary {
  week: number;
  intern: string;
  totalHours: number;
}

export interface CategorySummary {
  category: TaskCategory;
  totalHours: number;
  percentage: number;
}

export interface KPIData {
  totalHours: number;
  averageHoursPerDay: number;
  maxHoursInOneDay: number;
  totalDays: number;
}