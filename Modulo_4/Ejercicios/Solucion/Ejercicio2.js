//Dada una matriz de números, duplica cada elemento de la matriz. Matriz de dos dimensiones.

/**
 * Duplica cada elemento de una matriz de dos dimensiones.
 * @param {number[][]} matriz - Matriz de dos dimensiones.
 * @returns {number[][]} Matriz con elementos duplicados.
 * Si la matriz es vacía, devuelve [].
 */
function duplicarElementos(matriz) {
    let matrizDuplicada = [];
    for (let i = 0; i < matriz.length; i++) {
        matrizDuplicada.push([]);
        for (let j = 0; j < matriz[i].length; j++) {
            matrizDuplicada[i].push(matriz[i][j] * 2);
        }
    }
    return matrizDuplicada;
}

console.log(duplicarElementos([[1, 2], [3, 4], [5, 6]])); // [[2, 4], [6, 8], [10, 12]]