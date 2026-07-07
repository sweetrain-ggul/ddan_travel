import { createRoot } from "react-dom/client";
import { App } from "./App";
import "../styles/global.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(<App />);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`, {
      updateViaCache: "none",
    }).catch(() => {
      // 설치 지원이 깨지지 않도록 조용히 무시
    });
  });
}
