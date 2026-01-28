// Dada una matriz de números, aplana la matriz en un solo array. Matriz de dos dimensiones.

/**
 * Aplana una matriz de dos dimensiones.
 * @param {number[][]} matriz - Matriz de dos dimensiones.
 * @returns {number[]} Array con los elementos de la matriz.
 * Si la matriz es vacía, devuelve [].
 */
function aplanarMatriz(matriz) {
    let array = [];
    for (let i = 0; i < matriz.length; i++) {
        for (let j = 0; j < matriz[i].length; j++) {
            array.push(matriz[i][j]);
        }
    }
    return array;
}

console.log(aplanarMatriz([[1, 2], [3, 4], [5, 6]])); //