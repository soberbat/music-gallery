import { FC, useCallback, useState } from "react";
import * as S from "./RotatingCircle.styles";
import { MotionValue, useMotionValueEvent, useTransform } from "framer-motion";
import Segments from "./config";
import { Segment, SegmentThreshold } from "./types";

interface IRotatingCircle {
  scrollProgress: MotionValue<number>;
}

const RotatingCircle: FC<IRotatingCircle> = ({ scrollProgress }) => {
  const [currentSegment, setCurrentSegment] = useState<Segment>(0);
  const left = useTransform(scrollProgress, [0.06, 0.08], [-100, -43]);

  const getActiveBox = useCallback((latestScrollPosition: number) => {
    const currentSegment =
      latestScrollPosition < SegmentThreshold.HistorySegment
        ? Segment.History
        : latestScrollPosition < SegmentThreshold.OriginSegment
        ? Segment.Origin
        : Segment.Symbol;
    setCurrentSegment(currentSegment);
  }, []);

  useMotionValueEvent(scrollProgress, "change", getActiveBox);

  return (
    <S.Container left={left}>
      <S.TransformContainer activeDot={currentSegment}>
        {Segments.map(({ name, style }, i) => (
          <S.Segment style={style}>
            <S.InnerSegmentContainer activeDot={currentSegment}>
              <S.Name isActive={i === currentSegment}>{name}</S.Name>
            </S.InnerSegmentContainer>
          </S.Segment>
        ))}
      </S.TransformContainer>
    </S.Container>
  );
};

export default RotatingCircle;
