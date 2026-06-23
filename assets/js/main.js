(function () {
  document.addEventListener("DOMContentLoaded", () => {
    const liveRegion = document.getElementById("ui-status");
    const cartCount = document.querySelector("[data-cart-count]");
    const newsletterForm = document.querySelector("[data-newsletter-form]");
    const newsletterFeedback = document.querySelector("[data-newsletter-feedback]");
    const autoplayVideo = document.querySelector("[data-autoplay-video]");
    let toastTimeout = null;
    let cartItems = 0;

    const showToast = (message) => {
      let toast = document.querySelector("[data-toast]");

      if (!toast) {
        toast = document.createElement("div");
        toast.dataset.toast = "true";
        document.body.appendChild(toast);
      }

      toast.textContent = message;
      toast.dataset.visible = "true";
      liveRegion.textContent = message;

      window.clearTimeout(toastTimeout);
      toastTimeout = window.setTimeout(() => {
        toast.dataset.visible = "false";
      }, 2600);
    };

    document.querySelectorAll(".demo-trigger").forEach((button) => {
      button.addEventListener("click", () => {
        const label = button.dataset.demoLabel || "Esta selección";
        showToast(`${label}: próximamente.`);
      });
    });

    document.querySelectorAll("[data-scroll-target]").forEach((button) => {
      button.addEventListener("click", () => {
        const targetId = button.dataset.scrollTarget;
        const target = targetId ? document.getElementById(targetId) : null;

        if (!target) {
          return;
        }

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      });
    });

    document.querySelectorAll("[data-add-to-cart]").forEach((button) => {
      button.addEventListener("click", () => {
        cartItems += 1;
        cartCount.textContent = String(cartItems);
        showToast("Producto agregado al carro.");
      });
    });

    document.querySelectorAll("[data-favorite-toggle]").forEach((button) => {
      button.addEventListener("click", () => {
        const isPressed = button.getAttribute("aria-pressed") === "true";
        button.setAttribute("aria-pressed", String(!isPressed));
        button.innerHTML = `<span class="sr-only">${
          isPressed ? "Agregar a favoritos" : "Quitar de favoritos"
        }</span>${isPressed ? "♡" : "♥"}`;
        showToast(isPressed ? "Favorito eliminado." : "Guardado en tus favoritos.");
      });
    });

    const cartButton = document.querySelector("[data-cart-button]");

    if (cartButton) {
      cartButton.addEventListener("click", () => {
        showToast(cartItems ? `${cartItems} producto${cartItems === 1 ? "" : "s"} en tu carro.` : "Tu carro está vacío.");
      });
    }

    if (autoplayVideo instanceof HTMLVideoElement) {
      autoplayVideo.muted = true;
      autoplayVideo.defaultMuted = true;

      const tryPlay = () => {
        const playPromise = autoplayVideo.play();

        if (playPromise && typeof playPromise.catch === "function") {
          playPromise.catch(() => {
            // Some browsers delay autoplay until more media is buffered.
          });
        }
      };

      autoplayVideo.addEventListener("canplay", tryPlay, { once: true });
      autoplayVideo.addEventListener("loadeddata", tryPlay, { once: true });
      tryPlay();
    }

    if (newsletterForm && newsletterFeedback) {
      newsletterForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const emailInput = newsletterForm.elements.email;
        const value = String(emailInput.value || "").trim();
        const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

        if (!valid) {
          emailInput.setAttribute("aria-invalid", "true");
          newsletterFeedback.dataset.state = "error";
          newsletterFeedback.textContent = "Ingresa un correo con formato válido.";
          showToast("Correo inválido. Revisa el formato.");
          return;
        }

        emailInput.removeAttribute("aria-invalid");
        newsletterFeedback.dataset.state = "success";
        newsletterFeedback.textContent = "Welcome, Angel. Revisa tu bandeja de entrada.";
        emailInput.value = "";
        showToast("¡Gracias por suscribirte!");
      });
    }
  });
})();
