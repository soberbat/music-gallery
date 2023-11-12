import React, { useEffect, useRef, useState } from "react";
import { Container } from "./Scene.styled";
import { Scene } from "./scene.class";

const Environment = () => {
  const rendererWrapper = useRef<HTMLDivElement | null>(null);
  const scene = useRef<Scene | null>(null);
  const [progress, setProgress] = useState<number>(0);

  const handleProgress = (progress: number) => {
    console.log(progress);
  };

  useEffect(() => {
    !scene.current &&
      (async () => {
        scene.current = new Scene({
          rendererContainer: rendererWrapper.current,
          handleProgress: handleProgress,
        });

        await scene.current.init();
        scene.current.animate();
      })();
  }, []);

  useEffect(() => {}, [progress]);

  return <Container ref={rendererWrapper}></Container>;
};

export default Environment;
