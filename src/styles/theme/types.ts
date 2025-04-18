import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      secondaryDark: string;
      success: string;
      successDark: string;
      danger: string;
      dangerDark: string;
      blue: string;
      background: string;
      text: string;
      white: string;
    };
  }
}
