export type UserRole = 'officer' | 'admin' | 'personnel';

export type RiskLevel = 'Low' | 'Moderate' | 'Elevated' | 'Critical';

export type TrendDirection = 'Increasing' | 'Stable' | 'Decreasing';

export interface ContributingFactor {
  id: string;
  name: string;
  percentage: number;
  category: 'duty' | 'wellness' | 'deployment' | 'leave';
  detail: string;
  sourceType: 'Authorized Organizational' | 'Voluntary Wellness';
}

export interface PredictivePoint {
  day: string;
  date: string;
  actualRisk?: number;
  projectedRisk?: number;
  uncertaintyLow?: number;
  uncertaintyHigh?: number;
  isProjected: boolean;
  notes?: string;
}

export interface Recommendation {
  id: string;
  personnelId: string;
  title: string;
  priority: 'High' | 'Medium' | 'Low';
  reason: string;
  suggestedAction: string;
  responsibleRole: string;
  status: 'Pending' | 'Accepted' | 'Modified' | 'Rejected' | 'Completed';
  officerNotes?: string;
  scheduledDate?: string;
  modifiedAction?: string;
  updatedAt?: string;
}

export interface Personnel {
  id: string;
  codeName: string;
  name: string; // Fictional display
  unit: string;
  role: string;
  rank: string;
  location: string;
  yearsOfService: number;
  consentVerified: boolean;
  currentRisk: RiskLevel;
  riskScore: number; // 0 - 100
  previousRisk: RiskLevel;
  previousScore: number;
  trend: TrendDirection;
  trend7d: number; // percentage change
  trend30d: number;
  modelConfidence: number; // e.g. 86%
  lastAssessment: string;
  dutyHoursPerWeek: number;
  consecutiveDeploymentDays: number;
  leaveDaysDeferred: number;
  workloadIndex: number; // 1-100
  sleepAvgHours: number;
  sleepQualityRating: number; // 1-5
  moodRating: number; // 1-5
  stressRating: number; // 1-5
  contributingFactors: ContributingFactor[];
  recommendations: Recommendation[];
  outcomeStatus?: 'Pending Review' | 'Intervention Active' | 'Follow-up Scheduled' | 'Outcome Measured: Improvement Observed';
  baselineRiskScore?: number;
  postInterventionScore?: number;
}

export interface AlertItem {
  id: string;
  personnelId: string;
  unit: string;
  title: string;
  category: 'Elevated Risk Indicator' | 'Rapid Change' | 'Workload Concern' | 'Missed Wellness Check-In' | 'Follow-up Due';
  severity: 'high' | 'medium' | 'low';
  timestamp: string;
  reason: string;
  recommendedNextStep: string;
  dismissed: boolean;
  reviewed: boolean;
}

export interface AuditEntry {
  id: string;
  timestamp: string;
  user: string;
  role: string;
  action: string;
  resource: string;
  details: string;
  ipAddress?: string;
}

export interface WellnessSubmission {
  timestamp: string;
  personnelId: string;
  mood: number;
  sleepQuality: number;
  sleepHours: number;
  stress: number;
  energy: number;
  notes?: string;
}
