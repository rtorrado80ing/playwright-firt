// Importa los módulos necesarios de Playwright:
// - `test`: Permite definir pruebas.
// - `expect`: Se utiliza para realizar afirmaciones dentro de las pruebas.
import { test, expect } from '@playwright/test';

// Define una prueba con el nombre 'purchase an item'.
test('purchase an item', async ({ page }) => {

    // Navega a la URL de la página de inicio de sesión de un evento.
    await page.goto('https://original-testing3.admitone.com/secure/events/64a82391e4678570ac214430/attendees');

    // Llena el campo de nombre de usuario con un correo electrónico proporcionado.
    await page.locator('id=okta-signin-username').fill('regression.testing.mrg.1@webonoid.com');

    // Llena el campo de contraseña con la clave proporcionada.
    await page.locator('id=okta-signin-password').fill('Platano2!');

    // Simula un clic en el botón de inicio de sesión.
    await page.locator('id=okta-signin-submit').click();

    // Localiza un elemento específico basado en XPath que contiene un código de referencia.
    // Obtiene diferentes propiedades del elemento y las almacena en variables:
    const text = await page.locator("xpath=//input[@placeholder='Referral Code Unique ID' and @value='merlin']/../../..//h3").innerText(); // Obtiene el texto visible (sin etiquetas ni espacios extra).
    const text2 = await page.locator("xpath=//input[@placeholder='Referral Code Unique ID' and @value='merlin']/../../..//h3").textContent(); // Obtiene el contenido de texto completo, incluidos espacios en blanco.
    const text3 = await page.locator("xpath=//input[@placeholder='Referral Code Unique ID' and @value='merlin']/../../..//h3").innerHTML(); // Obtiene el contenido HTML dentro del elemento.

    // Muestra en la consola las diferentes propiedades obtenidas del elemento.
    console.log('inner text', text); // Muestra solo el texto visible del elemento.
    console.log('text content', text2); // Muestra el contenido completo del texto, incluidos espacios en blanco y líneas nuevas.
    console.log('inner html', text3); // Muestra el contenido HTML del elemento.

});
