// Importa los módulos necesarios desde Playwright:
// - `test`: Permite definir las pruebas.
// - `expect`: Se utiliza para realizar validaciones.
import { test, expect } from '@playwright/test';

// Prueba principal: Realiza el inicio de sesión en el sitio y lista los productos disponibles.
test('purchase an item', async ({ page }) => {
  // Navega al sitio web de Sauce Demo.
  await page.goto('https://www.saucedemo.com/');

  // Llena el campo de nombre de usuario con "standard_user".
  await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');

  // Llena el campo de contraseña con "secret_sauce".
  await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');

  // Simula un clic en el botón "Login".
  await page.getByRole('button', { name: 'Login' }).click();

  // Obtiene todos los elementos de productos en el contenedor de inventario.
  const itemsContainer = await page.locator('#inventory_container .inventory_item').all();

  // Itera sobre los elementos encontrados e imprime el texto interno de cada uno.
  for (let item of itemsContainer) {
    console.log(await item.innerText()); // Imprime en consola la información de cada producto.
  }

  // (Código comentado) Ejemplo para validar el título de la página.
  // Podría agregarse para verificar que la página se cargó correctamente después del inicio de sesión.
  // await expect(page).toHaveTitle(/Playwright/);
});
