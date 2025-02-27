import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100%;

  gap: 64px;
`;

export const Slogan = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-size: 64px;
  font-weight: 700;
`;

export const ImageRow = styled.div`
  display: flex;
  align-items: center;
  gap: 30%;
`;

export const Image = styled.img`
  width: 40%;
`;