export interface IInnerContainer {
  activePane: number | undefined;
  width: number;
}

export interface IPaneRec {
  isActivePane: boolean;
}

export enum Dimensions {
  overlayWidth = 25,
  paneRectWidth = 16,
  paneRectHeight = 20,
  overlayWH = 50,
  paneMargin = 10,
  outerContainerWidth = 100,
}
