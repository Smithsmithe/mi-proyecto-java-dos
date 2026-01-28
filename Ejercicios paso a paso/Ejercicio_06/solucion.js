/**
 * Ejercicio 6: Sistema de Inventario de una Tienda
 *
 * Este programa gestiona un inventario usando arrays de objetos
 * y realiza búsquedas, filtrados y modificaciones sobre los datos.
 */

// ============================================
// DATOS - Array de objetos (inventario)
// ============================================

const inventario = [
    { nombre: "Auriculares Bluetooth", precio: 49.99, stock: 15, categoria: "audio" },
    { nombre: "Teclado Mecánico", precio: 89.99, stock: 8, categoria: "perifericos" },
    { nombre: "Ratón Gaming", precio: 35.50, stock: 3, categoria: "perifericos" },
    { nombre: "Monitor 24 pulgadas", precio: 199.99, stock: 4, categoria: "monitores" },
    { nombre: "Altavoces 2.1", precio: 65.00, stock: 12, categoria: "audio" },
    { nombre: "Webcam HD", precio: 45.00, stock: 0, categoria: "perifericos" },
    { nombre: "Monitor 27 pulgadas", precio: 299.99, stock: 2, categoria: "monitores" },
    { nombre: "Micrófono USB", precio: 79.99, stock: 6, categoria: "audio" }
];

// ============================================
// FUNCIONES
// ============================================

/**
 * Busca todos los productos de una categoría específica
 * @param {object[]} listaProductos - El array de productos
 * @param {string} categoria - La categoría a buscar
 * @returns {object[]} Array con los productos de esa categoría
 */
function buscarPorCategoria(listaProductos, categoria) {
    const resultados = []; // Array vacío para acumular resultados

    for (let i = 0; i < listaProductos.length; i++) {
        const producto = listaProductos[i];

        if (producto.categoria === categoria) {
            resultados.push(producto); // Añadimos al array de resultados
        }
    }

    return resultados;
}

/**
 * Obtiene los productos con stock por debajo del mínimo
 * @param {object[]} listaProductos - El array de productos
 * @param {number} minimo - El umbral mínimo de stock
 * @returns {object[]} Array con los productos con stock bajo
 */
function obtenerStockBajo(listaProductos, minimo) {
    const productosBajos = [];

    for (let i = 0; i < listaProductos.length; i++) {
        if (listaProductos[i].stock < minimo) {
            productosBajos.push(listaProductos[i]);
        }
    }

    return productosBajos;
}

/**
 * Calcula el valor total del inventario (precio × stock de cada producto)
 * @param {object[]} listaProductos - El array de productos
 * @returns {number} El valor total del inventario
 */
const calcularValorInventario = (listaProductos) => {
    let valorTotal = 0;

    for (let i = 0; i < listaProductos.length; i++) {
        const producto = listaProductos[i];
        const valorProducto = producto.precio * producto.stock;
        valorTotal += valorProducto;
    }

    return valorTotal;
};

/**
 * Busca un producto por su nombre exacto
 * @param {object[]} listaProductos - El array de productos
 * @param {string} nombreBuscado - El nombre del producto a buscar
 * @returns {object|null} El producto encontrado o null si no existe
 */
const buscarProducto = (listaProductos, nombreBuscado) => {
    for (let i = 0; i < listaProductos.length; i++) {
        if (listaProductos[i].nombre === nombreBuscado) {
            return listaProductos[i]; // Devolvemos el producto encontrado
        }
    }

    return null; // No se encontró
};

/**
 * Aplica un descuento a todos los productos de una categoría
 * NOTA: Esta función modifica el array original
 * @param {object[]} listaProductos - El array de productos
 * @param {string} categoria - La categoría a la que aplicar descuento
 * @param {number} porcentaje - El porcentaje de descuento (ej: 10 para 10%)
 * @returns {object[]} Array con los productos modificados (para mostrar)
 */
function aplicarDescuento(listaProductos, categoria, porcentaje) {
    const productosModificados = [];

    for (let i = 0; i < listaProductos.length; i++) {
        const producto = listaProductos[i];

        if (producto.categoria === categoria) {
            const precioAnterior = producto.precio;
            const descuento = producto.precio * (porcentaje / 100);
            producto.precio = producto.precio - descuento;

            // Guardamos info de la modificación
            productosModificados.push({
                nombre: producto.nombre,
                precioAnterior: precioAnterior,
                precioNuevo: producto.precio
            });
        }
    }

    return productosModificados;
}

/**
 * BONUS: Cuenta productos por categoría
 * @param {object[]} listaProductos - El array de productos
 * @returns {object} Objeto con el conteo por categoría
 */
function contarPorCategoria(listaProductos) {
    const conteo = {}; // Objeto vacío para acumular

    for (let i = 0; i < listaProductos.length; i++) {
        const categoria = listaProductos[i].categoria;

        // Si la categoría no existe en el objeto, la inicializamos a 0
        if (!conteo[categoria]) {
            conteo[categoria] = 0;
        }

        // Incrementamos el contador de esa categoría
        conteo[categoria]++;
    }

    return conteo;
}

// ============================================
// FUNCIONES AUXILIARES DE VISUALIZACIÓN
// ============================================

/**
 * Muestra una lista de productos formateada
 */
function mostrarProductos(productos, titulo) {
    console.log(titulo);

    if (productos.length === 0) {
        console.log("  (No hay productos)");
        return;
    }

    for (let i = 0; i < productos.length; i++) {
        const p = productos[i];
        let linea = "- " + p.nombre + ": " + p.precio.toFixed(2) + " €";

        if (p.stock !== undefined) {
            if (p.stock === 0) {
                linea += " (¡SIN STOCK!)";
            } else {
                linea += " (" + p.stock + " uds)";
            }
        }

        console.log(linea);
    }
}

// ============================================
// PROGRAMA PRINCIPAL
// ============================================

console.log("🏪 SISTEMA DE INVENTARIO");
console.log("========================");
console.log("");

// 1. Buscar por categoría
const productosAudio = buscarPorCategoria(inventario, "audio");
mostrarProductos(productosAudio, '📦 Productos de la categoría "audio":');
console.log("");

// 2. Obtener productos con stock bajo
const stockBajo = obtenerStockBajo(inventario, 5);
console.log("⚠️ Productos con stock bajo (menos de 5 unidades):");
for (let i = 0; i < stockBajo.length; i++) {
    const p = stockBajo[i];
    if (p.stock === 0) {
        console.log("- " + p.nombre + ": " + p.stock + " unidades (¡SIN STOCK!)");
    } else {
        console.log("- " + p.nombre + ": " + p.stock + " unidades");
    }
}
console.log("");

// 3. Calcular valor del inventario
const valorTotal = calcularValorInventario(inventario);
console.log("💰 Valor total del inventario: " + valorTotal.toFixed(2) + " €");
console.log("");

// 4. Buscar un producto específico
const nombreBuscado = "Teclado Mecánico";
console.log('🔍 Búsqueda de "' + nombreBuscado + '":');
const productoEncontrado = buscarProducto(inventario, nombreBuscado);

if (productoEncontrado) {
    console.log("Encontrado: " + productoEncontrado.nombre +
                " - " + productoEncontrado.precio.toFixed(2) + " €" +
                " - Stock: " + productoEncontrado.stock);
} else {
    console.log("Producto no encontrado.");
}
console.log("");

// 5. Aplicar descuento
console.log('🏷️ Aplicando 10% de descuento a categoría "monitores"...');
const modificados = aplicarDescuento(inventario, "monitores", 10);

for (let i = 0; i < modificados.length; i++) {
    const m = modificados[i];
    console.log("- " + m.nombre + ": " + m.precioAnterior.toFixed(2) + " € → " + m.precioNuevo.toFixed(2) + " €");
}
console.log("");

// BONUS: Conteo por categoría
console.log("📊 BONUS - Productos por categoría:");
const conteo = contarPorCategoria(inventario);
const categorias = ["audio", "perifericos", "monitores"];

for (let i = 0; i < categorias.length; i++) {
    const cat = categorias[i];
    console.log("- " + cat + ": " + conteo[cat] + " productos");
}

