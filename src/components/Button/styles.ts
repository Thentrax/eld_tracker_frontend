import { Button } from "antd";
import styled from "styled-components";

interface StyledButtonProps {
  buttonSize?: 'sm' | 'md' |'lg'
}

export const StyledButton = styled(Button)<StyledButtonProps>`
  padding: ${({buttonSize}) => buttonSize === 'sm' ? '16px' : 
    buttonSize === 'md' ? '20px' : '30px'} ;
  background: ${({ theme }) => theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  
  font-size: ${({buttonSize}) => buttonSize === 'sm' ? '18px' : 
    buttonSize === 'md' ? '24px' : '32px'};
  font-weight: 500;

  &:hover {
    color: ${({ theme }) => theme.colors.primary} !important;
    border: 1px solid ${({ theme }) => theme.colors.primary} !important;
    background: ${({ theme }) => theme.colors.background} !important;
    transition: 200ms ease-in-out;
  }
`;