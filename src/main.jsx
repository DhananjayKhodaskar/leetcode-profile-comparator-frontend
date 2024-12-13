import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store.js";
import { PersistGate } from "redux-persist/integration/react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorBoundryPage from "./pages/app/ErrorBoundryPage";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ErrorBoundary fallback={<ErrorBoundryPage />}>
            <App />
          </ErrorBoundary>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
