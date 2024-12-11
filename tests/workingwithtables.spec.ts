// Importa los módulos necesarios desde Playwright:
// - `test`: Permite definir y ejecutar pruebas.
// - `expect`: Se utiliza para realizar validaciones.
import { test, expect } from '@playwright/test';

// Define una prueba para interactuar y procesar una tabla web.
test('test web table', async ({ page }) => {

    // Navega al sitio web con la tabla de práctica.
    await page.goto('https://cosmocode.io/automation-practice-webtable/');

    // Localiza el contenedor de la tabla identificada por el ID 'countries'.
    const tableContainer = await page.locator("xpath=//table[@id='countries']");

    // Obtiene todas las filas de la tabla.
    const rows = await tableContainer.locator("xpath=.//tr").all();

    // Define un arreglo para almacenar la información de los países.
    const countries: Country[] = [];

    // Imprime la cantidad total de filas en la tabla.
    console.log(rows.length);

    // Itera sobre cada fila de la tabla.
    for (let row of rows) {
        // Crea un objeto `Country` para almacenar la información de cada fila.
        let country: Country = {
            name: await row.locator('xpath=.//td[2]').innerText(), // Nombre del país.
            capital: await row.locator('xpath=.//td[3]').innerText(), // Capital.
            currency: await row.locator('xpath=.//td[4]').innerText(), // Moneda.
            primaryLanguage: await row.locator('xpath=.//td[5]').innerText(), // Idioma principal.
        };

        // Añade el objeto `Country` al arreglo.
        countries.push(country);
    }

    // Código comentado: Imprime todos los países y su información.
    /*
    for (let country of countries) {
        console.log(country);
    }
    */

    // Filtra los países donde se habla portugués.
    const countryWherePeopleSpeakPortuguese = countries
        .filter(country => country.primaryLanguage === 'Portuguese');

    // Imprime los países donde el idioma principal es portugués.
    console.log('Countries where people speak Portuguese:', countryWherePeopleSpeakPortuguese);
});

// Define una interfaz para representar la estructura de un país.
interface Country {
    name: string; // Nombre del país.
    capital: string; // Capital del país.
    currency: string; // Moneda del país.
    primaryLanguage: string; // Idioma principal del país.
}

/*
Notas adicionales sobre los elementos en la tabla:

- Contenedor de la tabla: //table[@id='countries']
- Localización de las filas: .//tr

Ejemplo de localización por fila y columna:
- Check (primera columna): //table[@id='countries']//tr[2]//td[1]
- Country (segunda columna): //table[@id='countries']//tr[2]//td[2]
- Capital (tercera columna): //table[@id='countries']//tr[2]//td[3]
- Currency (cuarta columna): //table[@id='countries']//tr[2]//td[4]
- Primary Language (quinta columna): //table[@id='countries']//tr[2]//td[5]
*/
