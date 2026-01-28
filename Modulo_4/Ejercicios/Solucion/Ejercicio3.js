// Dada una matriz de números, calcula la media de los elementos de la matriz. Matriz de dos dimensiones.

/**
 * Calcula la media de los elementos de una matriz de dos dimensiones.
 * @param {number[][]} matriz - Matriz de dos dimensiones.
 * @returns {number} Media de los elementos de la matriz.
 * Si la matriz es vacía, devuelve NaN.
 */
function mediaElementos(matriz) {
    let suma = 0;
    let elementos = 0;
    for (let i = 0; i < matriz.length; i++) {
        for (let j = 0; j < matriz[i].length; j++) {
            suma += matriz[i][j];
            elementos++;
        }
    }
    return suma / elementos;
}

console.log(mediaElementos([[1, 2], [3, 4], [5, 6]])); // 3.5