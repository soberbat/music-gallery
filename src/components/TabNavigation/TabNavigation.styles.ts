import { motion } from "framer-motion";
import styled from "styled-components";
import { computeTransition } from "./config";
import { Dimensions, IInnerContainer, IPaneRec } from "./TabNavigation.types";

export const Container = styled.div`
  position: fixed;
  z-index: 2;
  width: ${`${Dimensions.outerContainerWidth}px`};
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 50%;
  left: 5%;
  transform: translate(-50%, -50%);
  display: none;

  @media screen and (min-width: 1024px) {
    display: block;
  }
`;

export const BackgroundOverlay = styled.div`
  width: ${`${Dimensions.overlayWH}px`};
  height: ${`${Dimensions.overlayWH}px`};
  border-radius: 3px;
  z-index: 0;
  background-color: #333333;
  opacity: 0.7;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const InnerContainer = styled.div`
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  position: relative;
`;

export const PaneRec = styled.div<IPaneRec>`
  border: 1px solid
    ${({ isActivePane }) => (isActivePane ? `white` : `#444444`)};
  border-radius: 3px;
  height: ${`${Dimensions.paneRectHeight}px`};
  width: ${`${Dimensions.paneRectWidth}px`};
  display: inline-block;
  margin-right: 5px;
  cursor: pointer;
  user-select: none;
  background-color: #292929;
  font-family: serif;
  font-size: 8px;
  line-height: 20px;
  color: #8c8b8b;
  margin-bottom: 0;
`;

export const Panes = styled(motion.div).attrs<IInnerContainer>(
  ({ activePane, width }) => ({
    animate: computeTransition(width, activePane!),
    transition: { type: "spring" },
    initial: false,
  })
)`
  z-index: 1;
  position: relative;
  width: min-content;
  height: 30px;
`;
