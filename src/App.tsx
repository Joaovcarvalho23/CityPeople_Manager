import { BrowserRouter } from "react-router-dom";
import { RotasDoApp } from "./routes";

export const App = () => {
  return (
    <BrowserRouter>
      <RotasDoApp />
    </BrowserRouter>
  );
}