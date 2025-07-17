//main.js

(() => {
  const cfg = window.projectConfig;
  if (!cfg) return console.error("projectConfig is not defined");

  document.title = `${cfg.title} AR`;
  document.getElementById("project-title").textContent = cfg.title;
  document.getElementById("meta-description").content = cfg.description;

  const footerLogo = document.getElementById("footer-logo");
  if (footerLogo && cfg.logo) footerLogo.src = cfg.logo;

  const arContainer = document.getElementById("ar-container");
  const fallback = document.getElementById("fallback");
  if (!arContainer) return;

  // Create model-viewer element
  const mv = document.createElement("model-viewer");
  mv.setAttribute("src", cfg.glb);
  mv.setAttribute("ios-src", cfg.usdz);
  mv.setAttribute("alt", `View the ${cfg.title} in AR`);
  mv.setAttribute("ar", "");
  mv.setAttribute("ar-modes", "scene-viewer quick-look webxr");
  mv.setAttribute("camera-controls", "");
  mv.setAttribute("environment-image", "neutral");
  mv.setAttribute("shadow-intensity", "1");
  mv.setAttribute("exposure", "1");
  mv.setAttribute("poster", cfg.image);

  // Styling
  mv.style.width = "clamp(300px, 90vw, 600px)";
  mv.style.height = "500px";
  mv.style.margin = "0 auto";
  mv.style.borderRadius = "8px";
  mv.style.boxShadow = "0 0 10px rgba(0,0,0,0.1)";

  arContainer.appendChild(mv);

  // Optional: Listen for AR status changes and update fallback message
  mv.addEventListener('ar-status', (event) => {
    if (event.detail.status === 'not-presenting') {
      fallback.textContent = ""; // Clear fallback when AR is ready
    } else if (event.detail.status === 'failed') {
      fallback.textContent = "AR is not supported or failed to start on your device.";
    }
  });
})();
