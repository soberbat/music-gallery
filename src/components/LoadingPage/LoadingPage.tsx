import { Container, LoadingText, Spinner } from "./LoadingPage.styles";

const LoadingPage = () => {
  return (
    <Container>
      <Spinner />
      <LoadingText>Loading</LoadingText>
    </Container>
  );
};

export default LoadingPage;
