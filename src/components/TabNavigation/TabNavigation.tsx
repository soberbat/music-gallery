import { memo, useCallback, useEffect, useRef, useState } from "react";

import {
  BackgroundOverlay,
  Container,
  InnerContainer,
  PaneRec,
  Panes,
} from "./TabNavigation.styles";

import { IEnvironment } from "../../scene/Envrionment";
import { PANECOUNT } from "../../utils/config";

interface ITabNavigation extends IEnvironment {
  progres: number;
}

const TabNavigation = memo(
  ({ progres, onProgres }: Partial<ITabNavigation>) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const progressModulo = progres! % PANECOUNT;
    const [width, setwidth] = useState(0);

    const showIndex = useCallback((i: number) => (i === PANECOUNT ? 0 : i), []);

    useEffect(() => {
      if (!containerRef.current) return;
      const { width } = containerRef.current.getBoundingClientRect();
      setwidth(width);
    }, []);

    return (
      <Container>
        <InnerContainer>
          <Panes width={width} activePane={progressModulo}>
            {[...Array(PANECOUNT + 1)].map((_, index) => (
              <PaneRec
                onClick={() => onProgres!(index)}
                isActivePane={index === progressModulo}
                ref={containerRef}
                key={index}
              >
                {showIndex(index)}
              </PaneRec>
            ))}
          </Panes>
        </InnerContainer>
        <BackgroundOverlay />
      </Container>
    );
  }
);

export default TabNavigation;
