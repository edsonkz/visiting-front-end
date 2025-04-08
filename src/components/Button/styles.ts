import styled, { DefaultTheme } from "styled-components";

export type Variant = "default" | "success" | "danger";

type StyledButtonProps = {
  variant?: Variant;
};

const getVariantColor = (
  theme: DefaultTheme,
  variant: Variant = "default",
  isDark?: boolean
) => {
  const colorMap = {
    default: isDark ? theme.colors.secondaryDark : theme.colors.secondary,
    success: isDark ? theme.colors.successDark : theme.colors.success,
    danger: isDark ? theme.colors.dangerDark : theme.colors.danger,
  };

  return colorMap[variant];
};

export const StyledButton = styled.button<StyledButtonProps>`
  background-color: ${({ theme, variant }) => getVariantColor(theme, variant)};
  color: white;
  border: none;
  font-weight: bold;
  border-radius: 8px;
  padding: 10px 16px;
  font-size: 1rem;
  -webkit-box-shadow: 0px 3px 8px 1px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0px 3px 8px 1px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 3px 8px 1px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover:not(:disabled) {
    background-color: ${({ theme, variant }) =>
      getVariantColor(theme, variant, true)};
  }

  &:disabled {
    background-color: ${({ theme, variant }) =>
      getVariantColor(theme, variant, true)};
    cursor: not-allowed;
    opacity: 0.7;
  }
`;
