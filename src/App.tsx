import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthContextProvider } from "./context/AuthContext";
import { Toaster } from "sonner";
import AppRoutes from "./Routes";

function App() {
  return (
    <>
      <ThemeProvider>
        <BrowserRouter>
          <AuthContextProvider>
            <Toaster position="top-center" />
            <AppRoutes />
          </AuthContextProvider>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
