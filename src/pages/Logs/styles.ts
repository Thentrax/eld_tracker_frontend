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

export const DetailInfoCard = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${({theme}) => theme.colors.text};
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.text};
  padding: 0;
  font-size: 14px;
`;

export const DetailInfoTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid ${({theme}) => theme.colors.text};
  padding: 8px;
  font-weight: 700;
  background: ${({theme}) => theme.colors.primary};
  color: ${({theme}) => theme.colors.white};
  border-radius: 8px 8px 0 0;
`;

export const DetailInfoValue = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  font-weight: 500;
`;

export const CycleHoursCard = styled.div`
  width: 100%;

  display: flex;
  padding: 12px;
  align-items: center;
  border: 1px solid ${({theme}) => theme.colors.text};
`;

export const CycleHoursRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const CycleHoursMapContainer = styled.div`
  max-width: 60%;
`;