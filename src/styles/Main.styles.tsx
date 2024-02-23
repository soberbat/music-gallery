import { motion } from "framer-motion";
import styled from "styled-components";

export const NavigationContainer = styled(motion.div).attrs({
  initial: { opacity: 0, y: "150%" },
  animate: { y: "0%", opacity: 1 },
  exit: { y: "150%", opacity: 0 },
  transition: { type: "spring", duration: 1.5 },
})`
  position: fixed;
  bottom: 0;
  height: 12%;
  width: 100%;
  left: 0;
  display: flex;
  z-index: 6;
  align-items: center;
`;

export const InnerContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const Button = styled.div`
  position: fixed;
  top: 2%;
  left: 1%;
  background-color: #161616;
  padding: 0.5rem 2rem;
  z-index: 999;
  color: white;
  border-radius: 0.5px;
  font-weight: 400;
`;

export const AnimationContainer = styled(motion.div).attrs({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { filter: "blur(15px)" },
  transition: { duration: 0.5 },
})`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: fixed;
`;
