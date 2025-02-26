import { Header } from "antd/es/layout/layout";
import styled from "styled-components";

export const StyledHeader = styled(Header)`
  height: 5vh !important;
  background: #eee6e2;  
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const Title = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #3f3f3f;
  &:hover {
    font-size: 26px;
    transition: 200ms ease-in-out;
  }
`;

export const Icon = styled.div`
  font-size: 32px;
  color: #fe6900;
`;

export const NavContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const NavDivider = styled.div`
    font-size: 24px;
    color: #3f3f3f;
`;

export const NavContent = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: #3f3f3f;
  cursor: pointer;

  &:hover {
    font-size: 20px;
    transition: 200ms ease-in-out;
  }
`;
