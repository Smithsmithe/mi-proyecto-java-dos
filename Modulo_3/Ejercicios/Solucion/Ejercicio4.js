/**
 * Calcula el costo de envío según peso y tipo de envío.
 * @param {number} peso - Peso del paquete.
 * @param {number} tipoEnvio - 1 para estándar, 2 para exprés.
 * @returns {number} Costo del envío.
 */
function calcularCostoEnvio(peso, tipoEnvio) {
    let costo = 0;

    switch (tipoEnvio) {
        case 1: // Envío estándar
            if (peso <= 1) {
                costo = 5;
            } else if (peso <= 5) {
                costo = 10;
            } else {
                costo = 15;
            }
            break;

        case 2: // Envío exprés
            if (peso <= 1) {
                costo = 8;
            } else if (peso <= 5) {
                costo = 14;
            } else {
                costo = 20;
            }
            break;

        default:
            console.log("Tipo de envío no válido.");
            costo = 0;
    }

    return costo;
}

/**
 * Función principal que simula el envío de varios paquetes.
 * Se usan datos inventados.
 */
function simularEnvios() {
    let total = 0;
    total += calcularCostoEnvio(0.5, 1); // Envío estándar
    total += calcularCostoEnvio(3, 2); // Envío exprés
    total += calcularCostoEnvio(6, 1); // Envío estándar
    total += calcularCostoEnvio(2, 2); // Envío exprés
    total += calcularCostoEnvio(10, 1); // Envío estánd
    console.log("Costo total de todos los envíos:", total + " €");
}

// Llamada a la función principal
simularEnvios();
