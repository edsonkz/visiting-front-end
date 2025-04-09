import { ReactNode } from "react";
import { StyledButton, Variant } from "./styles";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: Variant;
  disabled?: boolean;
}

export const Button = ({
  children,
  onClick,
  type = "button",
  variant = "secondary",
  disabled,
}: ButtonProps) => {
  return (
    <StyledButton
      onClick={onClick}
      type={type}
      disabled={disabled}
      variant={variant}
    >
      {children}
    </StyledButton>
  );
};
