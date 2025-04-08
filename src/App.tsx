import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import GlobalStyle from "./styles/global";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import { VisitsProvider } from "./contexts/VisitsContext";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <VisitsProvider>
          <AppRoutes />
        </VisitsProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;