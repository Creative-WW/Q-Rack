//main.js

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
  const arLauncher = document.getElementById("hidden-ar-launcher");

  const ua = navigator.userAgent;
  const isIOS = /iPhone|iPad|iPod/i.test(ua);
  const isAndroid = /Android/i.test(ua);
  const isMobile = isIOS || isAndroid;

  const imgHTML = `<img src="${cfg.image}" alt="View ${cfg.title} in AR" loading="eager" />`;

  if (isMobile) {
    arLauncher.setAttribute("src", cfg.glb);
    arLauncher.setAttribute("ios-src", cfg.usdz);

    // Visible AR button and image
    const launchButton = document.createElement("button");
    launchButton.className = "active-btn";
    launchButton.innerHTML = imgHTML;
    launchButton.onclick = () => arLauncher.activateAR();

    arBtn.innerHTML = "";
    arBtn.appendChild(launchButton);
  } else {
    // Desktop or unsupported device
    arBtn.innerHTML = `<button class="disabled-btn" disabled>${imgHTML}</button>`;
    fallback.textContent = "AR is only supported on iOS and Android mobile devices.";
  }
})();
