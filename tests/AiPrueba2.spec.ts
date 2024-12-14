import { test, expect } from '@playwright/test';
import { ai } from '@zerostep/playwright';


test.describe('freerangetesters', () => {

  // Prueba para buscar y verificar el primer resultado orgánico
  test('Verificar el resultado', async ({ page }) => {
    // Navegar a la página principal de Google
    await page.goto('https://www.freerangetesters.com');
    await ai(`Expande los productos del plan Acaademia para ver los 11 productos`, {page, test})
    //Alt + 96
    await ai(`Y selecciona Unit Testing con Python haviendo click`, {page, test})
  })
});
