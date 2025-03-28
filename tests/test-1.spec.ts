// Importa las funciones necesarias desde Playwright:
// - `test`: Permite definir y ejecutar pruebas.
// - `expect`: Se utiliza para realizar validaciones en las pruebas.
import { test, expect } from '@playwright/test';

// Primera prueba: Realiza una búsqueda en Mercado Libre Colombia.
test('test', async ({ page }) => {
  // Navega a la página principal de Mercado Libre.
  await page.goto('https://www.mercadolibre.com/');

  // Selecciona la región "Colombia".
  await page.getByRole('link', { name: 'Colombia' }).click();

  // Llena el campo de búsqueda con un término de búsqueda incorrecto ("ihpne").
  //await page.locator('').fill('');
  await page.getByPlaceholder('Buscar productos, marcas y más…').fill('ihpne');

  // Simula la pulsación de la tecla "Enter" para iniciar la búsqueda.
  //await page.keyboard.press('Enter');
  await page.getByPlaceholder('Buscar productos, marcas y más…').press('Enter');

  //Esperar un elemento
  //await expect(page.locator('')).toBeVisible();
  //await page.pause();

  // Código comentado: Podría usarse para seleccionar un producto específico y validar el encabezado.
  // await page.getByRole('link', { name: 'Apple iPhone 13 (128 GB) - Azul medianoche' }).first().click();
  // await page.getByRole('heading', { name: '¡Hola! Para comprar, ingresa a tu cuenta' }).click();
});

// Segunda prueba: Navega a Facebook y selecciona una región.
test('test 2', async ({ page }) => {
  // Navega a la página principal de Facebook.
  await page.goto('https://www.facebook.com/');

  // Selecciona la región "Colombia".
  await page.getByRole('link', { name: 'Colombia' }).click();
});

// Tercera prueba: Interactúa con un campo de entrada en un sitio local.
test('test locators', async ({ page }) => {
  // Navega a un archivo HTML local.
  await page.goto('http://127.0.0.1:5500/index.html');

  // Pausa la ejecución para inspección manual.
  await page.pause();

  // Llena un campo de entrada con la clase "form" con el texto "algo".
  await page.locator('input[class="form"]').fill('algo');

  // Pausa la ejecución nuevamente para inspección manual.
  await page.pause();
});

// Cuarta prueba: Interactúa con un enlace de inicio de sesión en Mercado Libre Colombia.
test('test locators 2', async ({ page }) => {
  // Navega a la página principal de Mercado Libre Colombia.
  await page.goto('https://www.mercadolibre.com.co');

  // Código comentado: Podría usarse para navegar a la sección "Mis compras".
  // await page.getByRole('link', { name: 'Mis compras' }).click();

  // Haz clic en el enlace de inicio de sesión que coincide exactamente con el texto "Ingresa".
  await page.getByRole('link', { name: 'Ingresa', exact: true }).click();

  // Pausa la ejecución para inspección manual.
  await page.pause();
});
