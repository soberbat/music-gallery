import { Segment } from "../components/RotatingCircle/types";

export default (activeDot: Segment) => {
  switch (activeDot) {
    case Segment.Origin:
      return "179";
    case Segment.Symbol:
      return "200";
    default:
      return "160";
  }
};
