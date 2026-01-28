// Invertir una matriz de dos dimensiones

/**
 * Invierte una matriz de dos dimensiones.
 * @param {number[][]} matriz - Matriz de dos dimensiones.
 * @returns {number[][]} Matriz invertida.
 */
function invertirMatriz(matriz) {
    let matrizInvertida = [];
    for (let i = matriz.length - 1; i >= 0; i--) {
        for (let j = matriz[i].length - 1; j >= 0; j--) {
            if (matrizInvertida[matriz.length - 1 - i] === undefined) {
                matrizInvertida[matriz.length - 1 - i] = [];
            }
            matrizInvertida[matriz.length - 1 - i].push(matriz[i][j]);
        }
    }
    return matrizInvertida;
}

console.log(invertirMatriz([[1, 2], [3, 4], [5, 6]])); // [[5, 6], [3, 4], [1, 2]]