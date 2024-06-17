import { IEnvironment } from "../../scene/Envrionment";

export type ProgresConfig = Array<{ src: string; progress: number }>;

export interface IPlayer {
  onTrackProgres: IEnvironment["onProgres"];
  isPlaying: boolean;
  trackSrc: string | undefined;
  trackID: number | null | undefined;
}

export interface IPlayPauseButton {
  isPlaying: boolean;
}
