// Importa los módulos necesarios desde Playwright:
// - `test`: Permite definir las pruebas.
// - `expect`: Se utiliza para realizar validaciones.
import { test, expect } from '@playwright/test';

// Prueba principal: Realiza el inicio de sesión, selecciona un producto aleatorio y valida el flujo de compra.
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

  // Selecciona un producto aleatorio del inventario.
  const randomIndex = Math.floor(Math.random() * itemsContainer.length);
  const randomItem = itemsContainer[randomIndex];

  // Obtiene los detalles del producto seleccionado.
  const expectedName = await randomItem.locator('.inventory_item_name').innerText();
  const expectedPrice = await randomItem.locator('.inventory_item_price').innerText();
  const expectedDescription = await randomItem.locator('.inventory_item_desc').innerText();

  // Imprime los detalles del producto aleatorio seleccionado en la consola.
  console.log('Random item is: ', await randomItem.innerText());
  console.log('Random item price: ', expectedPrice);
  console.log('Random item name: ', expectedName);
  console.log('Random item description: ', expectedDescription);

  // Añade el producto seleccionado al carrito.
  await randomItem.getByRole('button', { name: 'Add to cart' }).click();

  // Navega al carrito de compras.
  await page.locator('#shopping_cart_container a').click();

  // Obtiene los detalles del producto en el carrito.
  const actualName = await page.locator('.cart_item_label .inventory_item_name').innerText();
  const actualDescription = await page.locator('.cart_item_label .inventory_item_desc').innerText();
  const actualPrice = await page.locator('.cart_item_label .inventory_item_price').innerText();

  // Valida que los detalles del producto en el carrito coincidan con los seleccionados previamente.
  expect(actualName).toEqual(expectedName);
  expect(actualDescription).toEqual(expectedDescription);
  expect(actualPrice).toEqual(expectedPrice);

  // Inicia el proceso de pago.
  await page.getByRole('button', { name: 'Checkout' }).click();

  // Continúa al siguiente paso en el proceso de pago.
  await page.getByRole('button', { name: 'Continue' }).click();

  // Pausa la ejecución para depuración (útil durante el desarrollo).
  await page.pause();

  // Ejemplo comentado para validar el título de la página.
  // Esto podría usarse para verificar que la página se cargó correctamente.
  // await expect(page).toHaveTitle(/Playwright/);
});
