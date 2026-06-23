const { test, expect } = require("@playwright/test");

test("carga la home con aviso académico", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Concepto académico/);
  await expect(page.locator("text=Proyecto académico — colaboración conceptual no oficial").first()).toBeVisible();
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

test("incrementa el carro demostrativo", async ({ page }) => {
  await page.goto("/");
  await page.locator("[data-add-to-cart]").first().click();
  await expect(page.locator("[data-cart-count]")).toHaveText("1");
});

test("muestra el aviso de VS x FRUGELÉ", async ({ page }) => {
  await page.goto("/");
  await page.locator("[data-future-trigger]").first().click();
  await expect(page.locator("[data-toast]")).toContainText("Colección conceptual en desarrollo");
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
  await expect(feedback).toContainText("Formulario demostrativo: no se almacenó información.");
  await expect(email).toHaveValue("");
});
