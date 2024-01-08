import NavigationButton from "../NavigationButton/NavigationButton";
import {
  Container,
  Dropdown,
  InnerContainer,
  ButtonMirror,
} from "./MainNavigation.styled";

export default function MainNavigation() {
  return (
    <Container>
      <InnerContainer>
        <NavigationButton />
        <Dropdown />
        <ButtonMirror className="next" isNextButton={true} />
      </InnerContainer>
    </Container>
  );
}
