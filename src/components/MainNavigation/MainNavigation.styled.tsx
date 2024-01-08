import { motion } from "framer-motion";
import styled from "styled-components";
import NavigationButton from "../NavigationButton/NavigationButton";

export const Container = styled.div`
  position: absolute;
  width: 35vw;
  height: auto;
  z-index: 2;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const InnerContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

export const Dropdown = styled.div`
  flex: 1;
  background-color: #161616;
`;

export const ButtonMirror = styled(NavigationButton)`
  flex-direction: row-reverse;
  img {
    transform: rotate(180deg);
  }
`;
