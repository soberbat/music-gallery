import { Panes } from "../../scene/class/config";
import { PANECOUNT } from "../../utils/config";
import NavigationButton from "../NavigationButton/NavigationButton";
import {
  Container,
  InnerContainer,
  ButtonMirror,
  NameContainer,
  PaneName,
} from "./MainNavigation.styles";

interface MainNavigation {
  onClick: (isForwards: boolean) => void;
  progress: number;
}

const MainNavigation = ({ onClick, progress }: MainNavigation) => {
  const currentPaneName = Panes[progress % PANECOUNT].paneName;

  return (
    <Container>
      <InnerContainer>
        <NavigationButton onClick={() => onClick(false)} />
        <NameContainer>
          <PaneName key={progress}>{currentPaneName}</PaneName>
        </NameContainer>
        <ButtonMirror
          className=""
          isNextButton={true}
          onClick={() => onClick(true)}
        />
      </InnerContainer>
    </Container>
  );
};

export default MainNavigation;
