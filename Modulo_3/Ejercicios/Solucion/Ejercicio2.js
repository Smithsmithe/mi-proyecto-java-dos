/**
 * Convierte de Celsius a Fahrenheit.
 * Fórmula: F = C * (9/5) + 32
 * @param {number} celsius - Temperatura en grados Celsius.
 * @returns {number} Temperatura en grados Fahrenheit.
 */
function celsiusAFahrenheit(celsius) {
    return celsius * (9 / 5) + 32;
}

/**
 * Convierte de Fahrenheit a Celsius.
 * Fórmula: C = (F - 32) * (5 / 9)
 * @param {number} fahrenheit - Temperatura en grados Fahrenheit.
 * @returns {number} Temperatura en grados Celsius.
 */
function fahrenheitACelsius(fahrenheit) {
    return (fahrenheit - 32) * (5 / 9);
}

/**
 * Función principal que controla el menú de opciones.
 * Utiliza un bucle while para repetir hasta que el usuario ingrese 0 (salir).
 */
function conversorTemperaturas() {
    let opcion = 2;

        switch (opcion) {
            case 1:
                // let celsius = parseFloat(prompt("Ingresa la temperatura en Celsius:"));
                let celsius = 20; // Ejemplo
                let resultadoF = celsiusAFahrenheit(celsius);
                console.log(celsius + "°C equivalen a " + resultadoF + "°F");
                break;

            case 2:
                // let fahrenheit = parseFloat(prompt("Ingresa la temperatura en Fahrenheit:"));
                let fahrenheit = 68; // Ejemplo
                let resultadoC = fahrenheitACelsius(fahrenheit);
                console.log(fahrenheit + "°F equivalen a " + resultadoC + "°C");
                break;

            case 0:
                console.log("Saliendo del programa...");
                break;

            default:
                console.log("Opción no válida. Intenta de nuevo.");
                break;
        }
}

// Llamada a la función principal:
conversorTemperaturas();