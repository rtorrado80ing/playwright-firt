// Importa los módulos necesarios desde Playwright:
// - `test` y `expect`: Permiten definir pruebas y realizar validaciones.
// - `LoginPage`: Clase que encapsula las interacciones con la página de inicio de sesión.
// - `dataConfig`: Archivo de configuración que contiene valores como la URL base.
import { test, expect } from '@playwright/test'
import { LoginPage } from './pageobjects/LoginPage';
import dataConfig from './util/data.config';

// Prueba principal: realiza una compra aleatoria de un artículo.
test('purchase an item', async ({ page }) => {

    // Navega al sitio web de Sauce Demo.
    await page.goto('https://saucedemo.com');

    // Realiza el inicio de sesión usando la clase LoginPage.
    const login = new LoginPage(page);
    await login.loginWithCredentials('standard_user', 'secret_sauce');
    await login.checkSuccessfulLogin();

    // Localiza todos los elementos en el contenedor de inventario.
    const itemsContainer = await page.locator('#inventory_container .inventory_item').all();

    // Selecciona un artículo aleatorio del inventario.
    const randomIndex = Math.floor(Math.random() * itemsContainer.length);
    const randomItem = itemsContainer[randomIndex];

    // Extrae los detalles del artículo seleccionado.
    const expectedDescription = await randomItem.locator('.inventory_item_desc').innerText();
    const expectedName = await randomItem.locator('.inventory_item_name').innerText();
    const expectedPrice = await randomItem.locator('.inventory_item_price').innerText();

    // Imprime los detalles del artículo en la consola.
    console.log(`Price: ${expectedPrice} Name: ${expectedName} Description: ${expectedDescription}`);

    // Añade el artículo al carrito.
    await randomItem.getByRole('button', { name: 'Add to cart' }).click();

    // Navega al carrito de compras.
    await page.locator('a.shopping_cart_link').click();

    // Verifica que el botón de checkout es visible.
    await expect(page.getByRole('button', { name: 'Checkout' })).toBeVisible();

    // Obtiene los detalles del artículo en el carrito para validación.
    const actualName = await page.locator('.inventory_item_name').innerText();
    const actualDescription = await page.locator('.inventory_item_desc').innerText();
    const actualPrice = await page.locator('.inventory_item_price').innerText();

    // Compara los detalles esperados y actuales.
    expect(actualName).toEqual(expectedName);
    expect(actualDescription).toEqual(expectedDescription);
    expect(actualPrice).toEqual(expectedPrice);

    // Realiza el proceso de pago.
    await page.getByRole('button', { name: 'Checkout' }).click();

    // Llena los datos del cliente.
    await page.getByRole('textbox', { name: 'First Name' }).fill('Goku');
    await page.getByRole('textbox', { name: 'Last Name' }).fill('Sayayin');
    await page.getByRole('textbox', { name: 'Zip/Postal Code' }).fill('11000');

    // Verifica y continúa con el pago.
    expect(page.getByRole('button', { name: 'Continue' })).toBeVisible();
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByRole('button', { name: 'Finish' }).click();

    // Verifica que se muestre el mensaje de confirmación.
    await expect(page.getByRole('heading', { name: 'Thank you for your order!' })).toBeVisible();

});

// Prueba que realiza un inicio de sesión y verifica el éxito.
test('purchase an item 1', async ({ page }) => {

    // Navega al sitio web.
    await page.goto('https://saucedemo.com');

    // Realiza el inicio de sesión usando la clase LoginPage.
    const login = new LoginPage(page);
    await login.loginWithCredentials('standard_user', 'secret_sauce');
    await login.checkSuccessfulLogin();

});

// Prueba que realiza un inicio de sesión sin usar la clase LoginPage.
test('purchase an item 2', async ({ page }) => {

    // Navega al sitio web.
    await page.goto('https://saucedemo.com');

    // Llena los campos de usuario y contraseña manualmente.
    await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
    await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

});

// Prueba para navegar a una URL configurada en dataConfig.
test('navigate', async ({ page }) => {

    // Navega a la URL especificada en el archivo de configuración.
    await page.goto(dataConfig.URL);

    // Código comentado para interacciones adicionales.
    /* await page.getByRole('textbox', {name:'Username'}).fill('standard_user');
    await page.getByRole('textbox', {name:'Password'}).fill('secret_sauce');
    await page.getByRole('button', {name:'Login'}).click(); */

});
