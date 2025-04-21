// Este archivo contiene pruebas de API usando Playwright para interactuar con la API de GitHub.
// Las pruebas cubren la creación y validación de issues en un repositorio específico.
// También se implementa lógica de limpieza automática para evitar duplicaciones o acumulación de datos.

// ⚠️ Para ejecutar estas pruebas:
// 1. Crear un token personal de GitHub con permisos de escritura en issues (scope: `repo` o fine-grained con permisos sobre el repo).
// 2. Asignar el token a la variable de entorno API_TOKEN:
//    - En PowerShell: $env:API_TOKEN="ghp_tu_token"
//    - En CMD: set API_TOKEN=ghp_tu_token
// 3. Ejecutar el test con el siguiente comando:
//    npx playwright test tests/APITests/APITests.spec.ts --project="API Tests" --headed --trace on

import { test, expect } from '@playwright/test';

// Repositorio y usuario donde se crearán los issues
const REPO = 'playwright-firt';
const USER = 'rtorrado80ing';

/**
 * Elimina (cierra) un issue existente que coincida por título
 * para evitar duplicados antes de ejecutar cada prueba.
 */
async function deleteIssueByTitle(request, title: string) {
  const issuesResponse = await request.get(`/repos/${USER}/${REPO}/issues`);
  if (!issuesResponse.ok()) return;

  const issues = await issuesResponse.json();
  const targetIssue = issues.find((issue) => issue.title === title);

  if (targetIssue) {
    const closeResponse = await request.patch(`/repos/${USER}/${REPO}/issues/${targetIssue.number}`, {
      data: {
        state: 'closed',
      },
    });

    if (closeResponse.ok()) {
      console.log(`🧹 Issue cerrado: #${targetIssue.number} - ${title}`);
    } else {
      console.warn(`⚠️ No se pudo cerrar el issue #${targetIssue.number}:`, await closeResponse.text());
    }
  }
}

// Variable global para guardar el número del último issue creado
let lastCreatedIssueNumber: number | null = null;

/**
 * beforeEach:
 * Antes de cada prueba, busca y cierra un issue existente con el mismo título
 * para evitar errores por duplicados.
 */
test.beforeEach(async ({ request }, testInfo) => {
  const title = testInfo.title.includes('bug')
    ? '[Bug] Explotó todo'
    : '[Feature] Quiero que haga helados';

  await deleteIssueByTitle(request, title);
});

/**
 * afterEach:
 * Después de cada prueba, cierra el issue recién creado (limpieza).
 */
test.afterEach(async ({ request }) => {
  if (lastCreatedIssueNumber) {
    await request.patch(`/repos/${USER}/${REPO}/issues/${lastCreatedIssueNumber}`, {
      data: {
        state: 'closed',
      },
    });
    console.log(`🧽 Issue cerrado automáticamente: #${lastCreatedIssueNumber}`);
    lastCreatedIssueNumber = null;
  }
});

/**
 * Test 1: Validar que se puede crear un issue tipo "bug"
 * y que el contenido del issue es el esperado.
 */
test('Puedo crear un bug en el repo', async ({ request }) => {
  const newIssue = await request.post(`/repos/${USER}/${REPO}/issues`, {
    data: {
      title: '[Bug] Explotó todo',
      body: 'Estamos perdidirijillos!',
    },
  });

  if (!newIssue.ok()) {
    console.error('❌ Error al crear el bug:');
    console.error('Status:', newIssue.status());
    console.error('Body:', await newIssue.text());
  }

  expect(newIssue.status()).toBe(201);

  const createdIssue = await newIssue.json();
  lastCreatedIssueNumber = createdIssue.number;

  expect(createdIssue.title).toBe('[Bug] Explotó todo');
  expect(createdIssue.body).toBe('Estamos perdidirijillos!');
});

/**
 * Test 2: Validar que se puede crear un issue tipo "feature request"
 * y que el contenido del issue es el esperado.
 */
test('Puedo crear un feature request', async ({ request }) => {
  const newIssue = await request.post(`/repos/${USER}/${REPO}/issues`, {
    data: {
      title: '[Feature] Quiero que haga helados',
      body: 'Estaría buenísimo que el repo haga helados 🍦',
    },
  });

  if (!newIssue.ok()) {
    console.error('❌ Error al crear el feature request:');
    console.error('Status:', newIssue.status());
    console.error('Body:', await newIssue.text());
  }

  expect(newIssue.status()).toBe(201);

  const createdIssue = await newIssue.json();
  lastCreatedIssueNumber = createdIssue.number;

  expect(createdIssue.title).toBe('[Feature] Quiero que haga helados');
  expect(createdIssue.body).toBe('Estaría buenísimo que el repo haga helados 🍦');
});
