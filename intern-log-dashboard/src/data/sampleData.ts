import { InternshipLog, TaskCategory } from "@/types/internship";
import { getWeekNumber } from "@/utils/dateUtils";

export const sampleLogs: InternshipLog[] = [
  {
    id: "1",
    name: "Alex Chen",
    date: "2024-01-15",
    taskDescription: "Market research for new product features",
    category: "Research" as TaskCategory,
    hoursWorked: 4.5,
    notes: "Analyzed competitor features and user reviews",
    weekNumber: getWeekNumber("2024-01-15")
  },
  {
    id: "2", 
    name: "Sarah Johnson",
    date: "2024-01-15",
    taskDescription: "UI mockups for dashboard redesign",
    category: "Design" as TaskCategory,
    hoursWorked: 6,
    notes: "Created wireframes in Figma",
    weekNumber: getWeekNumber("2024-01-15")
  },
  {
    id: "3",
    name: "Mike Rodriguez",
    date: "2024-01-15", 
    taskDescription: "Bug fixes in authentication module",
    category: "Coding" as TaskCategory,
    hoursWorked: 3.5,
    notes: "Fixed OAuth login issues",
    weekNumber: getWeekNumber("2024-01-15")
  },
  {
    id: "4",
    name: "Alex Chen",
    date: "2024-01-16",
    taskDescription: "Team standup and progress review",
    category: "Communication" as TaskCategory,
    hoursWorked: 1.5,
    notes: "Discussed research findings with team",
    weekNumber: getWeekNumber("2024-01-16")
  },
  {
    id: "5",
    name: "Sarah Johnson", 
    date: "2024-01-16",
    taskDescription: "API documentation updates",
    category: "Documentation" as TaskCategory,
    hoursWorked: 2.5,
    notes: "Updated endpoint specifications",
    weekNumber: getWeekNumber("2024-01-16")
  },
  {
    id: "6",
    name: "Mike Rodriguez",
    date: "2024-01-16",
    taskDescription: "Unit testing for new features",
    category: "Testing" as TaskCategory,
    hoursWorked: 4,
    notes: "Added test coverage for user management",
    weekNumber: getWeekNumber("2024-01-16")
  },
  {
    id: "7",
    name: "Alex Chen",
    date: "2024-01-17",
    taskDescription: "User interview analysis",
    category: "Research" as TaskCategory,
    hoursWorked: 5,
    notes: "Synthesized feedback from 10 user interviews",
    weekNumber: getWeekNumber("2024-01-17")
  },
  {
    id: "8",
    name: "Sarah Johnson",
    date: "2024-01-17", 
    taskDescription: "Frontend component development",
    category: "Coding" as TaskCategory,
    hoursWorked: 7,
    notes: "Built reusable React components",
    weekNumber: getWeekNumber("2024-01-17")
  },
  {
    id: "9",
    name: "Mike Rodriguez",
    date: "2024-01-18",
    taskDescription: "Client meeting preparation",
    category: "Communication" as TaskCategory,
    hoursWorked: 2,
    notes: "Prepared demo and presentation slides",
    weekNumber: getWeekNumber("2024-01-18")
  },
  {
    id: "10",
    name: "Alex Chen",
    date: "2024-01-18",
    taskDescription: "Design system documentation",
    category: "Documentation" as TaskCategory,
    hoursWorked: 3,
    notes: "Documented component library guidelines",
    weekNumber: getWeekNumber("2024-01-18")
  },
  {
    id: "11",
    name: "Sarah Johnson",
    date: "2024-01-19",
    taskDescription: "Performance optimization testing",
    category: "Testing" as TaskCategory,
    hoursWorked: 4.5,
    notes: "Load testing and optimization",
    weekNumber: getWeekNumber("2024-01-19")
  },
  {
    id: "12",
    name: "Mike Rodriguez",
    date: "2024-01-19",
    taskDescription: "Database schema design",
    category: "Design" as TaskCategory,
    hoursWorked: 5.5,
    notes: "Designed tables for new features",
    weekNumber: getWeekNumber("2024-01-19")
  }
];