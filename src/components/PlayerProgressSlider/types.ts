export interface IPlayerProgressSlider {
  progress: number | undefined;
  updateTrack: (progressToSet: number) => void;
}

export interface ISliderProgress {
  width: string | undefined;
}
