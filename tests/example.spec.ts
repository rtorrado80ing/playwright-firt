// Importa los módulos necesarios desde Playwright:
// - `test`: Permite definir las pruebas.
// - `expect`: Se utiliza para realizar validaciones.
import { test, expect } from '@playwright/test';

// Primera prueba: Verifica que el título de la página contiene "Playwright".
test('has title', async ({ page }) => {
  // Navega al sitio oficial de Playwright.
  await page.goto('https://playwright.dev/');

  // Valida que el título de la página contiene la palabra "Playwright".
  await expect(page).toHaveTitle(/Playwright/);
});

// Segunda prueba: Interactúa con un enlace y valida un encabezado.
test('get started link', async ({ page }) => {
  // Navega al sitio oficial de Playwright.
  await page.goto('https://playwright.dev/');

  // Haz clic en el enlace "Get started".
  await page.getByRole('link', { name: 'Get started' }).click();

  // Valida que se muestra un encabezado con el texto "Installation".
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

// Tercera prueba: Realiza una búsqueda en Mercado Libre y obtiene títulos de resultados.
test('test 3', async ({ page }) => {
  // Navega al sitio de Mercado Libre Colombia.
  await page.goto('https://www.mercadolibre.com.co');

  // Llena el campo de búsqueda con el texto "Iphone".
  await page.locator('input[id=\'cb1-edit\']').fill('Iphone');

  // Simula la pulsación de la tecla Enter para realizar la búsqueda.
  await page.keyboard.press('Enter');

  // Valida que los resultados de búsqueda son visibles.
  await expect(page.locator('//ol[contains(@class, \'ui-search-layout\')]')).toBeVisible();

  // Pausa la ejecución para depuración (útil para inspeccionar manualmente el estado de la página).
  await page.pause();

  // Obtiene todos los títulos de los productos en los resultados de búsqueda.
  const titles = await page.locator('//ol[@class="ui-search-layout ui-search-layout--stack shops__layout"]//li//h2').allInnerTexts();

  // Imprime el número total de resultados en la consola.
  console.log('the total number of results is:', titles.length);

  // Itera sobre los títulos y los imprime en la consola.
  for (let title of titles) {
    console.log('the title is:', title);
  }
});
