import { useCallback, useRef, useState } from "react";
import * as S from "./InfoPage.styles";
import {
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { infoFlowConfig } from "../../utils/springConfig";
import RotatingCircle from "../RotatingCircle/RotatingCircle";
import useSpringyTransform from "../../hooks/useSpringyTransform";
import InfoOverlay from "../InfoOverlay/InfoOverlay";
import Corner from "../Corner/Corner";

const InfoPage = () => {
  const rootRef = useRef(null);
  const [barScale, setBarScale] = useState(0);
  const scrollConfig = { container: rootRef };
  const { scrollY, scrollYProgress } = useScroll(scrollConfig);
  const HScale = useSpringyTransform([0.15, 0.151], [1, 2], scrollYProgress);
  const OScale = useSpringyTransform([0.48, 0.49], [1, 2], scrollYProgress);
  const SScale = useSpringyTransform([0.78, 0.79], [1, 2], scrollYProgress);
  const BGScale = useTransform(scrollYProgress, [0.3, 1], [120, 135]);
  const backgroundSize = `${BGScale.get()}%`;
  const height = `${10 + barScale}%`;

  const getScale = useCallback((v: number) => setBarScale(v * 100), []);
  useMotionValueEvent(scrollYProgress, "change", getScale);

  const evaluateTransform = useCallback(() => {
    const transitionOffset = window.innerHeight;
    return -scrollY.get() + transitionOffset;
  }, [scrollY]);

  const y = useSpring(useTransform(scrollY, evaluateTransform), infoFlowConfig);

  return (
    <S.AnimationContainer>
      <S.Container
        ref={rootRef}
        transition={infoFlowConfig}
        style={{ backgroundSize }}
      >
        <S.ScrollContainer />
      </S.Container>

      <S.InnerContainer style={{ y }}>
        {[HScale, OScale, SScale].map((scale, index) => (
          <S.Box key={index} style={{ scale }}>
            <Corner />
          </S.Box>
        ))}
      </S.InnerContainer>

      <S.ScrollBar>
        <S.ProgresBar transition={infoFlowConfig} animate={{ height }} />
      </S.ScrollBar>

      <RotatingCircle scrollProgress={scrollYProgress} />

      <InfoOverlay />
    </S.AnimationContainer>
  );
};

export default InfoPage;
