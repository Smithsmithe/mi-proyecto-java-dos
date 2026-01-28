/**
 * Función que determina si un número es primo usando un bucle for.
 * @param {number} n - Número entero a verificar.
 * @returns {boolean} True si es primo, false si no lo es.
 */
function esPrimo(n) {
    if (n <= 1) {
        return false;
    }

    for (let i = 2; i < n; i++) {
        if (n % i === 0) {
            return false;
        }
    }

    return true;
}

function verificarNumeroPrimo() {
    // En un escenario real, se podría usar:
    // let numero = parseInt(prompt("Ingresa un número entero positivo:"));
    let numero = 7; // Ejemplo

    if (esPrimo(numero)) {
        console.log("El número " + numero + " es primo.");
    } else {
        console.log("El número " + numero + " no es primo.");
    }
}

verificarNumeroPrimo();