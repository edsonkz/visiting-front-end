import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import GlobalStyle from "./styles/global";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import { VisitsProvider } from "./contexts/VisitsContext";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <VisitsProvider>
          <GlobalStyle />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            closeOnClick
            pauseOnHover
            theme="colored"
          />
          <AppRoutes />
        </VisitsProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
