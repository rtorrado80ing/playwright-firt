// Exporta un objeto por defecto que contiene configuraciones clave para la aplicación.
// Este objeto utiliza variables de entorno para definir valores sensibles como la URL base y el nombre de usuario.

export default {
    // Obtiene la URL desde la variable de entorno `URL`. Si no está definida, asigna una cadena vacía como valor predeterminado.
    URL: process.env.URL ?? '',

    // Obtiene el nombre de usuario desde la variable de entorno `USERNAME`. Si no está definida, asigna una cadena vacía como valor predeterminado.
    USERNAME: process.env.USERNAME ?? '',
};
