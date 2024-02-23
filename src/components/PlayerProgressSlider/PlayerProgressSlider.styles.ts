import { motion } from "framer-motion";
import styled from "styled-components";
import { ISliderProgress } from "./types";

export const Container = styled.div`
  flex: 1;
  box-sizing: border-box;
  padding: 0 1rem;
`;

export const ProgressBar = styled.div`
  height: 5px;
  cursor: pointer;
  width: 100%;
  border-radius: 12px;
  background-color: gray;
`;

export const Progress = styled(motion.div).attrs<ISliderProgress>(
  ({ width }) => ({
    animate: {
      width,
    },
    transition: { ease: "linear", duration: 0.2 },
  })
)`
  height: 100%;
  background-color: gainsboro;
  width: 0;
  position: relative;
  border-radius: 12px;
`;

export const Handle = styled.span`
  width: 15px;
  height: 15px;
  display: inline-block;
  pointer-events: none;
  border-radius: 100%;
  background-color: gainsboro;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 0;
`;
