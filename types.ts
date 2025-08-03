export type Gender = 'male' | 'female' | 'other';

export enum Role {
  Student = 'student',
  Mentor = 'mentor',
  Admin = 'admin',
}

export interface StudentGamification {
  xp: number;
  level: number;
}

export interface User {
  id: string;
  firstName: string;
  lastName:string;
  phone: string;
  email?: string;
  password?: string; // Not stored in a real app, here for simulation
  role: Role;
  rememberMe: boolean;
  mentorId?: string; // For students
  assignedStudentIds?: string[]; // For mentors
}

export interface Student extends User {
  role: Role.Student;
  class: string;
  gender: Gender;
  notes?: string;
  mentorId: string;
  parentPhone?: string;
  parentEmail?: string;
  gamification: StudentGamification;
}

export interface VoiceNote {
  id: string;
  studentId: string;
  mentorId: string;
  date: string; // ISO string
  transcription: string;
}

export interface MoodRecord {
  id: string;
  studentId: string;
  date: string; // ISO string
  emotionalScore: number | null;
  socialScore: number | null;
  academicScore: number | null;
  personalScore: number | null;
  emotionalEvidence: string;
  socialEvidence: string;
  academicEvidence: string;
  personalEvidence: string;
  averageScore: number;
  sessionId?: string;
  isAcknowledged?: boolean;
}

export interface Session {
  id: string;
  title: string;
  studentId: string;
  mentorId: string;
  date: string; // ISO string
  time: string;
  place: string;
  status: 'completed' | 'scheduled' | 'cancelled';
  linkedMoodRecordId?: string;
  mentorImpression?: string;
  usedToolId?: string;
}

export type RecurringType = 'none' | 'daily' | 'weekly' | 'monthly';

export interface SessionData {
  studentId: string;
  mentorId: string;
  title: string;
  place: string;
  startDate: string; // ISO String
  time: string; // "HH:mm"
  recurring: RecurringType;
  endDate?: string; // ISO String
}

export type ToolType = 'במפגש' | 'משימה לתלמיד' | 'תהליך ארוך טווח';

export interface Tool {
  id: number;
  name: string;
  category: ToolType;
  disciplines: string[];
  fits_for: string[];
  how_to: {
    prep: string;
    steps: string[];
  };
  explanation: string;
  expected_outcome: string;
  do_nots: string[];
  success_signs: string[];
}

export type InterventionStatus = 'בתהליך' | 'הושלם' | 'ממתין לבדיקה';

export interface Intervention {
  id: string;
  studentId: string;
  mentorId: string;
  toolId: string;
  date: string; // ISO string
  notes: string;
  status: InterventionStatus;
}

export type AlertSeverity = 'דחוף' | 'חשוב' | 'מעקב';

export type AlertReason = 'low_score' | 'independent_report' | 'task_follow_up';

export type AlertSource = 
  { type: 'mood_record'; record: MoodRecord } | 
  { type: 'intervention'; intervention: Intervention & { toolName: string } };

export interface Alert {
  id: string; // Will be the ID of the source record/intervention
  student: Student;
  source: AlertSource;
  reason: AlertReason;
  severity: AlertSeverity;
  date: string; // ISO string of the source
}


// Toast Notification Types
export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
  id: number;
  type: ToastType;
  message: string;
}

// Feedback Types
export type FeedbackType = 'comment' | 'feature' | 'bug';
export type FeedbackStatus = 'new' | 'archived';

export interface Feedback {
  id: string;
  userId: string;
  userName: string;
  userRole: Role;
  type: FeedbackType;
  message: string;
  date: string; // ISO string
  status: FeedbackStatus;
}