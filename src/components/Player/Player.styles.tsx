import { motion } from "framer-motion";
import styled from "styled-components";

export const Container = styled(motion.div).attrs({
  initial: { y: "150%", x: "-50%" },
  animate: { y: "0%", x: "-50%" },
  exit: { y: "150%", x: "-50%", opacity: 0 },
  transition: { type: "spring", duration: 1.5 },
})`
  background-color: white;
  width: 80vw;
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
`;
