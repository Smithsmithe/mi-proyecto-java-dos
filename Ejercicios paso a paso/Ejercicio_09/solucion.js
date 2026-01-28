/**
 * Ejercicio 9: Mapa del Tesoro - Matrices Bidimensionales
 *
 * Este programa trabaja con matrices (arrays bidimensionales) para
 * representar un mapa de juego y realizar operaciones sobre él.
 */

// ============================================
// CONSTANTES - Símbolos del mapa
// ============================================
const VACIO = ".";
const OBSTACULO = "#";
const TESORO = "T";
const JUGADOR = "J";
const TRAMPA = "X";

// ============================================
// DATOS - El mapa del juego
// ============================================

// Matriz 8x8: array de 8 arrays, cada uno con 8 elementos
let mapa = [
    ["#", "#", "#", "#", "#", "#", "#", "#"],
    ["#", "J", ".", ".", "#", ".", "T", "#"],
    ["#", ".", "#", ".", ".", ".", ".", "#"],
    ["#", ".", "#", ".", "#", "#", ".", "#"],
    ["#", ".", ".", ".", ".", "X", ".", "#"],
    ["#", "#", ".", "#", ".", ".", ".", "#"],
    ["#", "T", ".", ".", ".", "#", "T", "#"],
    ["#", "#", "#", "#", "#", "#", "#", "#"]
];

// Variable para llevar la puntuación
let puntuacion = 0;
let tesorosRecogidos = 0;

// ============================================
// FUNCIONES
// ============================================

/**
 * Muestra el mapa en la consola de forma visual
 * @param {string[][]} matriz - La matriz del mapa
 */
function mostrarMapa(matriz) {
    console.log("");

    // Recorremos cada fila
    for (let fila = 0; fila < matriz.length; fila++) {
        let lineaVisual = "";

        // Recorremos cada columna de esa fila
        for (let columna = 0; columna < matriz[fila].length; columna++) {
            lineaVisual += matriz[fila][columna] + " ";
        }

        console.log(lineaVisual);
    }

    console.log("");
}

/**
 * Encuentra la posición de un elemento en el mapa
 * @param {string[][]} matriz - La matriz del mapa
 * @param {string} elemento - El elemento a buscar
 * @returns {object|null} Objeto con fila y columna, o null si no se encuentra
 */
function encontrarPosicion(matriz, elemento) {
    for (let fila = 0; fila < matriz.length; fila++) {
        for (let columna = 0; columna < matriz[fila].length; columna++) {
            if (matriz[fila][columna] === elemento) {
                return { fila: fila, columna: columna };
            }
        }
    }

    return null; // No se encontró
}

/**
 * Cuenta cuántas veces aparece un elemento en el mapa
 * @param {string[][]} matriz - La matriz del mapa
 * @param {string} elemento - El elemento a contar
 * @returns {number} La cantidad de veces que aparece
 */
function contarElementos(matriz, elemento) {
    let contador = 0;

    for (let fila = 0; fila < matriz.length; fila++) {
        for (let columna = 0; columna < matriz[fila].length; columna++) {
            if (matriz[fila][columna] === elemento) {
                contador++;
            }
        }
    }

    return contador;
}

/**
 * Verifica si una posición es válida y transitable
 * @param {string[][]} matriz - La matriz del mapa
 * @param {number} fila - La fila a verificar
 * @param {number} columna - La columna a verificar
 * @returns {boolean} true si es válida y transitable
 */
const esPosicionValida = (matriz, fila, columna) => {
    // Verificar que está dentro de los límites del mapa
    if (fila < 0 || fila >= matriz.length) {
        return false;
    }

    if (columna < 0 || columna >= matriz[fila].length) {
        return false;
    }

    // Verificar que no es un obstáculo
    const contenido = matriz[fila][columna];
    if (contenido === OBSTACULO) {
        return false;
    }

    return true;
};

/**
 * Mueve al jugador en una dirección
 * @param {string[][]} matriz - La matriz del mapa
 * @param {string} direccion - "arriba", "abajo", "izquierda", "derecha"
 * @returns {object} Resultado del movimiento
 */
function moverJugador(matriz, direccion) {
    // Encontrar posición actual del jugador
    const posActual = encontrarPosicion(matriz, JUGADOR);

    if (!posActual) {
        return { exito: false, mensaje: "No se encontró al jugador en el mapa" };
    }

    // Calcular nueva posición según la dirección
    let nuevaFila = posActual.fila;
    let nuevaColumna = posActual.columna;

    switch (direccion) {
        case "arriba":
            nuevaFila = posActual.fila - 1;
            break;
        case "abajo":
            nuevaFila = posActual.fila + 1;
            break;
        case "izquierda":
            nuevaColumna = posActual.columna - 1;
            break;
        case "derecha":
            nuevaColumna = posActual.columna + 1;
            break;
        default:
            return { exito: false, mensaje: "Dirección no válida" };
    }

    // Verificar si la nueva posición es válida
    if (!esPosicionValida(matriz, nuevaFila, nuevaColumna)) {
        return { exito: false, mensaje: "No puedes moverte en esa dirección (obstáculo o fuera del mapa)" };
    }

    // Verificar qué hay en la nueva posición
    const contenidoNuevaPosicion = matriz[nuevaFila][nuevaColumna];
    let mensajeExtra = "";

    if (contenidoNuevaPosicion === TESORO) {
        puntuacion += 100;
        tesorosRecogidos++;
        mensajeExtra = " ¡Has encontrado un tesoro! +100 puntos";
    } else if (contenidoNuevaPosicion === TRAMPA) {
        puntuacion -= 50;
        mensajeExtra = " ¡Has caído en una trampa! -50 puntos";
    }

    // Realizar el movimiento
    matriz[posActual.fila][posActual.columna] = VACIO;  // Posición anterior queda vacía
    matriz[nuevaFila][nuevaColumna] = JUGADOR;          // Nueva posición tiene al jugador

    return {
        exito: true,
        mensaje: "Movimiento realizado" + mensajeExtra,
        nuevaPosicion: { fila: nuevaFila, columna: nuevaColumna }
    };
}

/**
 * Encuentra todas las posiciones de los tesoros
 * @param {string[][]} matriz - La matriz del mapa
 * @returns {object[]} Array de objetos con las posiciones
 */
function encontrarTodosLosTesoros(matriz) {
    const tesoros = [];

    for (let fila = 0; fila < matriz.length; fila++) {
        for (let columna = 0; columna < matriz[fila].length; columna++) {
            if (matriz[fila][columna] === TESORO) {
                tesoros.push({ fila: fila, columna: columna });
            }
        }
    }

    return tesoros;
}

/**
 * Calcula la distancia Manhattan entre dos posiciones
 * (movimientos en línea recta horizontal + vertical)
 * @param {object} pos1 - Primera posición {fila, columna}
 * @param {object} pos2 - Segunda posición {fila, columna}
 * @returns {number} La distancia en "pasos"
 */
const calcularDistancia = (pos1, pos2) => {
    const distanciaFila = Math.abs(pos1.fila - pos2.fila);
    const distanciaColumna = Math.abs(pos1.columna - pos2.columna);
    return distanciaFila + distanciaColumna;
};

/**
 * Encuentra el tesoro más cercano al jugador
 * @param {string[][]} matriz - La matriz del mapa
 * @returns {object|null} Objeto con posición y distancia del tesoro más cercano
 */
function tesoroMasCercano(matriz) {
    const posJugador = encontrarPosicion(matriz, JUGADOR);
    const tesoros = encontrarTodosLosTesoros(matriz);

    if (!posJugador || tesoros.length === 0) {
        return null;
    }

    let masCercano = null;
    let distanciaMinima = Infinity; // Empezamos con un valor muy grande

    for (let i = 0; i < tesoros.length; i++) {
        const distancia = calcularDistancia(posJugador, tesoros[i]);

        if (distancia < distanciaMinima) {
            distanciaMinima = distancia;
            masCercano = {
                posicion: tesoros[i],
                distancia: distancia
            };
        }
    }

    return masCercano;
}

/**
 * Obtiene las dimensiones del mapa
 * @param {string[][]} matriz - La matriz del mapa
 * @returns {object} Objeto con filas y columnas
 */
function obtenerDimensiones(matriz) {
    const filas = matriz.length;
    const columnas = matriz.length > 0 ? matriz[0].length : 0;
    return { filas: filas, columnas: columnas };
}

/**
 * BONUS: Muestra solo el área visible alrededor del jugador
 * @param {string[][]} matriz - La matriz del mapa
 * @param {number} radio - Radio de visión
 */
function mostrarConNiebla(matriz, radio) {
    const posJugador = encontrarPosicion(matriz, JUGADOR);

    if (!posJugador) {
        console.log("Jugador no encontrado");
        return;
    }

    console.log("");

    for (let fila = 0; fila < matriz.length; fila++) {
        let lineaVisual = "";

        for (let columna = 0; columna < matriz[fila].length; columna++) {
            const distancia = calcularDistancia(posJugador, { fila, columna });

            if (distancia <= radio) {
                lineaVisual += matriz[fila][columna] + " ";
            } else {
                lineaVisual += "? ";  // Niebla
            }
        }

        console.log(lineaVisual);
    }

    console.log("");
}

// ============================================
// PROGRAMA PRINCIPAL
// ============================================

console.log("🗺️ MAPA DEL TESORO");
console.log("==================");

// Mostrar mapa inicial
mostrarMapa(mapa);

// Información del mapa
const dimensiones = obtenerDimensiones(mapa);
console.log("📐 Dimensiones del mapa: " + dimensiones.filas + "x" + dimensiones.columnas);

const posJugador = encontrarPosicion(mapa, JUGADOR);
console.log("📍 Posición del jugador: fila " + posJugador.fila + ", columna " + posJugador.columna);

const numTesoros = contarElementos(mapa, TESORO);
console.log("💎 Tesoros en el mapa: " + numTesoros);

const numTrampas = contarElementos(mapa, TRAMPA);
console.log("⚠️ Trampas en el mapa: " + numTrampas);

// Encontrar todos los tesoros
console.log("");
console.log("🗺️ Posiciones de los tesoros:");
const tesoros = encontrarTodosLosTesoros(mapa);
for (let i = 0; i < tesoros.length; i++) {
    const t = tesoros[i];
    console.log("  - Tesoro " + (i + 1) + ": fila " + t.fila + ", columna " + t.columna);
}

// Tesoro más cercano
const cercano = tesoroMasCercano(mapa);
if (cercano) {
    console.log("");
    console.log("📊 Tesoro más cercano: distancia de " + cercano.distancia + " pasos");
}

// Realizar movimientos
console.log("");
console.log("═".repeat(40));
console.log("🎮 SIMULACIÓN DE MOVIMIENTOS");
console.log("═".repeat(40));

const movimientos = ["derecha", "derecha", "abajo", "abajo", "abajo", "izquierda"];

for (let i = 0; i < movimientos.length; i++) {
    const direccion = movimientos[i];
    console.log("");
    console.log("➡️ Moviendo hacia: " + direccion);

    const resultado = moverJugador(mapa, direccion);

    if (resultado.exito) {
        console.log("✓ " + resultado.mensaje);
    } else {
        console.log("✗ " + resultado.mensaje);
    }
}

// Mostrar mapa después de movimientos
console.log("");
console.log("📍 Mapa después de los movimientos:");
mostrarMapa(mapa);

console.log("🏆 Puntuación actual: " + puntuacion + " puntos");
console.log("💎 Tesoros recogidos: " + tesorosRecogidos);

// BONUS: Mostrar con niebla de guerra
console.log("");
console.log("🌫️ BONUS - Vista con niebla de guerra (radio 2):");
mostrarConNiebla(mapa, 2);

