import { motion } from "framer-motion";
import styled from "styled-components";
import NavigationButton from "../NavigationButton/NavigationButton";

export const Container = styled.div`
  position: absolute;
  width: 90%;
  height: auto;
  z-index: 2;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 0.6rem;

  @media screen and (min-width: 1024px) {
    width: 40vw;
    font-size: 1rem;
  }
`;

export const InnerContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

export const ButtonMirror = styled(NavigationButton)`
  flex-direction: row-reverse;
  img {
    transform: rotate(180deg);
  }
`;

export const NameContainer = styled.div`
  flex: 1;
  margin: 0 0.2rem;
  align-items: center;
  justify-content: center;
  display: flex;
  background-color: #161616;
  height: 5vh;
`;

export const PaneName = styled(motion.span).attrs({
  animate: { opacity: 1 },
  initial: { opacity: 0 },
})`
  color: white;
`;
