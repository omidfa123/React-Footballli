// make the type based on the  json above
export interface fixtures {
  favorites?: null;
  all?: AllEntity[] | null;
  pinned?: null[] | null;
  live?: null[] | null;
}
export interface AllEntity {
  fixtures?: FixturesEntity[] | null;
  logo: string;
  id: string;
  api_id: string;
  name: string;
  season: string;
}
export interface FixturesEntity {
  home: HomeOrAway;
  away: HomeOrAway;
  id: string;
  api_id: string;
  status: string;
  elapsed: number;
  start_time: string;
  home_goals: number;
  away_goals: number;
  home_penalty_goals?: null;
  away_penalty_goals?: null;
  live_url?: string | null;
  archive_url?: null;
}
export interface HomeOrAway {
  logo: string;
  id: number;
  api_id: number;
  name: string;
  is_favorite?: null;
}
