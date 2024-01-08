import { useCallback, useRef, useState } from "react";
import "./App.css";
import Environment from "./scene/Envrionment";
import { Overlay } from "./scene/Scene.styled";
import { Scene } from "./scene/class/Scene";
import TabNavigation from "./components/TabNavigation/TabNavigation";
import Player from "./components/Player/Player";
import MainNavigation from "./components/MainNavigation/MainNavigation";
import { AnimatePresence } from "framer-motion";
import {
  Button,
  InnerContainer,
  NavigationContainer,
} from "./styles/Main.styles";
import InfoPage from "./components/InfoPage/InfoPage";
import { AnimationContainer } from "./components/InfoPage/InfoPage.styles";

function App() {
  const scene = useRef<Scene | null>(null);
  const [progres, setProgres] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [track, setTrack] = useState<string | undefined>(undefined);
  const [trackProgress, setTrackProgress] = useState(0);
  const [isInfoPageVisible, setIsInfoPageVisible] = useState(false);

  const onProgres = useCallback((progres: number) => {
    setProgres(progres);
  }, []);

  const onInfoPageClick = useCallback(() => {
    setIsInfoPageVisible(!isInfoPageVisible);
  }, [isInfoPageVisible]);

  const onTrackProgres = useCallback((progres: number) => {
    setTrackProgress(progres);
  }, []);

  const handleTabNavigation = useCallback((progres: number) => {
    scene.current?.onWheel(undefined, true, progres);
  }, []);

  const onRotation = useCallback((isAnimating: boolean) => {
    setIsAnimating(isAnimating);
  }, []);

  const onPlay = useCallback((trackID: number, isPlaying: boolean) => {
    setTrack(`/music/track-${trackID}.mp3`);
    setIsPlaying(isPlaying);
  }, []);

  return (
    <>
      {isInfoPageVisible ? (
        <InfoPage />
      ) : (
        <AnimationContainer>
          <Environment
            onPlay={onPlay}
            onProgres={onProgres}
            sceneRef={scene}
            trackProgres={trackProgress}
            onRotation={onRotation}
          />

          <AnimatePresence>
            {isPlaying ? (
              <Player
                key={"player"}
                onTrackProgres={onTrackProgres}
                trackSrc={track}
                progres={progres}
                isPlaying={isPlaying}
              />
            ) : (
              <NavigationContainer key={"nav"}>
                <InnerContainer>
                  <TabNavigation
                    onProgres={handleTabNavigation}
                    progres={progres}
                  />
                  <MainNavigation />
                </InnerContainer>
              </NavigationContainer>
            )}
          </AnimatePresence>

          <Button onClick={onInfoPageClick}>Info</Button>
          <Overlay />
        </AnimationContainer>
      )}
    </>
  );
}

export default App;
