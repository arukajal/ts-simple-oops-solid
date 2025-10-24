import { SceneManager } from "./scene/SceneManager";

window.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("app")!;
  new SceneManager(container);
});
