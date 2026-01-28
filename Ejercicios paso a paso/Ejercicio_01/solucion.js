/**
 * Ejercicio 1: Sistema de Verificación de Edad para un Cine
 *
 * Este programa verifica si un cliente puede acceder a ver una película
 * según su edad y la clasificación de la película.
 */

// ============================================
// CONSTANTES - Límites de edad por clasificación
// ============================================
// Usamos const porque estos valores NUNCA cambiarán durante la ejecución
const EDAD_MINIMA_7 = 7;
const EDAD_MINIMA_12 = 12;
const EDAD_MINIMA_16 = 16;
const EDAD_MINIMA_18 = 18;

// ============================================
// VARIABLES - Datos del cliente y la película
// ============================================
// Usamos let porque estos valores podrían cambiar (por ejemplo, si el usuario
// selecciona otra película o si procesamos otro cliente)
let edadCliente = 15;
let clasificacionPelicula = "+12"; // Opciones: "TP", "+7", "+12", "+16", "+18"

// ============================================
// LÓGICA DE VERIFICACIÓN
// ============================================
console.log("Verificación de acceso al cine");
console.log("==============================");
console.log("Edad del cliente: " + edadCliente + " años");
console.log("Película seleccionada: clasificación " + clasificacionPelicula);
console.log(""); // Línea en blanco para separar

// Variable para almacenar si el acceso está permitido
let accesoPermitido = false;
let mensajeError = "";

// Verificamos según la clasificación de la película
if (clasificacionPelicula === "TP") {
    // Todos los públicos: cualquier edad puede entrar
    accesoPermitido = true;
} else if (clasificacionPelicula === "+7") {
    // Requiere al menos 7 años
    if (edadCliente >= EDAD_MINIMA_7) {
        accesoPermitido = true;
    } else {
        mensajeError = "La película requiere tener al menos " + EDAD_MINIMA_7 + " años.";
    }
} else if (clasificacionPelicula === "+12") {
    // Requiere al menos 12 años
    if (edadCliente >= EDAD_MINIMA_12) {
        accesoPermitido = true;
    } else {
        mensajeError = "La película requiere tener al menos " + EDAD_MINIMA_12 + " años.";
    }
} else if (clasificacionPelicula === "+16") {
    // Requiere al menos 16 años
    if (edadCliente >= EDAD_MINIMA_16) {
        accesoPermitido = true;
    } else {
        mensajeError = "La película requiere tener al menos " + EDAD_MINIMA_16 + " años.";
    }
} else if (clasificacionPelicula === "+18") {
    // Requiere al menos 18 años
    if (edadCliente >= EDAD_MINIMA_18) {
        accesoPermitido = true;
    } else {
        mensajeError = "La película requiere tener al menos " + EDAD_MINIMA_18 + " años.";
    }
} else {
    // Clasificación no reconocida
    mensajeError = "Clasificación '" + clasificacionPelicula + "' no válida. Las clasificaciones válidas son: TP, +7, +12, +16, +18";
}

// ============================================
// MOSTRAR RESULTADO
// ============================================
if (accesoPermitido) {
    console.log("✓ Acceso permitido. ¡Disfruta de la película!");
} else {
    console.log("✗ Acceso denegado. " + mensajeError);
}

