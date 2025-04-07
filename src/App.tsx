import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import GlobalStyle from "./styles/global";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <AppRoutes />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
