(function () {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function getPerView() {
    if (window.innerWidth < 768) {
      return 1;
    }

    if (window.innerWidth < 1280) {
      return 2;
    }

    if (window.innerWidth < 1600) {
      return 3;
    }

    return 4;
  }

  function setupCarousel(carousel) {
    const track = carousel.querySelector("[data-carousel-track]");
    const slides = Array.from(track.querySelectorAll("[data-carousel-slide]"));
    const dotsHost = carousel.querySelector("[data-carousel-dots]");
    const prevButton = carousel.closest(".product-carousel").querySelector("[data-carousel-prev]");
    const nextButton = carousel.closest(".product-carousel").querySelector("[data-carousel-next]");
    const shouldAutoplay = carousel.dataset.autoplay === "true" && !reducedMotion;
    const autoplayInterval = Number(carousel.dataset.autoplayInterval || 5000);
    let index = 0;
    let perView = getPerView();
    let maxIndex = Math.max(0, slides.length - perView);
    let autoplayId = null;
    let startX = 0;
    let deltaX = 0;
    let isDragging = false;

    const buildDots = () => {
      const pages = Math.max(1, maxIndex + 1);
      dotsHost.innerHTML = "";

      for (let i = 0; i < pages; i += 1) {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "carousel-dot";
        dot.setAttribute("aria-label", `Ir al slide ${i + 1}`);
        dot.dataset.index = String(i);
        dotsHost.appendChild(dot);
      }
    };

    const setWidths = () => {
      perView = getPerView();
      maxIndex = Math.max(0, slides.length - perView);

      slides.forEach((slide) => {
        slide.style.flexBasis =
          perView === 1
            ? "100%"
            : `calc((100% - ${perView - 1}rem) / ${perView})`;
      });

      if (index > maxIndex) {
        index = maxIndex;
      }

      buildDots();
      update();
    };

    const update = () => {
      const slideWidth = slides[0].getBoundingClientRect().width;
      const gap = 16;
      track.style.transform = `translateX(-${index * (slideWidth + gap)}px)`;

      Array.from(dotsHost.children).forEach((dot, dotIndex) => {
        dot.setAttribute("aria-current", String(dotIndex === index));
      });

      prevButton.disabled = index === 0;
      nextButton.disabled = index === maxIndex;
    };

    const goTo = (nextIndex, pauseAutoplay) => {
      index = Math.max(0, Math.min(maxIndex, nextIndex));
      update();

      if (pauseAutoplay) {
        stopAutoplay();
      }
    };

    const startAutoplay = () => {
      if (!shouldAutoplay || maxIndex === 0) {
        return;
      }

      stopAutoplay();
      autoplayId = window.setInterval(() => {
        index = index >= maxIndex ? 0 : index + 1;
        update();
      }, autoplayInterval);
    };

    const stopAutoplay = () => {
      if (autoplayId) {
        window.clearInterval(autoplayId);
        autoplayId = null;
      }
    };

    prevButton.addEventListener("click", () => goTo(index - 1, true));
    nextButton.addEventListener("click", () => goTo(index + 1, true));

    dotsHost.addEventListener("click", (event) => {
      const dot = event.target.closest(".carousel-dot");

      if (!dot) {
        return;
      }

      goTo(Number(dot.dataset.index), true);
    });

    carousel.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        goTo(index - 1, true);
      }

      if (event.key === "ArrowRight") {
        goTo(index + 1, true);
      }
    });

    const handlePointerDown = (clientX) => {
      isDragging = true;
      startX = clientX;
      deltaX = 0;
      stopAutoplay();
    };

    const handlePointerMove = (clientX) => {
      if (!isDragging) {
        return;
      }

      deltaX = clientX - startX;
    };

    const handlePointerUp = () => {
      if (!isDragging) {
        return;
      }

      if (Math.abs(deltaX) > 40) {
        goTo(index + (deltaX < 0 ? 1 : -1), true);
      } else {
        update();
      }

      isDragging = false;
    };

    track.addEventListener("mousedown", (event) => handlePointerDown(event.clientX));
    window.addEventListener("mousemove", (event) => handlePointerMove(event.clientX));
    window.addEventListener("mouseup", handlePointerUp);
    track.addEventListener("touchstart", (event) => handlePointerDown(event.touches[0].clientX), { passive: true });
    track.addEventListener("touchmove", (event) => handlePointerMove(event.touches[0].clientX), { passive: true });
    track.addEventListener("touchend", handlePointerUp);
    carousel.addEventListener("mouseenter", stopAutoplay);
    carousel.addEventListener("mouseleave", startAutoplay);
    carousel.addEventListener("focusin", stopAutoplay);
    carousel.addEventListener("focusout", startAutoplay);
    window.addEventListener("resize", setWidths);

    setWidths();
    startAutoplay();
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-carousel]").forEach(setupCarousel);
  });
})();
