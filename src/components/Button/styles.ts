import { Button } from "antd";
import styled from "styled-components";

interface StyledButtonProps {
  buttonSize: 'sm' | 'md' |'lg'
  variant: 'base' | 'transparent' 
}

export const StyledButton = styled(Button)<StyledButtonProps>`
background: ${({ theme, variant }) => variant === 'base' ? theme.colors.primary : 'transparent'};
  
  padding: ${({buttonSize}) => buttonSize === 'sm' ? '16px' : 
    buttonSize === 'md' ? '20px' : '30px'} ;

  border: 1px solid ${({ theme }) => theme.colors.primary};

  color: ${({ theme, variant }) => variant === 'base' ? theme.colors.background : theme.colors.primary};
  
  font-size: ${({buttonSize}) => buttonSize === 'sm' ? '16px' : 
    buttonSize === 'md' ? '18px' : '32px'};
  font-weight: 500;

  &:hover {
    background: ${({ theme, variant }) => variant === 'base' ? theme.colors.primary_dark : theme.colors.primary_light} !important;
    color: ${({ theme, variant }) => variant === 'base' ? theme.colors.white : theme.colors.background} !important;
    border: 1px solid ${({ theme, variant }) => variant === 'base' ? theme.colors.primary_dark : theme.colors.primary_light} !important;
    transition: 200ms ease-in-out;
  }
`;