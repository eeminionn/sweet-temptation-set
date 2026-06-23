(function () {
  document.addEventListener("DOMContentLoaded", () => {
    const liveRegion = document.getElementById("ui-status");
    const cartCount = document.querySelector("[data-cart-count]");
    const newsletterForm = document.querySelector("[data-newsletter-form]");
    const newsletterFeedback = document.querySelector("[data-newsletter-feedback]");
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
        const label = button.dataset.demoLabel || "Sección demostrativa";
        showToast(`${label}: función no disponible en este prototipo.`);
      });
    });

    document.querySelectorAll("[data-future-trigger]").forEach((button) => {
      button.addEventListener("click", () => {
        showToast("Colección conceptual en desarrollo.");
      });
    });

    document.querySelectorAll("[data-add-to-cart]").forEach((button) => {
      button.addEventListener("click", () => {
        cartItems += 1;
        cartCount.textContent = String(cartItems);
        showToast("Producto agregado al carro demostrativo.");
      });
    });

    document.querySelectorAll("[data-favorite-toggle]").forEach((button) => {
      button.addEventListener("click", () => {
        const isPressed = button.getAttribute("aria-pressed") === "true";
        button.setAttribute("aria-pressed", String(!isPressed));
        button.innerHTML = `<span class="sr-only">${
          isPressed ? "Agregar a favoritos" : "Quitar de favoritos"
        }</span>${isPressed ? "♡" : "♥"}`;
        showToast(isPressed ? "Favorito eliminado." : "Favorito guardado localmente.");
      });
    });

    const cartButton = document.querySelector("[data-cart-button]");

    if (cartButton) {
      cartButton.addEventListener("click", () => {
        showToast("Carro demostrativo: no existe checkout ni pago real.");
      });
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
        newsletterFeedback.textContent =
          "Formulario demostrativo: no se almacenó información.";
        emailInput.value = "";
        showToast("Formulario demostrativo enviado sin almacenar datos.");
      });
    }
  });
})();
