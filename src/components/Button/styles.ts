import { Button } from "antd";
import styled from "styled-components";

export const StyledButton = styled(Button)`
  padding: 16px;
  background: #fe6900;
  border: 1px solid #fe6900;
  color: #eee6e2;
  
  font-size: 18px;
  font-weight: 500;

  &:hover {
    color: #fe6900 !important;
    border: 1px solid #fe6900 !important;
    background: #eee6e2 !important;
    transition: 200ms ease-in-out;
  }
`;