import React from "react";
import { Container, DirectionIndicator, Text } from "./NavigationButton.styles";

interface INavigationButton {
  isNextButton?: boolean;
  className?: string;
}

const NavigationButton = ({ isNextButton, className }: INavigationButton) => {
  const text = isNextButton ? "Next" : "Previous";
  return (
    <Container className={className}>
      <DirectionIndicator src="/icons/arrow-left.svg" />
      <Text>{text}</Text>
    </Container>
  );
};

export default NavigationButton;
