import {  Modal } from "antd";
import styled from "styled-components";

export const StyledRegisterModal = styled(Modal)`
  background: ${({ theme }) => theme.colors.background};  
  color: ${({ theme }) => theme.colors.text};  
  padding: 0;
  border-radius: 8px;

  .ant-modal-content {
    background: ${({ theme }) => theme.colors.background};
  }

  .ant-input-group-addon{
    padding: 0px;
  }
`;

export const FooterRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  gap: 8px;
`;

export const Title = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

export const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const OptionsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Option = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 12px;

  cursor: pointer;
  border: 1px solid ${({theme}) => theme.colors.text_1};
  border-radius: 8px;

  &:hover{
    background: ${({theme}) => theme.colors.text_1};
    color: ${({theme}) => theme.colors.white};
    transition: 200ms ease-in-out;
  }
`;

export const OptionTitle = styled.div`
  font-size: 18px;
  text-align: center;
  font-weight: 600;
`;

export const OptionDescription = styled.div`
  font-size: 14px;
  text-align: center;
  font-weight: 400;
`;

export const OptionIcon = styled.div`
  color: ${({ theme }) => theme.colors.primary};
`;

export const MapContainer = styled.div`
  height: 400px;
  padding: 12px 0;
`;

export const MapActionIndicator = styled.div`
  color: ${({theme}) => theme.colors.text};
  font-weight: 600;
  font-size: 16px;
`;