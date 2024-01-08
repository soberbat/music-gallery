import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  z-index: 9999;
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
`;

export const InnerContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;
