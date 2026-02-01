
export interface HockeyPlayer {
  id: string;
  name: string;
  team: string;
  position: string;
  gamesPlayed: number;
  goals: number;
  assists: number;
  points: number;
  plusMinus: number;
  penaltyMinutes: number;
  shotsOnGoal: number;
  shootingPercentage: number;
  averageIceTime: string;
  corsiForPercentage: number;
  fenwickForPercentage: number;
  expectedGoals: number;
  takeaways: number;
  giveaways: number;
  blockedShots: number;
  hits: number;
  faceoffWinPercentage: number;
}

export interface HockeyPlayerEntry {
  playerId: number;
  season: number;
  name: string;
  team: string;
  position: string;
  situation: 'all' | '5on5' | '4on5' | '5on4' | 'other';
  games_played: number;
  icetime: number;
  shifts: number;
  gameScore: number;
  onIce_xGoalsPercentage: number;
  onIce_corsiPercentage: number;
  onIce_fenwickPercentage: number;
  // Individual Stats (I_F_...)
  I_F_xGoals: number;
  I_F_points: number;
  I_F_goals: number;
  I_F_primaryAssists: number;
  I_F_secondaryAssists: number;
  I_F_shotsOnGoal: number;
  I_F_hits: number;
  I_F_takeaways: number;
  I_F_giveaways: number;
  faceoffsWon: number;
  faceoffsLost: number;
  shotsBlockedByPlayer: number;
  [key: string]: any;
}

export type ChartType = 'bar' | 'line' | 'scatter' | 'pie';

export interface AIQueryResponse {
  insightTitle: string;
  explanation: string;
  chartType: ChartType;
  xAxisKey: string;
  yAxisKey: string;
  situation: HockeyPlayerEntry['situation'];
  filterDescription: string;
  suggestedFollowUp: string[];
  sortDirection: 'asc' | 'desc';
  limit: number;
}

export interface AnalyticsResult {
  query: AIQueryResponse;
  data: HockeyPlayerEntry[];
  timestamp: number;
}