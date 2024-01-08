import React from "react";
import * as S from "./InfoOverlay.styles";
import Corner from "../Corner/Corner";

const InfoOverlay = () => {
  return (
    <S.Container>
      <S.InnerContainer>
        <Corner />
      </S.InnerContainer>
    </S.Container>
  );
};

export default InfoOverlay;
