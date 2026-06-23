(function () {
  function trapFocus(drawer, event) {
    if (event.key !== "Tab") {
      return;
    }

    const focusable = drawer.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (!focusable.length) {
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    }

    if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    const stickyHeader = document.querySelector("[data-sticky-header]");
    const toggle = document.querySelector("[data-menu-toggle]");
    const drawer = document.querySelector("[data-mobile-drawer]");
    const backdrop = document.querySelector("[data-drawer-backdrop]");
    const closeButton = document.querySelector("[data-drawer-close]");
    let returnFocusTarget = null;

    const syncHeaderState = () => {
      if (!stickyHeader) {
        return;
      }

      stickyHeader.classList.toggle("site-header--condensed", window.scrollY > 24);
    };

    syncHeaderState();
    window.addEventListener("scroll", syncHeaderState, { passive: true });

    if (!toggle || !drawer || !backdrop || !closeButton) {
      return;
    }

    const openDrawer = () => {
      returnFocusTarget = document.activeElement;
      document.body.classList.add("drawer-open");
      drawer.dataset.open = "true";
      drawer.setAttribute("aria-hidden", "false");
      toggle.setAttribute("aria-expanded", "true");
      backdrop.hidden = false;
      closeButton.focus();
    };

    const closeDrawer = () => {
      document.body.classList.remove("drawer-open");
      drawer.dataset.open = "false";
      drawer.setAttribute("aria-hidden", "true");
      toggle.setAttribute("aria-expanded", "false");
      backdrop.hidden = true;

      if (returnFocusTarget instanceof HTMLElement) {
        returnFocusTarget.focus();
      }
    };

    toggle.addEventListener("click", () => {
      if (drawer.dataset.open === "true") {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    closeButton.addEventListener("click", closeDrawer);
    backdrop.addEventListener("click", closeDrawer);
    drawer.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeDrawer();
      }

      trapFocus(drawer, event);
    });

    drawer.querySelectorAll("[data-scroll-target]").forEach((button) => {
      button.addEventListener("click", closeDrawer);
    });
  });
})();
