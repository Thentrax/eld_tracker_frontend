import { Card } from "antd";
import styled from "styled-components";

export const StyledCard = styled(Card)`
  background: ${({ theme }) => theme.colors.background};
  width: 300px;
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.text};

  .ant-card-body{
    padding: 0;
  }
`;

export const Title = styled.div`
  color: ${({ theme }) =>  theme.colors.text};
  font-weight: 700;
  font-size: 18px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.text};

  padding: 16px;
`;

export const ChildrenContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  color: ${({ theme }) =>  theme.colors.text};
  font-weight: 400;
  font-size: 14px;

  padding: 16px;
`;