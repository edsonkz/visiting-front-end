import { ReactNode } from "react";
import { StyledButton } from "./styles";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export const Button = ({ children, onClick, type = "button" }: ButtonProps) => {
  return (
    <StyledButton onClick={onClick} type={type}>
      {children}
    </StyledButton>
  );
};
