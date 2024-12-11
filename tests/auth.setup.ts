// Importa los módulos necesarios desde Playwright:
// - `test as setup`: Renombra `test` a `setup` para indicar que esta prueba se usa para configuraciones.
// - `expect`: Para realizar validaciones en la prueba.
// - `LoginPage`: Importa la clase de la página de inicio de sesión que sigue el patrón Page Object Model.
import { test as setup, expect } from "@playwright/test";
import { LoginPage } from './pageobjects/LoginPage';

// Define la ruta donde se almacenará el estado de autenticación de Playwright.
const authFile = "playwright/.auth/user.json";

// Configura una prueba llamada "authenticate" que se encargará de realizar la autenticación.
setup("authenticate", async ({ page }) => {
    // Navega al sitio web que se desea probar (en este caso, Sauce Demo).
    await page.goto('https://saucedemo.com');

    // Crea una instancia de la clase LoginPage, pasando la página actual como argumento.
    const login = new LoginPage(page);

    // Realiza el inicio de sesión con credenciales predeterminadas.
    await login.loginWithCredentials('standard_user', 'secret_sauce');

    // Verifica que el inicio de sesión haya sido exitoso.
    await login.checkSuccessfulLogin();

    // Guarda el estado actual de la sesión en un archivo JSON.
    // Este archivo se puede reutilizar en otras pruebas para evitar repetir el inicio de sesión.
    await page.context().storageState({ path: authFile });
});
