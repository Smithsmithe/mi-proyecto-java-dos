/**
 * Ejercicio 2: Calculadora de Propinas en un Restaurante
 *
 * Este programa calcula la propina, el total a pagar y divide la cuenta
 * entre varios comensales usando diferentes tipos de funciones.
 */

// ============================================
// FUNCIONES
// ============================================

/**
 * Calcula el importe de la propina (función tradicional)
 * @param {number} importe - El importe de la cuenta
 * @param {number} porcentaje - El porcentaje de propina (ej: 15 para 15%)
 * @returns {number} El valor de la propina
 */
function calcularPropina(importe, porcentaje) {
    const propina = importe * (porcentaje / 100);
    return propina;
}

/**
 * Calcula el total a pagar sumando la cuenta y la propina (función flecha)
 * @param {number} importe - El importe de la cuenta
 * @param {number} propina - El valor de la propina
 * @returns {number} El total a pagar
 */
const calcularTotalConPropina = (importe, propina) => {
    return importe + propina;
};

// Versión más concisa de la función flecha (sin llaves ni return explícito)
// const calcularTotalConPropina = (importe, propina) => importe + propina;

/**
 * Divide el total entre el número de personas (función flecha concisa)
 * @param {number} total - El total a pagar
 * @param {number} personas - El número de personas
 * @returns {number} Lo que debe pagar cada persona
 */
const dividirCuenta = (total, personas) => total / personas;

/**
 * BONUS: Sugiere un porcentaje de propina según la valoración del servicio
 * @param {number} estrellas - Valoración del 1 al 5
 * @returns {number} Porcentaje sugerido
 */
const sugerirPropina = (estrellas) => {
    if (estrellas <= 1) {
        return 0;
    } else if (estrellas === 2) {
        return 5;
    } else if (estrellas === 3) {
        return 10;
    } else if (estrellas === 4) {
        return 15;
    } else {
        return 20;
    }
};

// ============================================
// PROGRAMA PRINCIPAL
// ============================================

// Variables de entrada
let importeCuenta = 85.50;
let porcentajePropina = 15;
let numeroComensales = 4;

// Cálculos usando las funciones
let propina = calcularPropina(importeCuenta, porcentajePropina);
let totalPagar = calcularTotalConPropina(importeCuenta, propina);
let pagoPorPersona = dividirCuenta(totalPagar, numeroComensales);

// Mostrar resultados
console.log("🍽️  Calculadora de Propinas");
console.log("===========================");
console.log("Importe de la cuenta: " + importeCuenta.toFixed(2) + " €");
console.log("Porcentaje de propina: " + porcentajePropina + "%");
console.log("Número de comensales: " + numeroComensales);
console.log("");
console.log("📊 Desglose:");
console.log("- Propina: " + propina.toFixed(2) + " €");
console.log("- Total a pagar: " + totalPagar.toFixed(2) + " €");
console.log("- Cada persona paga: " + pagoPorPersona.toFixed(2) + " €");

// ============================================
// BONUS: Ejemplo de uso de sugerirPropina
// ============================================
console.log("");
console.log("💡 BONUS - Sistema de sugerencia de propina:");
let valoracionServicio = 4;
let propinaSugerida = sugerirPropina(valoracionServicio);
console.log("Valoración del servicio: " + valoracionServicio + " estrellas");
console.log("Propina sugerida: " + propinaSugerida + "%");

