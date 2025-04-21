// Importa los módulos necesarios desde Playwright:
// - `test`: Permite definir las pruebas.
// - `expect`: Se utiliza para realizar validaciones.
import { test, expect } from '@playwright/test';

// Prueba principal: Realiza el inicio de sesión en el sitio y lista los productos disponibles.
test('purchase an item', async ({ page }, testInfo) => {
  // Navega al sitio web de Sauce Demo.
  await page.goto('https://www.saucedemo.com/');

  // Llena el campo de nombre de usuario con "standard_user".
  await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');

  // Llena el campo de contraseña con "secret_sauce".
  await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');

  await page.screenshot({ path: 'capturas/login.png' }); // Toma una captura de pantalla de la página actual y la guarda como "login.png".

  // Simula un clic en el botón "Login".
  await page.getByRole('button', { name: 'Login' }).click();

    // Espera 2 segundos antes de continuar (esto es opcional y puede eliminarse si no es necesario).
    await page.waitForTimeout(2000); // Espera 2 segundos (2000 milisegundos).
    await page.screenshot({ path: 'capturas/inventario.png', fullPage: true }); // Toma una captura de pantalla de la página actual y la guarda como "inventario.png".

//La mejor forma es configurar desde el archivo de configuracion playwright.config.ts linea 44

  // Obtiene todos los elementos de productos en el contenedor de inventario.
  const itemsContainer = await page.locator('#inventory_container .inventory_item').all();

  const randomIndex = Math.floor(Math.random() * itemsContainer.length); // Genera un índice aleatorio para seleccionar un producto.
  const randomItem = itemsContainer[randomIndex]; // Selecciona un producto aleatorio del inventario.

  const expectedName = await randomItem.locator('.inventory_item_name').innerText(); // Obtiene el nombre del producto seleccionado.
  const expectedDescription = await randomItem.locator('.inventory_item_desc').innerText(); // Obtiene la descripción del producto seleccionado.
  const expectedPrice = await randomItem.locator('.inventory_item_price').innerText(); // Obtiene el precio del producto seleccionado.


  console.log(`Price: ${expectedPrice} Name: ${expectedName} Description: ${expectedDescription}`) // Imprime el precio del producto seleccionado en la consola.

  // Itera sobre los elementos encontrados e imprime el texto interno de cada uno.
  for (let item of itemsContainer) {
    console.log(await item.innerText()); // Imprime en consola la información de cada producto.
  }

  await testInfo.attach('items', {
    body: await page.screenshot(), // Toma una captura de pantalla de la página actual y la guarda como "items.png".  
    contentType: 'image/png', // Tipo de contenido de la captura de pantalla.
  })


    await page.waitForTimeout(2000); // Espera 2 segundos (2000 milisegundos).
  // (Código comentado) Ejemplo para validar el título de la página.
  // Podría agregarse para verificar que la página se cargó correctamente después del inicio de sesión.
  // await expect(page).toHaveTitle(/Playwright/);
});
