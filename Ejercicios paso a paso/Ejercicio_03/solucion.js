/**
 * Ejercicio 3: Lista de la Compra con Cálculo de Totales
 *
 * Este programa gestiona una lista de la compra usando arrays y bucles for
 * para calcular totales, encontrar el producto más caro y contar productos.
 */

// ============================================
// DATOS - Arrays de productos y precios
// ============================================
const productos = ["Leche", "Pan", "Huevos", "Queso", "Jamón", "Aceite", "Arroz", "Pasta"];
const precios = [1.20, 0.90, 2.50, 4.80, 6.50, 5.99, 1.85, 1.10];

// ============================================
// FUNCIONES
// ============================================

/**
 * Calcula el precio total de todos los productos
 * @param {number[]} arrayPrecios - Array con los precios
 * @returns {number} La suma de todos los precios
 */
function calcularTotal(arrayPrecios) {
    let total = 0;

    for (let i = 0; i < arrayPrecios.length; i++) {
        total = total + arrayPrecios[i];
        // También se puede escribir: total += arrayPrecios[i];
    }

    return total;
}

/**
 * Encuentra el producto más caro de la lista
 * @param {string[]} arrayProductos - Array con los nombres de productos
 * @param {number[]} arrayPrecios - Array con los precios
 * @returns {object} Objeto con el nombre y precio del producto más caro
 */
function encontrarMasCaro(arrayProductos, arrayPrecios) {
    let indiceMasCaro = 0; // Empezamos asumiendo que el primero es el más caro
    let precioMasCaro = arrayPrecios[0];

    for (let i = 1; i < arrayPrecios.length; i++) {
        if (arrayPrecios[i] > precioMasCaro) {
            precioMasCaro = arrayPrecios[i];
            indiceMasCaro = i;
        }
    }

    // Devolvemos un objeto con la información
    return {
        nombre: arrayProductos[indiceMasCaro],
        precio: precioMasCaro
    };
}

/**
 * Cuenta cuántos productos superan un precio umbral
 * @param {number[]} arrayPrecios - Array con los precios
 * @param {number} umbral - Precio mínimo para contar
 * @returns {number} Cantidad de productos que superan el umbral
 */
const contarProductosCaros = (arrayPrecios, umbral) => {
    let contador = 0;

    for (let i = 0; i < arrayPrecios.length; i++) {
        if (arrayPrecios[i] > umbral) {
            contador++;
        }
    }

    return contador;
};

/**
 * BONUS: Calcula el precio medio
 * @param {number[]} arrayPrecios - Array con los precios
 * @returns {number} El precio medio
 */
const calcularPrecioMedio = (arrayPrecios) => {
    const total = calcularTotal(arrayPrecios);
    return total / arrayPrecios.length;
};

/**
 * BONUS: Genera un ticket de compra formateado
 * @param {string[]} arrayProductos - Array con los nombres
 * @param {number[]} arrayPrecios - Array con los precios
 * @returns {string} El ticket formateado
 */
function generarTicket(arrayProductos, arrayPrecios) {
    let ticket = "================================\n";
    ticket += "         TICKET DE COMPRA       \n";
    ticket += "================================\n";

    for (let i = 0; i < arrayProductos.length; i++) {
        // Formateamos cada línea del ticket
        let linea = arrayProductos[i];
        // Añadimos espacios para alinear los precios
        while (linea.length < 20) {
            linea += " ";
        }
        linea += arrayPrecios[i].toFixed(2) + " €\n";
        ticket += linea;
    }

    ticket += "--------------------------------\n";
    ticket += "TOTAL:              " + calcularTotal(arrayPrecios).toFixed(2) + " €\n";
    ticket += "================================";

    return ticket;
}

// ============================================
// PROGRAMA PRINCIPAL
// ============================================

// Umbral para considerar un producto "caro"
const UMBRAL_CARO = 5.00;

// Cálculos
let total = calcularTotal(precios);
let productoMasCaro = encontrarMasCaro(productos, precios);
let cantidadCaros = contarProductosCaros(precios, UMBRAL_CARO);

// Mostrar resultados
console.log("🛒 Lista de la Compra");
console.log("=====================");
console.log("Productos: " + productos.join(", "));
console.log("");
console.log("📊 Resumen:");
console.log("- Total de productos: " + productos.length);
console.log("- Precio total: " + total.toFixed(2) + " €");
console.log("- Producto más caro: " + productoMasCaro.nombre + " (" + productoMasCaro.precio.toFixed(2) + " €)");
console.log("- Productos que cuestan más de " + UMBRAL_CARO.toFixed(2) + " €: " + cantidadCaros);

// BONUS
console.log("");
console.log("💡 BONUS:");
console.log("- Precio medio: " + calcularPrecioMedio(precios).toFixed(2) + " €");
console.log("");
console.log(generarTicket(productos, precios));

