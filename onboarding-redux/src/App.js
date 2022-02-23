import React from "react";
import Home from "./pages/Home";
import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Login from "./pages/Login";
import { createBrowserHistory } from "history";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./features/theme";

const history = createBrowserHistory();
function App() {

  return (
    <ThemeProvider theme={theme}>
            <CssBaseline />

    <BrowserRouter history={history}>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
