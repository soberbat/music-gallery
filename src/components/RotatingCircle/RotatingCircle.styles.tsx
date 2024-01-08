import { motion } from "framer-motion";
import styled from "styled-components";
import evaluateCircleRotation from "../../utils/evaluateCircleRotation";
import { IContainer, IInnerContainer, ISegment } from "./types";

const color = "#cec8be";

export const Container = styled(motion.div).attrs<IContainer>(({ left }) => ({
  animate: { left: `${left.get()}vh` },
  transition: { duration: 1.5 },
}))`
  position: fixed;
  width: 65vh;
  height: 65vh;
  top: 50%;
  left: -100vh;

  z-index: 99;
  transform: scaleX(-1) translate(0, -50%);
`;

export const TransformContainer = styled(motion.div).attrs<IInnerContainer>(
  ({ activeDot }) => ({
    initial: { rotate: "160deg" },
    transition: {
      ease: "easeInOut",
      duration: 1,
    },
    animate: {
      rotate: `${evaluateCircleRotation(activeDot)}deg`,
    },
  })
)`
  width: 100%;
  height: 100%;
  border: 2px solid ${color};
  border-radius: 9999px;
  position: relative;
`;

export const InnerContainer = styled.div`
  position: relative;
`;

export const Segment = styled.div`
  position: absolute;
  border-radius: 50%;
  background-color: ${color};
  width: 40px;
  height: 40px;
`;

export const InnerSegmentContainer = styled(motion.div).attrs<IInnerContainer>(
  ({ activeDot }) => ({
    animate: {
      rotate: `-${evaluateCircleRotation(activeDot)}deg`,
    },
    transition: {
      ease: "easeInOut",
      duration: 1,
    },
  })
)`
  position: absolute;
  width: 100%;
  height: 100%;
`;

export const Name = styled.span<ISegment>`
  font-size: 1.8rem;
  position: absolute;
  bottom: 0;
  right: 120%;
  color: ${color};
  transform: scaleX(-1);
  will-change: opacity;
  font-weight: 200;
  text-transform: uppercase;
  transition: ease-in-out 0.5 all;
  opacity: ${({ isActive }) => (isActive ? 1 : 0.4)};
  text-shadow: 4px 4px 10px rgb(0, 0, 0);
  display: inline-block;
`;
