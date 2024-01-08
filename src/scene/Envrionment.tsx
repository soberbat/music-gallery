import { memo, useEffect, useRef } from "react";
import { Container } from "./Scene.styled";
import { Scene } from "./class/Scene";

export interface IEnvironment {
  onProgres?: (progres: number) => void;
  sceneRef?: React.MutableRefObject<Scene | null>;
  onPlay?: (trackID: number, isPlaying: boolean) => void;
  onRotation?: (isAnimating: boolean) => void;
  trackProgres?: number;
}

const Environment = memo(
  ({ sceneRef, onProgres, onPlay, trackProgres, onRotation }: IEnvironment) => {
    const rendererWrapper = useRef<HTMLDivElement | null>(null);

    useEffect(
      () => sceneRef?.current?.setTrackProgress(trackProgres!),
      [trackProgres]
    );

    useEffect(() => {
      if (sceneRef)
        !sceneRef.current &&
          (async () => {
            sceneRef.current = new Scene({
              rendererContainer: rendererWrapper.current,
              handleProgress: onProgres!,
              onRotation: onRotation!,
              onPlay: onPlay!,
            });

            await sceneRef.current.init();
            sceneRef.current.animate();
          })();
    }, []);

    return <Container ref={rendererWrapper} />;
  }
);

export default Environment;
