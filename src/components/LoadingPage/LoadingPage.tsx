import {
  Container,
  LoadingText,
  Spinner,
  UserManual,
} from "./LoadingPage.styles";

const LoadingPage = () => {
  return (
    <Container>
      <Spinner />
      <LoadingText>Loading</LoadingText>
      <UserManual>
        Use navigation or trackpad / wheel to navigate and click panes to play
        the music.
      </UserManual>
    </Container>
  );
};

export default LoadingPage;
