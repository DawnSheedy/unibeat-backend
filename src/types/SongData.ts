import { ChartData } from "./ChartData";

export interface SongData {
  title: string;
  artist: string;
  tempo: number;
  length: number;
  versions: ChartData[];
  uuid: string;
}
