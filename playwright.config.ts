import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 * 
 * Carga el archivo .env según el entorno definido en la variable de entorno NODE_ENV.
 * Por ejemplo:
 * - Si NODE_ENV=qa → se carga `.env.qa`
 * - Si NODE_ENV no está definido → se carga `.env.dev`
 */
dotenv.config({
  path: `.env.${process.env.NODE_ENV || 'dev'}`
});

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  // Directorio donde se ubican los archivos de prueba
  testDir: './tests',

  // Ejecuta pruebas en paralelo si es posible
  fullyParallel: true,

  // Falla si hay un test.only olvidado cuando se ejecuta en CI
  forbidOnly: !!process.env.CI,

  // Reintenta las pruebas fallidas solo si se ejecuta en CI
  retries: process.env.CI ? 2 : 0,

  // Solo usa un worker si se ejecuta en CI
  workers: process.env.CI ? 1 : undefined,

  // Tipo de reporte: HTML (abre con `npx playwright show-report`)
  reporter: 'html',

  /* Configuración compartida para todos los proyectos */
  use: {
    headless: false, // Modo no headless para ver el navegador
    baseURL: process.env.URL, // URL base tomada desde el archivo .env
    trace: 'on-first-retry', // Genera trazas si la prueba falla en el primer intento
    screenshot: 'on', // Toma capturas de pantalla en cada paso
    video: 'on-first-retry', // Graba video si la prueba falla en el primer intento
  },

  /* Configura diferentes proyectos (navegadores/dispositivos) */
  projects: [
    {
      name: 'Computadora',
      testMatch: /.*\.spec\.ts/, // Coincide con archivos que terminan en .spec.ts
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
    {
      name: 'API Tests',
      testMatch: 'APITests/**/*', // Coincide con archivos que terminan en .api.ts
      use: { 
        baseURL: 'https://api.github.com', // URL base para las pruebas de API,
        extraHTTPHeaders: {
          'Accept': 'application/vnd.github.v3+json', // Cabecera de aceptación para la API de GitHub
          //se debe setear el token con export en mac set en windows API_TOKEN='token guardado en github'
          'Authorization': `Bearer ${process.env.API_TOKEN}`, // Token de autenticación para la API de GitHub
        }
      }
    },
    /*
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    Test against mobile viewports.

    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },

    Test against branded browsers.

    {
      name: 'Microsoft Edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
    },
    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },
    */
  ],

  /* Ejecuta un servidor local antes de las pruebas (desactivado por ahora) */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
// https://playwright.dev/docs/test-configuration