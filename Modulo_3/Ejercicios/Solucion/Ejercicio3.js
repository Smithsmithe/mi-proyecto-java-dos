/**
 * Calcula el factorial de un número n usando un bucle for.
 * @param {number} n - Número entero positivo (o 0).
 * @returns {number} Factorial de n.
 */
function factorial(n) {
    if (n === 0) {
        return 1;
    }
    let resultado = 1;
    for (let i = 1; i <= n; i++) {
        resultado *= i;
    }
    return resultado;
}

function calcularFactorial() {
    let numero = 4; // Ejemplo

    if (numero < 0) {
        console.log("El número debe ser no negativo.");
        return;
    }

    let resultadoFactorial = factorial(numero);
    console.log("El factorial de " + numero + " es: " + resultadoFactorial);
}

calcularFactorial();