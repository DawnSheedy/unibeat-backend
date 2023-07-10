import { SongDifficulty } from "../models/game/Chart";

export enum TickType {
  Note,
  Hold,
  Beat,
  Measure,
  End,
}

export interface SongTick {
  tick: number;
  detail: number;
  type: TickType;
}

export interface ChartData {
  difficulty: SongDifficulty;
  chart: { events: SongTick[] };
}
