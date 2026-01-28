/**
 * Ejercicio 8: Sistema de Diccionario y Traductor
 *
 * Este programa usa Maps para gestionar un diccionario de palabras
 * con traducciones, definiciones y estadísticas de uso.
 */

// ============================================
// ESTRUCTURAS DE DATOS
// ============================================

// Map principal: diccionario español → información
const diccionario = new Map();

// Map para estadísticas: palabra → número de búsquedas
const estadisticasBusqueda = new Map();

// Array para historial de búsquedas (BONUS)
const historialBusquedas = [];
const MAX_HISTORIAL = 10;

// ============================================
// FUNCIONES DEL DICCIONARIO
// ============================================

/**
 * Añade una palabra al diccionario
 * @param {Map} dic - El Map del diccionario
 * @param {string} palabra - La palabra en español
 * @param {object} info - Objeto con ingles, definicion y ejemplo
 * @returns {boolean} true si se añadió, false si ya existía
 */
function agregarPalabra(dic, palabra, info) {
    const palabraNormalizada = palabra.toLowerCase();

    if (dic.has(palabraNormalizada)) {
        console.log('⚠️ "' + palabra + '" ya existe en el diccionario.');
        return false;
    }

    dic.set(palabraNormalizada, {
        ingles: info.ingles,
        definicion: info.definicion,
        ejemplo: info.ejemplo
    });

    console.log('✓ "' + palabra + '" añadida correctamente');
    return true;
}

/**
 * Busca una palabra en el diccionario
 * @param {Map} dic - El Map del diccionario
 * @param {string} palabra - La palabra a buscar
 * @returns {object|undefined} La información de la palabra o undefined
 */
function buscarPalabra(dic, palabra) {
    const palabraNormalizada = palabra.toLowerCase();
    return dic.get(palabraNormalizada);
}

/**
 * Elimina una palabra del diccionario
 * @param {Map} dic - El Map del diccionario
 * @param {string} palabra - La palabra a eliminar
 * @returns {boolean} true si se eliminó, false si no existía
 */
const eliminarPalabra = (dic, palabra) => {
    const palabraNormalizada = palabra.toLowerCase();

    if (!dic.has(palabraNormalizada)) {
        console.log('⚠️ "' + palabra + '" no existe en el diccionario.');
        return false;
    }

    dic.delete(palabraNormalizada);
    console.log('✓ "' + palabra + '" eliminada del diccionario');
    return true;
};

/**
 * Lista todas las palabras del diccionario
 * @param {Map} dic - El Map del diccionario
 * @returns {string[]} Array con todas las palabras
 */
function listarPalabras(dic) {
    const palabras = [];

    // .keys() devuelve un iterador con todas las claves
    for (const palabra of dic.keys()) {
        palabras.push(palabra);
    }

    return palabras;
}

/**
 * Traduce una frase palabra por palabra
 * @param {Map} dic - El Map del diccionario
 * @param {string} frase - La frase a traducir
 * @returns {string} La frase traducida
 */
function traducirFrase(dic, frase) {
    // Dividir la frase en palabras
    const palabras = frase.toLowerCase().split(" ");
    const traduccion = [];

    for (let i = 0; i < palabras.length; i++) {
        const palabra = palabras[i];
        const info = dic.get(palabra);

        if (info) {
            traduccion.push(info.ingles);
        } else {
            // Si no está en el diccionario, dejamos la palabra original
            traduccion.push("[" + palabra + "]");
        }
    }

    return traduccion.join(" ");
}

// ============================================
// FUNCIONES DE ESTADÍSTICAS
// ============================================

/**
 * Registra una búsqueda en las estadísticas
 * @param {Map} stats - El Map de estadísticas
 * @param {string} palabra - La palabra buscada
 */
function registrarBusqueda(stats, palabra) {
    const palabraNormalizada = palabra.toLowerCase();

    // Si la palabra no existe en las estadísticas, inicializamos a 0
    const busquedasActuales = stats.get(palabraNormalizada) || 0;
    stats.set(palabraNormalizada, busquedasActuales + 1);
}

/**
 * Obtiene las palabras más buscadas
 * @param {Map} stats - El Map de estadísticas
 * @param {number} cantidad - Cuántas palabras devolver
 * @returns {object[]} Array de objetos con palabra y búsquedas
 */
const obtenerMasBuscadas = (stats, cantidad) => {
    // Convertimos el Map a un array de objetos
    const arrayStats = [];

    for (const [palabra, busquedas] of stats) {
        arrayStats.push({ palabra: palabra, busquedas: busquedas });
    }

    // Ordenamos de mayor a menor búsquedas (algoritmo burbuja)
    for (let i = 0; i < arrayStats.length - 1; i++) {
        for (let j = i + 1; j < arrayStats.length; j++) {
            if (arrayStats[j].busquedas > arrayStats[i].busquedas) {
                const temp = arrayStats[i];
                arrayStats[i] = arrayStats[j];
                arrayStats[j] = temp;
            }
        }
    }

    // Devolvemos solo la cantidad solicitada
    const resultado = [];
    for (let i = 0; i < cantidad && i < arrayStats.length; i++) {
        resultado.push(arrayStats[i]);
    }

    return resultado;
};

/**
 * BONUS: Añade una búsqueda al historial
 * @param {string} palabra - La palabra buscada
 */
function agregarAlHistorial(palabra) {
    // Añadimos al inicio del array
    historialBusquedas.unshift({
        palabra: palabra,
        fecha: new Date().toLocaleTimeString()
    });

    // Mantenemos solo las últimas MAX_HISTORIAL búsquedas
    while (historialBusquedas.length > MAX_HISTORIAL) {
        historialBusquedas.pop();
    }
}

/**
 * Función combinada: buscar, registrar estadística y añadir al historial
 */
function buscarConEstadisticas(dic, stats, palabra) {
    const resultado = buscarPalabra(dic, palabra);

    if (resultado) {
        registrarBusqueda(stats, palabra);
        agregarAlHistorial(palabra);
    }

    return resultado;
}

// ============================================
// FUNCIÓN AUXILIAR DE VISUALIZACIÓN
// ============================================

function mostrarInfoPalabra(palabra, info) {
    console.log("Traducción: " + info.ingles);
    console.log("Definición: " + info.definicion);
    console.log('Ejemplo: "' + info.ejemplo + '"');
}

// ============================================
// PROGRAMA PRINCIPAL
// ============================================

console.log("📚 DICCIONARIO ESPAÑOL-INGLÉS");
console.log("=============================");
console.log("");

// 1. Añadir palabras al diccionario
console.log("➕ Añadiendo palabras al diccionario...");

agregarPalabra(diccionario, "casa", {
    ingles: "house",
    definicion: "Edificio para habitar",
    ejemplo: "Mi casa tiene tres habitaciones"
});

agregarPalabra(diccionario, "perro", {
    ingles: "dog",
    definicion: "Animal doméstico canino",
    ejemplo: "El perro juega en el jardín"
});

agregarPalabra(diccionario, "gato", {
    ingles: "cat",
    definicion: "Animal doméstico felino",
    ejemplo: "El gato duerme en el sofá"
});

agregarPalabra(diccionario, "comer", {
    ingles: "eat",
    definicion: "Ingerir alimentos",
    ejemplo: "Vamos a comer juntos"
});

agregarPalabra(diccionario, "dormir", {
    ingles: "sleep",
    definicion: "Estado de reposo",
    ejemplo: "Necesito dormir ocho horas"
});

agregarPalabra(diccionario, "el", {
    ingles: "the",
    definicion: "Artículo determinado masculino",
    ejemplo: "El libro está en la mesa"
});

agregarPalabra(diccionario, "en", {
    ingles: "in",
    definicion: "Preposición de lugar",
    ejemplo: "Estoy en casa"
});

console.log("");

// 2. Listar todas las palabras
console.log("📖 Diccionario actual (" + diccionario.size + " palabras):");
const todasLasPalabras = listarPalabras(diccionario);

for (let i = 0; i < todasLasPalabras.length; i++) {
    const palabra = todasLasPalabras[i];
    const info = diccionario.get(palabra);
    console.log("- " + palabra + " → " + info.ingles);
}
console.log("");

// 3. Buscar palabras (y registrar estadísticas)
console.log('🔍 Buscando "perro":');
let resultado = buscarConEstadisticas(diccionario, estadisticasBusqueda, "perro");
if (resultado) {
    mostrarInfoPalabra("perro", resultado);
} else {
    console.log("Palabra no encontrada.");
}
console.log("");

// Simular más búsquedas para las estadísticas
buscarConEstadisticas(diccionario, estadisticasBusqueda, "perro");
buscarConEstadisticas(diccionario, estadisticasBusqueda, "perro");
buscarConEstadisticas(diccionario, estadisticasBusqueda, "perro");
buscarConEstadisticas(diccionario, estadisticasBusqueda, "perro");
buscarConEstadisticas(diccionario, estadisticasBusqueda, "casa");
buscarConEstadisticas(diccionario, estadisticasBusqueda, "casa");
buscarConEstadisticas(diccionario, estadisticasBusqueda, "casa");
buscarConEstadisticas(diccionario, estadisticasBusqueda, "comer");
buscarConEstadisticas(diccionario, estadisticasBusqueda, "comer");
buscarConEstadisticas(diccionario, estadisticasBusqueda, "dormir");

// 4. Eliminar una palabra
console.log('🗑️ Eliminando "gato"...');
eliminarPalabra(diccionario, "gato");
console.log("Palabras en el diccionario: " + diccionario.size);
console.log("");

// 5. Traducir una frase
const fraseOriginal = "el perro come en casa";
console.log('🌐 Traduciendo frase: "' + fraseOriginal + '"');
const fraseTraducida = traducirFrase(diccionario, fraseOriginal);
console.log("Resultado: " + fraseTraducida);
console.log("");

// 6. Mostrar estadísticas
console.log("📊 Estadísticas de búsqueda:");
const masBuscadas = obtenerMasBuscadas(estadisticasBusqueda, 5);

for (let i = 0; i < masBuscadas.length; i++) {
    const stat = masBuscadas[i];
    console.log((i + 1) + ". " + stat.palabra + ": " + stat.busquedas + " búsquedas");
}
console.log("");

// 7. BONUS: Mostrar historial
console.log("📜 BONUS - Últimas búsquedas:");
for (let i = 0; i < historialBusquedas.length; i++) {
    const h = historialBusquedas[i];
    console.log("- " + h.palabra + " (a las " + h.fecha + ")");
}
console.log("");

// 8. Demostración de métodos de Map
console.log("💡 Demostración de Map:");
const demoMap = new Map();

demoMap.set("clave1", "valor1");
demoMap.set("clave2", "valor2");
demoMap.set(42, "los números también pueden ser claves");
demoMap.set({ id: 1 }, "¡incluso objetos pueden ser claves!");

console.log("Tamaño del Map: " + demoMap.size);
console.log("¿Tiene 'clave1'? " + demoMap.has("clave1"));
console.log("Valor de 'clave1': " + demoMap.get("clave1"));
console.log("¿Tiene 42 como clave? " + demoMap.has(42));
console.log("Valor de 42: " + demoMap.get(42));

