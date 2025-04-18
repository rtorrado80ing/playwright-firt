// Importa los módulos necesarios desde Playwright:
// - `test`: Permite definir y ejecutar pruebas.
// - `expect`: Se utiliza para realizar validaciones dentro de las pruebas.
// - Carrito de compras: Se utiliza para almacenar los productos seleccionados por el usuario antes de proceder al pago.
import { test, expect } from '@playwright/test';

// Define una prueba llamada "purchase an item".
test('purchase an item', async ({ page }) => {

    // Navega al sitio web de Sauce Demo.
    await page.goto('https://saucedemo.com');

    // Llena el campo "Username" con el valor 'standard_user'.
    await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');

    // Llena el campo "Password" con el valor 'secret_sauce'.
    await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');

    // Simula un clic en el botón "Login".
    await page.getByRole('button', { name: 'Login' }).click();

    // Obtiene todos los elementos de los productos en el contenedor de inventario.
    const itemsContainer = await page.locator('#inventory_container .inventory_item').all();

    // Genera un índice aleatorio para seleccionar un producto aleatorio del inventario.
    const randomIndex = Math.floor(Math.random() * itemsContainer.length);

    // Obtiene el producto aleatorio utilizando el índice generado.
    const randomItem = itemsContainer[randomIndex];

    // Extrae los detalles del producto seleccionado (descripción, nombre y precio).
    const expectedDescription = await randomItem.locator('.inventory_item_desc').innerText();
    const expectedName = await randomItem.locator('.inventory_item_name').innerText();
    const expectedPrice = await randomItem.locator('.inventory_item_price').innerText();

    // Imprime en consola los detalles del producto seleccionado.
    console.log(`Price: ${expectedPrice} Name: ${expectedName} Description: ${expectedDescription}`);

    // Añade el producto al carrito de compras.
    await randomItem.getByRole('button', { name: 'Add to cart' }).click();

    // Navega al carrito de compras.
    await page.locator('a.shopping_cart_link').click();

    // Verifica que el botón "Checkout" es visible.
    await expect(page.getByRole('button', { name: 'Checkout' })).toBeVisible();

    // Obtiene los detalles del producto en el carrito.
    const actualName = await page.locator('.inventory_item_name').innerText();
    const actualDescription = await page.locator('.inventory_item_desc').innerText();
    const actualPrice = await page.locator('.inventory_item_price').innerText();

    // Valida que los detalles del producto en el carrito coinciden con los seleccionados previamente.
    expect(actualName).toEqual(expectedName);
    expect(actualDescription).toEqual(expectedDescription);
    expect(actualPrice).toEqual(expectedPrice);

    // Inicia el proceso de pago.
    await page.getByRole('button', { name: 'Checkout' }).click();

    // Llena los campos del formulario con información del cliente.
    await page.getByRole('textbox', { name: 'First Name' }).fill('Goku');
    await page.getByRole('textbox', { name: 'Last Name' }).fill('Sayayin');
    await page.getByRole('textbox', { name: 'Zip/Postal Code' }).fill('11000');

    // Verifica que el botón "Continue" es visible y hace clic en él.
    expect(page.getByRole('button', { name: 'Continue' })).toBeVisible();
    await page.getByRole('button', { name: 'Continue' }).click();

    // Finaliza el proceso de compra haciendo clic en "Finish".
    await page.getByRole('button', { name: 'Finish' }).click();

    // Verifica que se muestra el mensaje de agradecimiento por la compra.
    await expect(page.getByRole('heading', { name: 'Thank you for your order!' })).toBeVisible();
});
