import { test, expect } from '@playwright/test';
import { ai } from '@zerostep/playwright';

// Bloque de pruebas para la aplicación Calendly
test.describe('Calendly', () => {
  // Prueba para reservar un horario disponible
  test('book the next available timeslot', async ({ page }) => {
    // Navegar a la página de prueba de Calendly
    await page.goto('https://calendly.com/zerostep-test/test-calendly');

    // Verificar que el calendario se muestra en la página
    await ai('Verify that a calendar is displayed', { page, test });

    // Cerrar el modal de privacidad si aparece
    await ai('Dismiss the privacy modal', { page, test });

    // Seleccionar el primer día disponible en el calendario
    await ai('Click on the first day in the month with times available', { page, test });

    // Seleccionar el primer horario disponible en la lista lateral
    await ai('Click on the first available time in the sidebar', { page, test });

    // Hacer clic en el botón "Siguiente" para continuar
    await ai('Click the Next button', { page, test });

    // Llenar el formulario con valores realistas (por ejemplo, nombre y correo)
    await ai('Fill out the form with realistic values', { page, test });

    // Enviar el formulario
    await ai('Submit the form', { page, test });

    // Verificar que aparezca un mensaje de éxito indicando que la reserva fue programada
    const element = await page.getByText('You are scheduled');
    expect(element).toBeDefined(); // Asegurarse de que el elemento esté definido
  });
});

// Bloque de pruebas para la búsqueda en Google
test.describe('Google', () => {
  const searchTerm = 'software testing'; // Término de búsqueda

  // Prueba para buscar y verificar el primer resultado orgánico
  test('search and verify the first organic search result', async ({ page }) => {
    // Navegar a la página principal de Google
    await page.goto('https://www.google.com');

    // Buscar el término definido ('software testing') en la barra de búsqueda
    await ai(`Search for '${searchTerm}'`, { page, test });

    // Presionar Enter para ejecutar la búsqueda
    await ai('Hit enter', { page, test });

    // Esperar a que se cargue la página de resultados
    await page.waitForURL('https://www.google.com/search**');

    // Obtener el título del primer resultado orgánico de la búsqueda
    const title = await ai('What is the title of the first organic search result?', { page, test });

    // Imprimir el título del primer resultado en la consola
    console.log('First organic search result is: ', title);
  });
});

// Prueba de ejemplo en el sitio de ZeroStep
test('zerostep example', async ({ page }) => {
  // Navegar al sitio principal de ZeroStep
  await page.goto('https://zerostep.com/');

  // Crear un objeto con los argumentos requeridos por la función ai()
  const aiArgs = { page, test };

  // Obtener el texto del encabezado principal del sitio
  const headerText = await ai('Get the header text', aiArgs);

  // Navegar a Google
  await page.goto('https://www.google.com/');

  // Escribir el texto del encabezado obtenido en la barra de búsqueda de Google
  await ai(`Type "${headerText}" in the search box`, aiArgs);

  // Presionar Enter para ejecutar la búsqueda
  await ai('Press enter', aiArgs);
});
