import styled from "styled-components";

export const Container = styled.div`
  background: ${({ theme }) => theme.colors.background};
  height: 100%;
  overflow: auto !important;
`;