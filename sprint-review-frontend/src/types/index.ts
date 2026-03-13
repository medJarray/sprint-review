export interface Sprint {
  id: string;
  number: number;
  name: string;
  startDate: string;
  endDate: string;
  goal: string;
}

export interface Team {
  id: string;
  name: string;
  members: TeamMember[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar?: string;
}

export interface Character {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
}

export interface SprintPage {
  id: string;
  title: string;
  slug: string;
  order: number;
  type: 'review' | 'demo' | 'retro' | 'custom';
  content: PageContent;
  visible: boolean;
}

export interface PageContent {
  sections: Section[];
}

export interface Section {
  id: string;
  type: 'text' | 'list' | 'metrics' | 'image' | 'demo' | 'chart';
  title: string;
  data: Record<string, unknown>;
  order: number;
}

export interface UserStory {
  id: string;
  title: string;
  description: string;
  points: number;
  status: 'done' | 'in-progress' | 'not-started' | 'blocked';
  assignee?: string;
  teamId: string;
}

export interface SprintMetrics {
  velocity: number;
  plannedPoints: number;
  completedPoints: number;
  burndownData: { day: number; remaining: number }[];
  satisfaction?: number;
}

export interface GlobalStyles {
  fontFamily: string;
  headingFontFamily: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  fontSize: number;
  borderRadius: number;
}

export interface AppState {
  sprint: Sprint;
  teams: Team[];
  character: Character;
  pages: SprintPage[];
  styles: GlobalStyles;
  userStories: UserStory[];
  metrics: SprintMetrics;
}

export type {
  Sprint,
  Team,
  TeamMember,
  Character,
  SprintPage,
  PageContent,
  Section,
  UserStory,
  SprintMetrics,
  GlobalStyles,
  AppState,
} from '../context/SprintContext';
