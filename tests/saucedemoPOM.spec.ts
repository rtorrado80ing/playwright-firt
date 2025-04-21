// Importa los módulos necesarios desde Playwright:
// - `test`: Permite definir y ejecutar pruebas.
// - `expect`: Se utiliza para realizar validaciones dentro de las pruebas.
// - Carrito de compras: Se utiliza para almacenar los productos seleccionados por el usuario antes de proceder al pago.
import { test, expect } from '@playwright/test';
import { LoginPage } from './pageobjects/LoginPage';
import { SandboxPage } from './pageobjects/SandboxPage';

// Define una prueba llamada "purchase an item".
test('purchase an item', async ({ page }) => {

    // Navega al sitio web de Sauce Demo.
    await page.goto('https://saucedemo.com');
// Llama a la función de inicio de sesión con credenciales POM.
    const loginPage = new LoginPage(page);
 /*  Se puede llamar uno a uno los métodos de la siguiente manera: 
    await loginPage.fillUsername('standard_user')
    await loginPage.fillPassword('secret_sauce');
    await loginPage.clickOnLogin();*/

// O tambien puedes usar el siguiente método:
    await loginPage.loginWithCredentials('standard_user','secret_sauce')
    await loginPage.checkSuccessfulLogin(); // Verifica que el inicio de sesión fue exitoso.
    
 })
/*
ejecutamos el test por consola configurando la variable de entorno en un CMD
set NODE_ENV=qa
verificamos que la varible si este configurada
echo %NODE_ENV%
npx playwright test test/saucedemoPOM.spec.ts:33 si no funciona con la lina prueba con el nombre
en powershell
$env:NODE_ENV="dev" 
npx playwright test --grep "navigate with varible"
si tienes mas proyectos utiliza el siguiente comando
npx playwright test --project=chromium --grep "navigate with varible" 

*/
 test('navigate with varible ', async ({ page }) => {
    // Navega al sitio web de Sauce Demo.
    if (!process.env.URL) {
        throw new Error('Environment variable URL is not defined');
    }
    await page.goto(process.env.URL);
    await page.pause(); // Pausa la ejecución durante 2 segundos (2000 milisegundos).
    // Llama a la función de inicio de sesión con credenciales POM.
    const loginPage = new LoginPage(page);
    await loginPage.loginWithCredentials('standard_user','secret_sauce')
    await loginPage.checkSuccessfulLogin(); // Verifica que el inicio de sesión fue exitoso.

 })

 

