import styled from "styled-components";

export const Container = styled.div`
  padding: 24px 50px;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  gap: 12px;
  padding: 12px 0;
`;

export const FixedRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
`;

export const Col = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px 0;
`;

export const Title = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

export const SubTitle = styled.div`
  font-size: 18px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.text};
`;

export const Text = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.text};
`;