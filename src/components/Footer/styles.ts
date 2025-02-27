import { Footer } from "antd/es/layout/layout";
import styled from "styled-components";

export const StyledFooter = styled(Footer)`
  height: 5vh !important;
  background: ${({ theme }) => theme.colors.secondary};  
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  gap: 8px;
`;

export const Text = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  &:hover {
    font-size: 26px;
    transition: 200ms ease-in-out;
  }
`;