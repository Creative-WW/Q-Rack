(() => {
  const cfg = window.projectConfig;
  if (!cfg) return console.error("projectConfig is not defined");

  // Set page title and meta description dynamically from config
  document.title = `${cfg.title} AR`;
  document.getElementById("project-title").textContent = cfg.title;
  document.getElementById("meta-description").content = cfg.description;

  // Set footer logo dynamically from config
  const footerLogo = document.getElementById("footer-logo");
  if (footerLogo && cfg.logo) footerLogo.src = cfg.logo;

  const arBtn = document.getElementById("ar-button");
  const fallback = document.getElementById("fallback");

  const ua = navigator.userAgent;
  const isIOS = /iPhone|iPad|iPod/i.test(ua);
  const isAndroid = /Android/i.test(ua);
  const isMobile = isIOS || isAndroid;

  if (isMobile) {
    // Mobile: Use <model-viewer> with all URLs from config.js
    const modelViewer = document.createElement("model-viewer");
    modelViewer.setAttribute("src", cfg.glb);
    modelViewer.setAttribute("ios-src", cfg.usdz);
    modelViewer.setAttribute("alt", cfg.title);
    modelViewer.setAttribute("poster", cfg.image);
    modelViewer.setAttribute("shadow-intensity", "1");
    modelViewer.setAttribute("camera-controls", "");
    modelViewer.setAttribute("ar", "");
    modelViewer.setAttribute("ar-modes", "scene-viewer quick-look webxr");
    modelViewer.style.width = "100%";
    modelViewer.style.height = "100%";
    modelViewer.style.borderRadius = "8px";

    arBtn.innerHTML = "";
    arBtn.appendChild(modelViewer);

    fallback.textContent = ""; // No fallback on mobile
  } else {
    // Desktop: Show centered image from config.js with hover effect
    const img = document.createElement("img");
    img.src = cfg.image;
    img.alt = `View ${cfg.title}`;
    img.loading = "eager";
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = "contain";
    img.style.display = "block";
    img.style.transition = "transform 0.2s ease-in-out";
    img.style.borderRadius = "8px";
    img.addEventListener("mouseover", () => img.style.transform = "scale(1.05)");
    img.addEventListener("mouseout", () => img.style.transform = "scale(1)");

    arBtn.innerHTML = "";
    arBtn.appendChild(img);

    fallback.textContent = "AR is only supported on iOS and Android devices.";
  }
})();
