(() => {
  const cfg = window.projectConfig;
  if (!cfg) return console.error("projectConfig is not defined");

  document.title = `${cfg.title} AR`;
  document.getElementById("project-title").textContent = cfg.title;
  document.getElementById("meta-description").content = cfg.description;

  const footerLogo = document.getElementById("footer-logo");
  if (footerLogo && cfg.logo) footerLogo.src = cfg.logo;

  const arBtn = document.getElementById("ar-button");
  const fallback = document.getElementById("fallback");

  const ua = navigator.userAgent;
  const isIOS = /iPhone|iPad|iPod/i.test(ua);
  const isAndroid = /Android/i.test(ua);

  // Helper: fallback for desktop or unsupported devices
  const fallbackContent = () => {
    fallback.textContent = "AR is only supported on iOS and Android devices.";
    arBtn.innerHTML = `<button class="disabled-btn" disabled>AR Not Available</button>`;
  };

  if (isIOS) {
    // iOS Quick Look with model-viewer and .usdz
    arBtn.innerHTML = `
      <model-viewer
        src="${cfg.glb}"
        ios-src="${cfg.usdz}"
        alt="View ${cfg.title} in AR"
        ar
        ar-modes="quick-look"
        poster="${cfg.image}"
        loading="eager"
        style="width: 100%; height: 100%;"
      ></model-viewer>
    `;
  } else if (isAndroid) {
    if (!cfg.glb.startsWith("https://")) {
      fallback.textContent = "AR model must be hosted on a public HTTPS URL for Android devices.";
      arBtn.innerHTML = `<button class="disabled-btn" disabled>AR Not Available</button>`;
      return;
    }

    // Android with model-viewer, using Scene Viewer fallback handled internally
    arBtn.innerHTML = `
      <model-viewer
        src="${cfg.glb}"
        alt="View ${cfg.title} in AR"
        ar
        ar-modes="scene-viewer"
        poster="${cfg.image}"
        loading="eager"
        style="width: 100%; height: 100%;"
      ></model-viewer>
    `;
  } else {
    fallbackContent();
  }
})();
