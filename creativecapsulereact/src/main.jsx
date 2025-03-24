import '@ant-design/v5-patch-for-react-19';
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App.jsx";
import AuthorsContainer from "./components/AuthorsContainer.jsx";
import QuotesContainer from "./components/QuotesContainer.jsx";
import "./index.css";
import ReactQueryProvider from "./components/ReactQueryProvider.jsx";
import QuoteOfTheDayContainer from './components/QuoteOfTheDayContainer.jsx';
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ReactQueryProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="authors" index element={<AuthorsContainer />} />
            <Route path="quotes/:author?" element={<QuotesContainer />} />
            <Route path="quote-of-the-day" element={<QuoteOfTheDayContainer />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ReactQueryProvider>
 
  </StrictMode>
);
