import { useCallback, useRef, useState } from "react";
import "./App.css";
import Environment from "./scene/Envrionment";
import { Overlay } from "./scene/Scene.styled";
import { Scene } from "./scene/class/Scene";
import TabNavigation from "./components/TabNavigation/TabNavigation";
import Player from "./components/Player/Player";
import MainNavigation from "./components/MainNavigation/MainNavigation";
import {
  AnimationContainer,
  InnerContainer,
  NavigationContainer,
} from "./styles/Main.styles";
import { AnimatePresence } from "framer-motion";
import LoadingPage from "./components/LoadingPage/LoadingPage";

function App() {
  const scene = useRef<Scene | null>(null);
  const [progres, setProgres] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [_, setIsAnimating] = useState(false);
  const [track, setTrack] = useState<string | undefined>(undefined);
  const [trackID, setTrackID] = useState<number | null>();
  const [trackProgress, setTrackProgress] = useState(0);
  const [hasLoaded, setHasLoaded] = useState(false);

  const onNavigationProgress = useCallback((progres: number) => {
    setProgres(progres);
  }, []);

  const onTrackProgres = useCallback((progres: number) => {
    setTrackProgress(progres);
  }, []);

  const handleTabNavigation = useCallback((progres: number) => {
    scene.current?.onWheel(undefined, true, progres);
  }, []);

  const onNavigationClick = useCallback((isForwards: boolean) => {
    scene.current?.onWheel(undefined, false, 0, isForwards);
  }, []);

  const onRotate = useCallback((isAnimating: boolean) => {
    setIsAnimating(isAnimating);
  }, []);

  const onPlay = useCallback((trackID: number, shouldPlay: boolean) => {
    setTrack(`/music/track-${trackID}.mp3`);
    setIsPlaying(shouldPlay);
    setTrackID(trackID + 1);
  }, []);

  const onContentLoaded = useCallback(() => setHasLoaded(true), []);

  return (
    <AnimationContainer key="main">
      <Environment
        onPlay={onPlay}
        onProgres={onNavigationProgress}
        sceneRef={scene}
        trackProgress={trackProgress}
        onRotate={onRotate}
        onContentLoaded={onContentLoaded}
      />

      <Player
        onTrackProgres={onTrackProgres}
        trackSrc={track}
        isPlaying={isPlaying}
        trackID={trackID}
      />

      <AnimatePresence>
        {!isPlaying && (
          <NavigationContainer key={"nav"}>
            <InnerContainer>
              <TabNavigation
                onProgres={handleTabNavigation}
                progres={progres}
              />
              <MainNavigation progress={progres} onClick={onNavigationClick} />
            </InnerContainer>
          </NavigationContainer>
        )}
      </AnimatePresence>

      <Overlay />

      <AnimatePresence>{!hasLoaded && <LoadingPage />}</AnimatePresence>
    </AnimationContainer>
  );
}

export default App;
