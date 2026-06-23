const { test, expect } = require("@playwright/test");

test("carga la home y muestra la campaña", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Sweet Temptation Set/);
  await expect(page.getByRole("heading", { name: "Sweet Temptation Set", exact: true })).toBeVisible();
  await expect(page.locator(".hero-callout__media")).toBeVisible();

  const campaignImageRatio = await page.locator(".future-collab__hero img").evaluate((image) => {
    const bounds = image.getBoundingClientRect();
    return bounds.width / bounds.height;
  });
  expect(campaignImageRatio).toBeCloseTo(4 / 3, 2);
});

test("abre el menú móvil", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Menú" }).click();
  await expect(page.locator("[data-mobile-drawer]")).toHaveAttribute("data-open", "true");
});

test("avanza el carrusel", async ({ page }) => {
  await page.goto("/");
  const track = page.locator("[data-carousel-track]");
  const initial = await track.getAttribute("style");
  await page.getByRole("button", { name: "Siguiente" }).click();
  await expect(track).not.toHaveAttribute("style", initial || "");
});

test("incrementa el carro", async ({ page }) => {
  await page.goto("/");
  await page.locator("[data-add-to-cart]").first().click();
  await expect(page.locator("[data-cart-count]")).toHaveText("1");
});

test("redirige a la landing de VS x FRUGELÉ", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: /VS x FRUGELÉ/i }).first().click();
  await expect(page).toHaveURL(/frugele\.html$/);
  await expect(page).toHaveTitle(/Sweet Temptation Set/);
  await expect(page.locator("video.collection-hero__video")).toBeVisible();
});

test("inicia el video de campaña sin hacer scroll", async ({ page }) => {
  await page.goto("/frugele.html");
  const video = page.locator("video.collection-hero__video");

  await expect.poll(async () =>
    video.evaluate((element) => !element.paused && element.currentTime > 0)
  ).toBe(true);
});

test("valida y limpia el newsletter", async ({ page }) => {
  await page.goto("/");
  const email = page.locator("#newsletter-email");
  const submit = page.locator("[data-newsletter-form] button[type='submit']");
  const feedback = page.locator("[data-newsletter-feedback]");

  await email.fill("correo-invalido");
  await submit.click();
  await expect(feedback).toContainText("Ingresa un correo con formato válido.");

  await email.fill("demo@ejemplo.com");
  await submit.click();
  await expect(feedback).toContainText("Welcome, Angel. Revisa tu bandeja de entrada.");
  await expect(email).toHaveValue("");
});
