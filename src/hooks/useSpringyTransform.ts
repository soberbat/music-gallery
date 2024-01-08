import { useSpring, useTransform } from "framer-motion";
import { scaleConfig } from "../utils/springConfig";

const useSpringyTransform = (range, output, scrollYProgress) => {
  return useSpring(useTransform(scrollYProgress, range, output), scaleConfig);
};

export default useSpringyTransform;
