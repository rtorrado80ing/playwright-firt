import { Locator, Page, expect } from "@playwright/test";

// Define la clase LoginPage que encapsula todas las acciones e interacciones posibles en la página de inicio de sesión.
export class SandboxPage {
    // Declaración de variables privadas que representan elementos en la página.
    private readonly pastaCheckbox: Locator; // Localiza el checkbox de Pasta.

    // Constructor: Inicializa los elementos de la página utilizando los localizadores de Playwright.
    constructor(page: Page) {
        this.pastaCheckbox = page.getByLabel('Pasta 🍝'); // Localiza el checkbox de Pasta usando su etiqueta.
    }

    // Método para seleccionar el checkbox de Pasta.
    async checkPasta() {
        await this.pastaCheckbox.check(); // Marca el checkbox de Pasta.
    }
}
    // Método para deseleccionar el checkbox de Pasta.  