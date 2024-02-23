import { useRef, useState, useEffect } from "react";
import * as S from "./PlayerProgressSlider.styles";
import { IPlayerProgressSlider } from "./types";
import {
  FULL_PERCENTAGE,
  FULL_WIDTH_MINUS_HANDLE_OFFSET,
  MOUSE_OFFSET,
} from "./config";

const PlayerProgressSlider = ({
  progress,
  updateTrack,
}: IPlayerProgressSlider) => {
  const pBarRef = useRef<HTMLDivElement>(null);
  const [timeToSlideTo, setTimeToSlideTo] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const [boundingBox, setBoundingBox] = useState<DOMRect | null>();
  const [canSlide, setCanSlide] = useState(false);

  const onMouseUp = () => {
    canSlide && setIsSliding(false);
    canSlide && updateTrack(timeToSlideTo);
    setCanSlide(false);
  };

  const onMouseDown = (e: React.MouseEvent) => {
    const bar = pBarRef.current?.children[0];
    setCanSlide(e.target === pBarRef.current || e.target === bar);
    setIsSliding(true);
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!boundingBox) return;
    const progressBarWidth = boundingBox?.width;
    const leftOffset = boundingBox?.x;
    const positionOnBar = e.clientX - leftOffset;
    const position = (positionOnBar / progressBarWidth) * FULL_PERCENTAGE;
    const withMouseOffset = position + MOUSE_OFFSET;
    setTimeToSlideTo(Math.min(withMouseOffset, FULL_WIDTH_MINUS_HANDLE_OFFSET));
  };

  useEffect(() => {
    document.addEventListener("mouseup", onMouseUp);
    return () => document.removeEventListener("mouseup", onMouseUp);
  }, [canSlide, timeToSlideTo]);

  useEffect(() => {
    setBoundingBox(pBarRef.current && pBarRef.current.getBoundingClientRect());
    document.addEventListener("mousemove", onMouseMove);
  }, [pBarRef.current]);

  return (
    <S.Container>
      <S.ProgressBar onMouseDown={onMouseDown} ref={pBarRef}>
        <S.Progress width={`${isSliding ? timeToSlideTo : progress}%`}>
          <S.Handle />
        </S.Progress>
      </S.ProgressBar>
    </S.Container>
  );
};

export default PlayerProgressSlider;
