import { motion } from "framer-motion";
import styled, { keyframes } from "styled-components";

export const Container = styled(motion.div).attrs({
  exit: { opacity: 0 },
  animate: { opacity: 1 },
  initial: { opacity: 0 },
})`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100dvh;
  z-index: 9999;
  background-color: #121212;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const LoadingText = styled.h1`
  font-size: 1rem;
  font-weight: 300;
  text-transform: uppercase;
`;

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div`
  display: inline-block;
  width: 40px;
  height: 40px;
  border: 4px solid #f5f5f5;
  border-left-color: #2e2e2e;
  border-radius: 50%;
  animation: ${rotate} 1s linear infinite;
`;
