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

  const imgHTML = `<img src="${cfg.image}" alt="View ${cfg.title} in AR" loading="eager" />`;

  if (isIOS) {
    arBtn.innerHTML = `
      ${imgHTML}
      <model-viewer
        id="mv"
        src="${cfg.glb}"
        ios-src="${cfg.usdz}"
        alt="View ${cfg.title} in AR"
        ar
        ar-modes="quick-look"
        loading="lazy"
        style="position: absolute; width: 1px; height: 1px; opacity: 0; pointer-events: none;"
      ></model-viewer>
    `;
  } else if (isAndroid) {
    if (!cfg.glb.startsWith("https://")) {
      fallback.textContent = "AR model must be hosted on a public HTTPS URL for Android devices.";
      arBtn.innerHTML = `<button class="disabled-btn" disabled>AR Not Available</button>`;
      return;
    }

    arBtn.innerHTML = `
      ${imgHTML}
      <model-viewer
        id="mv"
        src="${cfg.glb}"
        alt="View ${cfg.title} in AR"
        ar
        ar-modes="scene-viewer"
        loading="lazy"
        style="position: absolute; width: 1px; height: 1px; opacity: 0; pointer-events: none;"
      ></model-viewer>
    `;
  } else {
    fallback.textContent = "AR is only supported on iOS and Android devices.";
    arBtn.innerHTML = `<button class="disabled-btn" disabled>AR Not Available</button>`;
  }

  // Forward click on image to model-viewer to launch AR
  const mv = document.getElementById("mv");
  const img = arBtn.querySelector("img");
  if (mv && img) {
    img.style.cursor = "pointer";
    img.addEventListener("click", () => {
      mv.click();
    });
  }
})();
