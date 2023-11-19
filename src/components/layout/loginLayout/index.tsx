import React, { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import {StyledContainer} from "./style"
interface LoginProps{
  children?: ReactNode
}
const LoginComponent = ({ children }: LoginProps) => {
  return (
    <StyledContainer>
      <Outlet />
    </StyledContainer>
  );
};

export default LoginComponent;
