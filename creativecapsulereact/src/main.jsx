import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App.jsx";
import AuthorsContainer from "./components/AuthorsContainer.jsx";
import QuotesContainer from "./components/QuotesContainer.jsx";
import "./index.css";
import ReactQueryProvider from "./components/ReactQueryProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ReactQueryProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="authors" index element={<AuthorsContainer />} />
            <Route path="quotes" element={<QuotesContainer />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ReactQueryProvider>
 
  </StrictMode>
);
