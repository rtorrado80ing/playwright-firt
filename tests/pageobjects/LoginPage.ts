// Importa las clases y tipos necesarios desde Playwright:
// - Locator: Representa un localizador que puede interactuar con elementos en la página.
// - Page: Representa una página del navegador donde se realizarán las interacciones.
// - expect: Se utiliza para hacer afirmaciones en pruebas.
import { Locator, Page, expect } from "@playwright/test";

// Define la clase LoginPage que encapsula todas las acciones e interacciones posibles en la página de inicio de sesión.
export class LoginPage {

    // Declaración de variables privadas que representan elementos en la página.
    private readonly usernameTextbox: Locator; // Localiza el campo de texto del nombre de usuario.
    private readonly passwordTextbox: Locator; // Localiza el campo de texto de la contraseña.
    private readonly loginButton: Locator; // Localiza el botón de inicio de sesión.
    private readonly shoppingCartIcon: Locator; // Localiza el ícono del carrito de compras (se utiliza para validar un inicio de sesión exitoso).

    // Constructor: Inicializa los elementos de la página utilizando los localizadores de Playwright.
    constructor(page: Page) {
        // Localiza el campo de texto del nombre de usuario usando un rol ARIA y el atributo "name".
        this.usernameTextbox = page.getByRole('textbox', { name: 'Username' });
        // Localiza el campo de texto de la contraseña usando un rol ARIA y el atributo "name".
        this.passwordTextbox = page.getByRole('textbox', { name: 'Password' });
        // Localiza el botón de inicio de sesión usando un rol ARIA y el atributo "name".
        this.loginButton = page.getByRole('button', { name: 'Login' });
        // Localiza el ícono del carrito de compras utilizando una expresión XPath.
        this.shoppingCartIcon = page.locator("xpath=//a[contains(@class, 'shopping_cart_link')]");
    }

    // Método para llenar el campo de nombre de usuario.
    async fillUsername(username: string) {
        await this.usernameTextbox.fill(username); // Escribe el texto proporcionado en el campo de nombre de usuario.
    }

    // Método para llenar el campo de contraseña.
    async fillPassword(password: string) {
        await this.passwordTextbox.fill(password); // Escribe el texto proporcionado en el campo de contraseña.
    }

    // Método para hacer clic en el botón de inicio de sesión.
    async clickOnLogin() {
        await this.loginButton.click(); // Simula un clic en el botón de inicio de sesión.
    }

    // Método compuesto que permite realizar el inicio de sesión con credenciales.
    async loginWithCredentials(username: string, password: string) {
        // Llama a los métodos para llenar los campos de nombre de usuario y contraseña, y luego hace clic en el botón de inicio de sesión.
        await this.fillUsername(username);
        await this.fillPassword(password);
        await this.clickOnLogin();
    }

    // Método para verificar que el inicio de sesión fue exitoso comprobando la visibilidad del ícono del carrito de compras.
    async checkSuccessfulLogin() {
        await expect(this.shoppingCartIcon).toBeVisible(); // Verifica que el ícono del carrito de compras está visible.
    }
}
