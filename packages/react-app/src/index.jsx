import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React from "react";
import { ThemeSwitcherProvider } from "react-css-theme-switcher";
import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import HomePage from "./pages/Homepage";
import TokenTracker from "./pages/TokenTracker";

const themes = {
  dark: `${process.env.PUBLIC_URL}/dark-theme.css`,
  light: `${process.env.PUBLIC_URL}/light-theme.css`,
};

const prevTheme = window.localStorage.getItem("theme");

const subgraphUri = "http://localhost:8000/subgraphs/name/scaffold-eth/your-contract";

const client = new ApolloClient({
  uri: subgraphUri,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <ThemeSwitcherProvider themeMap={themes} defaultTheme={prevTheme || "light"}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App subgraphUri={subgraphUri} />}/>
          <Route path="/tokentracker" element={<TokenTracker/>} />
        </Routes>
        
      </BrowserRouter>
    </ThemeSwitcherProvider>
  </ApolloProvider>,
  document.getElementById("root"),
);
