import React from "react";
import { Container, DirectionIndicator, Text } from "./NavigationButton.styles";
import MainNavigation from "../MainNavigation/MainNavigation";

interface IProps {
  isNextButton?: boolean;
  className?: string;
  onClick: () => void;
}

const NavigationButton = ({ isNextButton, className, onClick }: IProps) => {
  const text = isNextButton ? "Next" : "Previous";
  return (
    <Container onClick={onClick} className={className}>
      <DirectionIndicator src="/icons/arrow-left.svg" />
      <Text>{text}</Text>
    </Container>
  );
};

export default NavigationButton;
