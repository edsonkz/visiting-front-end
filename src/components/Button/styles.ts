import styled, { DefaultTheme } from "styled-components";

export type Variant = "secondary" | "success" | "danger" | "blue";

type StyledButtonProps = {
  $variant?: Variant;
};

const getVariantColor = (
  theme: DefaultTheme,
  $variant: Variant = "secondary",
  isDark?: boolean
) => {
  const colorMap = {
    secondary: isDark ? theme.colors.secondaryDark : theme.colors.secondary,
    success: isDark ? theme.colors.successDark : theme.colors.success,
    danger: isDark ? theme.colors.dangerDark : theme.colors.danger,
    blue: theme.colors.blue,
  };

  return colorMap[$variant];
};

export const StyledButton = styled.button<StyledButtonProps>`
  background-color: ${({ theme, $variant }) => getVariantColor(theme, $variant)};
  color: white;
  border: none;
  font-weight: bold;
  border-radius: 8px;
  padding: 10px 16px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover:not(:disabled) {
    background-color: ${({ theme, $variant }) =>
      getVariantColor(theme, $variant, true)};
  }

  &:disabled {
    background-color: ${({ theme, $variant }) =>
      getVariantColor(theme, $variant, true)};
    cursor: not-allowed;
    opacity: 0.5;
  }
`;
