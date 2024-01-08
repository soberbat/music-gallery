import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { IEnvironment } from "../../scene/Envrionment";

import { Howl } from "howler";
import { Container } from "./Player.styles";

interface IPlayer extends IEnvironment {
  onTrackProgres: IEnvironment["onProgres"];
  progres: number;
  isPlaying: boolean;
  trackSrc: string | undefined;
}

const Player = memo(
  ({ progres, trackSrc, onTrackProgres, isPlaying }: IPlayer) => {
    const animationFrame = useRef<number>(0);
    const trackID = useRef<number | undefined>(undefined);
    const [track, setTrack] = useState<Howl | undefined>(undefined);

    useEffect(() => {
      if (!trackSrc) return;
      track?.unload();
      setTrack(new Howl({ src: trackSrc! }));
    }, [trackSrc]);

    useEffect(() => {
      if (!track) return;
      isPlaying ? track.play() : track.stop();
    }, [isPlaying, track]);

    const calculatePercentage = useCallback(
      () => ((track.seek() * 100) / (track.duration() * 100)) * 100,
      [track]
    );

    const getTrackProgress = () => {
      onTrackProgres!(calculatePercentage());
      animationFrame.current = requestAnimationFrame(getTrackProgress);
    };

    useEffect(() => {
      if (isPlaying && track) {
        animationFrame.current = requestAnimationFrame(getTrackProgress);
      }

      return () => cancelAnimationFrame(animationFrame.current);
    }, [isPlaying, track]);

    return <Container key={"1221"}></Container>;
  }
);

export default Player;
