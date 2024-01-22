import { BrowserRouter } from "react-router-dom";
import { RotasDoApp } from "./routes";
import { ThemeProvider } from "@mui/material";
import { TemaClaro } from "./shared/themes";

export const App = () => {
  return (
    <ThemeProvider theme={TemaClaro}>
      <BrowserRouter>
        <RotasDoApp />
      </BrowserRouter>
    </ThemeProvider>
  );
}