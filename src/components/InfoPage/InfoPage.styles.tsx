import { motion } from "framer-motion";
import styled from "styled-components";

export const Container = styled(motion.div).attrs({
  //   transition: { ease: "easeInOut", duration: 0.2 },
})`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 6;
  width: 100vw;
  height: 100vh;
  overflow: scroll;
  background-image: url("/overlay3.jpg");
  background-size: 120%;
  object-fit: scale-down;
  background-position: center;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const InnerContainer = styled(motion.div)`
  position: fixed;
  height: 420vh;
  z-index: 10;
  width: 100%;
  pointer-events: none;
  left: 0;
  display: flex;
  align-items: center;
  padding-left: 20rem;
  flex-direction: column;
  gap: 60vh;
`;

export const ScrollContainer = styled(motion.div)`
  height: 420vh;
`;

export const ScrollBar = styled(motion.div)`
  width: 0.18%;
  position: fixed;
  top: 0;
  background-color: #cec8be;
  height: 100%;
  right: 0;
  z-index: 9;
`;

export const ProgresBar = styled(motion.div)`
  background-color: #991421;
  width: 100%;
  transform-origin: top;
`;

export const Box = styled(motion.div)`
  width: 20vw;
  height: 40vh;
  background: rgba(24, 24, 24, 0.267);
  backdrop-filter: blur(10px);
  border-radius: 2px;
  text-align: center;
  box-shadow: 0 0px 5px rgba(0, 0, 0, 0.1);
`;

export const AnimationContainer = styled(motion.div).attrs({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5 },
})``;
