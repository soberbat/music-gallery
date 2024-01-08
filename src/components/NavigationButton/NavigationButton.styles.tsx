import styled from "styled-components";

export const Container = styled.button`
  height: 5vh;
  flex: 0.2;
  border-radius: 2px;
  display: inline-block;
  background-color: #161616;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3vw;

  &:hover {
    background-color: #4a4a4a;
    border-color: transparent;
  }
`;

export const DirectionIndicator = styled.img`
  width: 1vw;
`;

export const Text = styled.span`
  color: white;
  font-size: 0.9rem;
`;
