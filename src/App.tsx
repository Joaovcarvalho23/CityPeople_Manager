import { BrowserRouter } from "react-router-dom";
import { RotasDoApp } from "./routes";
import { AppThemeProvider } from "./shared/contexts";

export const App = () => {
  return (
    <AppThemeProvider>
      <BrowserRouter>
        <RotasDoApp />
      </BrowserRouter>
    </AppThemeProvider>
  );
}