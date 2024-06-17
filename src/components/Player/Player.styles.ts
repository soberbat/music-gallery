import { motion } from "framer-motion";
import styled from "styled-components";
import { IPlayPauseButton } from "./types";

export const Container = styled(motion.div).attrs({
  initial: { y: "150%", x: "-50%" },
  animate: { y: "0%", x: "-50%" },
  exit: { y: "150%", x: "-50%", opacity: 0 },
  transition: { type: "spring", duration: 1.5 },
})`
  background-color: white;
  width: 95vw;
  height: 14vh;
  z-index: 3;
  position: fixed;
  bottom: 5%;
  left: 50%;
  transform: translate(-50%, 0);
  background: rgba(24, 24, 24, 0.315);
  backdrop-filter: blur(10px);
  border-radius: 2px;
  text-align: center;
  border: 1px solid rgba(254, 254, 254, 0.216);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1vh 1.5vh;
  box-sizing: border-box;
  color: white;

  @media screen and (min-width: 1024px) {
    width: 80vw;
    padding: 2.5vh 3vh;
  }
`;

export const TopPanel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;
`;

export const TitleContainer = styled.div`
  display: inline-block;
`;

export const Composer = styled.h5`
  margin: 0;
  padding: 0;
  text-align: left;
  text-transform: uppercase;
  font-size: 0.5rem;
  font-weight: 300;
  margin-bottom: -0.5vh;
  word-spacing: 2vw;

  @media screen and (min-width: 1024px) {
    font-size: 0.7rem;
  }
`;

export const Title = styled.h3`
  margin: 0;
  padding: 0;
  font-size: 0.6rem;
  text-align: left;
  font-weight: 500;

  @media screen and (min-width: 1024px) {
    font-size: 1rem;
  }
`;

export const Thumbnail = styled(motion.img).attrs({
  animate: { opacity: 1 },
  initial: { opacity: 0 },
  exit: { opacity: 0 },
})`
  width: 2rem;
  height: 2rem;
  border-radius: 100%;
  margin-left: auto;

  @media screen and (min-width: 1024px) {
    width: 3rem;
    height: 3rem;
  }
`;

export const BottomPanel = styled(motion.div).attrs({
  animate: { opacity: 1 },
  initial: { opacity: 0 },
  exit: { opacity: 0 },
})`
  font-size: 0.8rem;
  margin-top: 1.2vh;
`;

export const PanelInnerWrapper = styled(motion.div).attrs({
  animate: { opacity: 1 },
  initial: { opacity: 0 },
  exit: { opacity: 0 },
})`
  align-items: center;
  justify-content: center;
  display: flex;
`;

export const ProgressBar = styled.div`
  flex: 1;
  height: 100%;
`;

export const PlayPauseWrap = styled.div`
  flex: 0.04;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10%;
  user-select: none;
`;

export const PlayPause = styled.img.attrs<IPlayPauseButton>(
  ({ isPlaying }) => ({
    src: `/${isPlaying ? "pause" : "play"}.svg`,
  })
)`
  width: 2rem;
`;

export const Duration = styled.span`
  user-select: none;
`;

export const Progress = styled.span`
  flex: 0.03;
`;

export const TrackLoadingIndicator = styled(motion.div).attrs({
  animate: { opacity: 1 },
  initial: { opacity: 0 },
  exit: { opacity: 0 },
})`
  width: 50%;
  margin: 0 auto;
  height: 2px;
  margin-top: 2vh;
  height: 10%;
  border-radius: 12px;
  background-color: gray;
  position: relative;
  overflow: hidden;
`;

export const MovingHandle = styled(motion.div).attrs({
  animate: { marginLeft: "100%" },
  initial: { marginLeft: 0 },
  transition: {
    repeat: Infinity,
    repeatType: "loop",
    duration: 1,
  },
})`
  position: absolute;
  height: 100%;
  width: 60px;
  background-color: gainsboro;
`;
