import { memo, useEffect, useRef } from "react";
import { Container } from "./Scene.styled";
import { Scene } from "./class/Scene";

export interface IEnvironment {
  onProgres: (progres: number) => void;
  sceneRef: React.MutableRefObject<Scene | null>;
  onPlay: (trackID: number, isPlaying: boolean) => void;
  onRotate: (isAnimating: boolean) => void;
  trackProgress: number;
}

const Environment = memo(
  ({ sceneRef, onProgres, onPlay, trackProgress, onRotate }: IEnvironment) => {
    const rendererWrapper = useRef<HTMLDivElement | null>(null);

    useEffect(
      () => sceneRef?.current?.setTrackProgress(trackProgress),
      [trackProgress]
    );

    useEffect(() => {
      if (sceneRef)
        !sceneRef.current &&
          (async () => {
            sceneRef.current = new Scene({
              rendererContainer: rendererWrapper.current,
              handleProgress: onProgres!,
              onRotation: onRotate!,
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
