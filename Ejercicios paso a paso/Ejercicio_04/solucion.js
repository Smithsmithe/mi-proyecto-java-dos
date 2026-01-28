/**
 * Ejercicio 4: Simulador de Cajero Automático
 *
 * Este programa simula un cajero automático usando while para el bucle
 * principal y switch para gestionar las opciones del menú.
 */

// ============================================
// CONSTANTES
// ============================================
const SALDO_INICIAL = 1000;
const OPCION_CONSULTAR = 1;
const OPCION_INGRESAR = 2;
const OPCION_RETIRAR = 3;
const OPCION_SALIR = 4;

// ============================================
// FUNCIONES
// ============================================

/**
 * Muestra el saldo actual de la cuenta
 * @param {number} saldo - El saldo actual
 */
function consultarSaldo(saldo) {
    console.log("💰 Su saldo actual es: " + saldo.toFixed(2) + " €");
}

/**
 * Ingresa dinero en la cuenta
 * @param {number} saldo - El saldo actual
 * @param {number} cantidad - La cantidad a ingresar
 * @returns {number} El nuevo saldo
 */
function ingresarDinero(saldo, cantidad) {
    if (cantidad <= 0) {
        console.log("❌ La cantidad a ingresar debe ser positiva.");
        return saldo;
    }

    const nuevoSaldo = saldo + cantidad;
    console.log("📥 Ingreso de " + cantidad.toFixed(2) + " € realizado correctamente.");
    return nuevoSaldo;
}

/**
 * Retira dinero de la cuenta si hay fondos suficientes
 * @param {number} saldo - El saldo actual
 * @param {number} cantidad - La cantidad a retirar
 * @returns {number} El nuevo saldo (o el mismo si no hay fondos)
 */
const retirarDinero = (saldo, cantidad) => {
    if (cantidad <= 0) {
        console.log("❌ La cantidad a retirar debe ser positiva.");
        return saldo;
    }

    if (cantidad > saldo) {
        console.log("❌ Fondos insuficientes. Su saldo es " + saldo.toFixed(2) +
                    " € y quiere retirar " + cantidad.toFixed(2) + " €");
        return saldo;
    }

    const nuevoSaldo = saldo - cantidad;
    console.log("📤 Retiro de " + cantidad.toFixed(2) + " € realizado correctamente.");
    return nuevoSaldo;
};

/**
 * Obtiene el nombre de la operación según la opción
 * @param {number} opcion - El número de opción
 * @returns {string} El nombre de la operación
 */
const obtenerNombreOperacion = (opcion) => {
    switch (opcion) {
        case OPCION_CONSULTAR:
            return "Consultar saldo";
        case OPCION_INGRESAR:
            return "Ingresar dinero";
        case OPCION_RETIRAR:
            return "Retirar dinero";
        case OPCION_SALIR:
            return "Salir";
        default:
            return "Opción desconocida";
    }
};

// ============================================
// DATOS DE SIMULACIÓN
// ============================================
// Simulamos las operaciones que haría un usuario
const operaciones = [
    { opcion: 1 },                    // Consultar saldo
    { opcion: 2, cantidad: 500 },     // Ingresar 500€
    { opcion: 1 },                    // Consultar saldo
    { opcion: 3, cantidad: 200 },     // Retirar 200€
    { opcion: 3, cantidad: 2000 },    // Intentar retirar 2000€ (fallará)
    { opcion: 1 },                    // Consultar saldo
    { opcion: 4 }                     // Salir
];

// ============================================
// PROGRAMA PRINCIPAL
// ============================================
console.log("🏧 CAJERO AUTOMÁTICO");
console.log("====================");
console.log("");

// Variables del cajero
let saldo = SALDO_INICIAL;
let indiceOperacion = 0;
let cajeroActivo = true;

// Bucle principal del cajero - continúa mientras cajeroActivo sea true
while (cajeroActivo) {
    // Obtenemos la operación actual
    const operacionActual = operaciones[indiceOperacion];
    const opcion = operacionActual.opcion;

    console.log("Operación: " + obtenerNombreOperacion(opcion));

    // Procesamos según la opción elegida
    switch (opcion) {
        case OPCION_CONSULTAR:
            consultarSaldo(saldo);
            break;

        case OPCION_INGRESAR:
            saldo = ingresarDinero(saldo, operacionActual.cantidad);
            break;

        case OPCION_RETIRAR:
            saldo = retirarDinero(saldo, operacionActual.cantidad);
            break;

        case OPCION_SALIR:
            console.log("👋 Gracias por usar nuestro cajero. ¡Hasta pronto!");
            cajeroActivo = false; // Esto hará que el while termine
            break;

        default:
            console.log("❌ Opción no válida. Por favor, seleccione una opción del 1 al 4.");
            break;
    }

    console.log(""); // Línea en blanco entre operaciones

    // Avanzamos a la siguiente operación
    indiceOperacion++;

    // Seguridad: si nos quedamos sin operaciones, salimos
    if (indiceOperacion >= operaciones.length) {
        cajeroActivo = false;
    }
}

console.log("Sesión finalizada. Saldo final: " + saldo.toFixed(2) + " €");

