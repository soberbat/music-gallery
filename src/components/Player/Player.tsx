import { useCallback, useEffect, useRef, useState } from "react";
import { Howl } from "howler";
import * as S from "./Player.styles";
import { AnimatePresence } from "framer-motion";
import { IPlayer, ProgresConfig } from "./types";
import formatTime from "../../utils/formatTime";
import PlayerProgressSlider from "../PlayerProgressSlider/PlayerProgressSlider";
import { Panes } from "../../scene/class/config";

const Player = ({ trackSrc, onTrackProgres, isPlaying, trackID }: IPlayer) => {
  const animationFrame = useRef<number>(0);
  const progresConfig = useRef<ProgresConfig>([]);
  const [track, setTrack] = useState<Howl>();
  const [isTrackLoaded, setIsTrackLoaded] = useState(false);
  const thumbnailsrc = `textures/images/image-${trackID}.jpg`;

  const animate = () => {
    animationFrame.current = requestAnimationFrame(animate);
    const progress = getProgress();
    if (isNaN(progress!)) return;
    updateLastTrackProgres();
    onTrackProgres(progress!);
  };

  const updateLastTrackProgres = () => {
    const trackPlayedBefore = getTrackPlayedBefore();
    const trackProgress = track!.seek();
    if (trackProgress === 0) return;

    if (trackPlayedBefore) {
      trackPlayedBefore.progress = trackProgress!;
    } else {
      progresConfig.current?.push({ src: trackSrc!, progress: trackProgress });
    }
  };

  const getTrackPlayedBefore = () => {
    return progresConfig.current.find(
      (playedTrack) => playedTrack.src === trackSrc
    );
  };

  const getProgress = () =>
    track && ((track.seek() * 100) / (track.duration() * 100)) * 100;

  const updateTrackTime = useCallback(
    (progressToSet: number) => {
      console.log(progressToSet);
      const timeToSet = (progressToSet / 100) * track!.duration();
      track!.seek(timeToSet);
    },
    [track]
  );

  useEffect(() => {
    if (isTrackLoaded) {
      animationFrame.current = requestAnimationFrame(animate);
    }

    return () => {
      cancelAnimationFrame(animationFrame.current);
    };
  }, [isTrackLoaded]);

  useEffect(() => {
    track && track.once("load", () => setIsTrackLoaded(true));
  }, [track]);

  useEffect(() => {
    if (!isTrackLoaded) return;

    if (isPlaying) {
      const trackPlayedBefore = getTrackPlayedBefore();
      if (trackPlayedBefore) {
        track!.seek(trackPlayedBefore?.progress);
      }
    }

    isPlaying ? track?.play() : track?.pause();
  }, [isPlaying, isTrackLoaded]);

  useEffect(() => {
    if (!trackSrc) return;
    setTrack(undefined), track?.unload(), setIsTrackLoaded(false);
    setTrack(new Howl({ src: trackSrc!, loop: true }));
  }, [trackSrc]);

  return (
    <AnimatePresence>
      {isPlaying && (
        <S.Container key={"container"}>
          <S.TopPanel>
            <S.TitleContainer>
              <S.Composer>Composer</S.Composer>
              <S.Title>{Panes[trackID! - 1].paneName}</S.Title>
            </S.TitleContainer>

            <S.Thumbnail key={thumbnailsrc} src={thumbnailsrc} />
          </S.TopPanel>

          <AnimatePresence mode="wait">
            {isTrackLoaded ? (
              <S.BottomPanel key={"bottompanel"}>
                <S.PanelInnerWrapper key={trackSrc}>
                  <S.PlayPauseWrap>
                    <S.Duration>{formatTime(track?.seek())}</S.Duration>
                  </S.PlayPauseWrap>

                  <PlayerProgressSlider
                    updateTrack={updateTrackTime}
                    progress={getProgress()}
                  />

                  <S.Progress>{formatTime(track?.duration())}</S.Progress>
                </S.PanelInnerWrapper>
              </S.BottomPanel>
            ) : (
              <S.TrackLoadingIndicator key={"indicator"}>
                <S.MovingHandle />
              </S.TrackLoadingIndicator>
            )}
          </AnimatePresence>
        </S.Container>
      )}
    </AnimatePresence>
  );
};

export default Player;
