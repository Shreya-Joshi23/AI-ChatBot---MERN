import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.tsx";
import axios from "axios";
import { Toaster } from "react-hot-toast";

<<<<<<< HEAD
axios.defaults.baseURL = "https://ai-chatbot-backend-yyfl.onrender.com/api/v1";
=======
axios.defaults.baseURL = "https://ai-chatbot-backend-yyfl.onrender.com";
>>>>>>> 5dcb832d8e2418e0eeafa2b2372c65f7b5e0a39a
axios.defaults.withCredentials = true;

const theme = createTheme({
  typography: { fontFamily: "Roboto,serif", allVariants: { color: "white" } },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Toaster />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
