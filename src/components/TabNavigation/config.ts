import { Dimensions } from "./TabNavigation.types";

const centerOfTheSquare =
  Dimensions.outerContainerWidth / 2 - Dimensions.overlayWidth / 2 + 4;

export const computeTransition = (width: number, activePane: number) => ({
  x: `${
    centerOfTheSquare -
    activePane * (width / 2 + width / 2 + Dimensions.paneMargin / 2)
  }px`,
});
