(() => {
  const images = Array.from(document.querySelectorAll("main img"));
  if (!images.length) return;

  const overlay = document.createElement("div");
  overlay.className = "lightbox-overlay";
  overlay.setAttribute("aria-hidden", "true");
  overlay.innerHTML = `
    <div class="lightbox-inner" role="dialog" aria-modal="true" aria-label="Image preview">
      <button class="lightbox-close" type="button" aria-label="Close preview">Close</button>
      <img alt="" />
    </div>
  `;
  document.body.appendChild(overlay);

  const overlayImage = overlay.querySelector("img");
  const closeBtn = overlay.querySelector(".lightbox-close");

  const open = (img) => {
    overlayImage.src = img.src;
    overlayImage.alt = img.alt || "Expanded image";
    overlay.setAttribute("aria-hidden", "false");
    overlay.classList.add("is-open");
    document.body.classList.add("lightbox-open");
    closeBtn.focus();
  };

  const close = () => {
    overlay.classList.remove("is-open");
    overlay.setAttribute("aria-hidden", "true");
    overlayImage.src = "";
    document.body.classList.remove("lightbox-open");
  };

  images.forEach((img) => {
    img.classList.add("lightbox-img");
    img.addEventListener("click", () => open(img));
    img.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        open(img);
      }
    });
    img.setAttribute("tabindex", "0");
  });

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) close();
  });

  closeBtn.addEventListener("click", close);

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && overlay.classList.contains("is-open")) {
      close();
    }
  });
})();
