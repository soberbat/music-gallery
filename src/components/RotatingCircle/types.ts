import { MotionValue } from "framer-motion";

export interface IInnerContainer {
  activeDot: Segment;
}

export enum Segment {
  History = 0,
  Origin = 1,
  Symbol = 2,
}

export enum SegmentThreshold {
  HistorySegment = 0.48,
  OriginSegment = 0.8,
}

export interface IContainer {
  left: MotionValue<number>;
}

export interface ISegment {
  isActive: boolean;
}
