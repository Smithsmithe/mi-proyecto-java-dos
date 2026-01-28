/**
 * Ejercicio 7: Sistema de Etiquetas para un Blog
 *
 * Este programa usa Sets para gestionar etiquetas únicas
 * y realizar operaciones de conjuntos (unión, intersección, diferencia).
 */

// ============================================
// DATOS - Artículos del blog con sus etiquetas
// ============================================

const articulos = [
    {
        titulo: "Introducción a JavaScript",
        etiquetas: ["javascript", "programacion", "web", "principiantes"]
    },
    {
        titulo: "CSS Grid vs Flexbox",
        etiquetas: ["css", "diseño", "web", "layout"]
    },
    {
        titulo: "React para principiantes",
        etiquetas: ["react", "javascript", "frameworks", "principiantes"]
    },
    {
        titulo: "Node.js y Express",
        etiquetas: ["nodejs", "javascript", "backend", "api"]
    },
    {
        titulo: "Diseño responsive",
        etiquetas: ["css", "diseño", "responsive", "movil"]
    }
];

// ============================================
// FUNCIONES
// ============================================

/**
 * Obtiene todas las etiquetas únicas del blog
 * @param {object[]} listaArticulos - Array de artículos
 * @returns {Set} Set con todas las etiquetas únicas
 */
function obtenerTodasLasEtiquetas(listaArticulos) {
    const todasLasEtiquetas = new Set();

    for (let i = 0; i < listaArticulos.length; i++) {
        const etiquetasArticulo = listaArticulos[i].etiquetas;

        // Añadimos cada etiqueta al Set (los duplicados se ignoran automáticamente)
        for (let j = 0; j < etiquetasArticulo.length; j++) {
            todasLasEtiquetas.add(etiquetasArticulo[j]);
        }
    }

    return todasLasEtiquetas;
}

/**
 * Encuentra las etiquetas comunes entre dos arrays de etiquetas (intersección)
 * @param {string[]} etiquetas1 - Primer array de etiquetas
 * @param {string[]} etiquetas2 - Segundo array de etiquetas
 * @returns {Set} Set con las etiquetas en común
 */
function etiquetasComunes(etiquetas1, etiquetas2) {
    const set1 = new Set(etiquetas1);
    const set2 = new Set(etiquetas2);
    const comunes = new Set();

    // Recorremos el primer set y comprobamos si existe en el segundo
    for (const etiqueta of set1) {
        if (set2.has(etiqueta)) {
            comunes.add(etiqueta);
        }
    }

    return comunes;
}

/**
 * Encuentra las etiquetas que están en el primero pero no en el segundo (diferencia)
 * @param {string[]} etiquetas1 - Primer array de etiquetas
 * @param {string[]} etiquetas2 - Segundo array de etiquetas
 * @returns {Set} Set con las etiquetas únicas del primero
 */
const etiquetasUnicas = (etiquetas1, etiquetas2) => {
    const set1 = new Set(etiquetas1);
    const set2 = new Set(etiquetas2);
    const unicas = new Set();

    for (const etiqueta of set1) {
        if (!set2.has(etiqueta)) {
            unicas.add(etiqueta);
        }
    }

    return unicas;
};

/**
 * Encuentra artículos relacionados (que comparten al menos una etiqueta)
 * @param {object[]} listaArticulos - Array de artículos
 * @param {number} indiceArticulo - Índice del artículo de referencia
 * @returns {object[]} Array de objetos con título y etiquetas en común
 */
function articulosRelacionados(listaArticulos, indiceArticulo) {
    const articuloReferencia = listaArticulos[indiceArticulo];
    const etiquetasReferencia = articuloReferencia.etiquetas;
    const relacionados = [];

    for (let i = 0; i < listaArticulos.length; i++) {
        // No comparar el artículo consigo mismo
        if (i === indiceArticulo) {
            continue; // Saltar a la siguiente iteración
        }

        const otroArticulo = listaArticulos[i];
        const comunes = etiquetasComunes(etiquetasReferencia, otroArticulo.etiquetas);

        // Si hay al menos una etiqueta en común, es un artículo relacionado
        if (comunes.size > 0) {
            relacionados.push({
                titulo: otroArticulo.titulo,
                etiquetasComunes: comunes
            });
        }
    }

    return relacionados;
}

/**
 * Cuenta cuántas veces aparece cada etiqueta en el blog
 * @param {object[]} listaArticulos - Array de artículos
 * @returns {object} Objeto con el conteo de cada etiqueta
 */
const contarEtiquetas = (listaArticulos) => {
    const conteo = {};

    for (let i = 0; i < listaArticulos.length; i++) {
        const etiquetas = listaArticulos[i].etiquetas;

        for (let j = 0; j < etiquetas.length; j++) {
            const etiqueta = etiquetas[j];

            if (!conteo[etiqueta]) {
                conteo[etiqueta] = 0;
            }
            conteo[etiqueta]++;
        }
    }

    return conteo;
};

/**
 * BONUS: Genera una representación visual de la nube de etiquetas
 * @param {object} conteo - Objeto con el conteo de etiquetas
 * @returns {string[]} Array de strings con la representación visual
 */
function generarNubeEtiquetas(conteo) {
    const nube = [];

    // Convertimos el objeto a array para poder ordenarlo
    const etiquetasArray = [];
    for (const etiqueta in conteo) {
        etiquetasArray.push({
            nombre: etiqueta,
            cantidad: conteo[etiqueta]
        });
    }

    // Ordenamos por cantidad (de mayor a menor)
    for (let i = 0; i < etiquetasArray.length - 1; i++) {
        for (let j = i + 1; j < etiquetasArray.length; j++) {
            if (etiquetasArray[j].cantidad > etiquetasArray[i].cantidad) {
                const temp = etiquetasArray[i];
                etiquetasArray[i] = etiquetasArray[j];
                etiquetasArray[j] = temp;
            }
        }
    }

    // Generamos la representación visual
    for (let i = 0; i < etiquetasArray.length; i++) {
        const et = etiquetasArray[i];
        const barras = "█".repeat(et.cantidad);
        nube.push(et.nombre + ": " + barras + " (" + et.cantidad + ")");
    }

    return nube;
}

/**
 * Convierte un Set a string legible
 */
function setToString(set) {
    return Array.from(set).join(", ");
}

// ============================================
// PROGRAMA PRINCIPAL
// ============================================

console.log("📝 SISTEMA DE ETIQUETAS DEL BLOG");
console.log("================================");
console.log("");

// 1. Obtener todas las etiquetas únicas
const todasEtiquetas = obtenerTodasLasEtiquetas(articulos);
console.log("🏷️ Todas las etiquetas del blog (únicas):");
console.log(setToString(todasEtiquetas));
console.log("");
console.log("Total: " + todasEtiquetas.size + " etiquetas únicas");
console.log("");

// 2. Comparar dos artículos
const indice1 = 0; // "Introducción a JavaScript"
const indice2 = 2; // "React para principiantes"
const articulo1 = articulos[indice1];
const articulo2 = articulos[indice2];

console.log('🔍 Comparando "' + articulo1.titulo + '" con "' + articulo2.titulo + '":');

const comunes = etiquetasComunes(articulo1.etiquetas, articulo2.etiquetas);
console.log("Etiquetas en común: " + (comunes.size > 0 ? setToString(comunes) : "(ninguna)"));

const soloEnPrimero = etiquetasUnicas(articulo1.etiquetas, articulo2.etiquetas);
console.log("Etiquetas solo en el primero: " + setToString(soloEnPrimero));

const soloEnSegundo = etiquetasUnicas(articulo2.etiquetas, articulo1.etiquetas);
console.log("Etiquetas solo en el segundo: " + setToString(soloEnSegundo));
console.log("");

// 3. Encontrar artículos relacionados
console.log('📰 Artículos relacionados con "' + articulo1.titulo + '":');
const relacionados = articulosRelacionados(articulos, indice1);

if (relacionados.length === 0) {
    console.log("No hay artículos relacionados.");
} else {
    for (let i = 0; i < relacionados.length; i++) {
        const rel = relacionados[i];
        console.log('- "' + rel.titulo + '" (etiquetas en común: ' + setToString(rel.etiquetasComunes) + ')');
    }
}
console.log("");

// 4. Ranking de etiquetas más usadas
console.log("📊 Ranking de etiquetas más usadas:");
const conteo = contarEtiquetas(articulos);
const nubeEtiquetas = generarNubeEtiquetas(conteo);

for (let i = 0; i < nubeEtiquetas.length; i++) {
    console.log((i + 1) + ". " + nubeEtiquetas[i]);
}
console.log("");

// 5. Demostración de propiedades del Set
console.log("💡 Demostración de Set:");
const miSet = new Set();
console.log("Set vacío creado. Tamaño: " + miSet.size);

miSet.add("javascript");
miSet.add("python");
miSet.add("javascript"); // Duplicado - será ignorado
console.log("Después de añadir javascript, python, javascript: " + setToString(miSet));
console.log("Tamaño: " + miSet.size + " (el duplicado fue ignorado)");

console.log("¿Contiene 'python'? " + miSet.has("python"));
console.log("¿Contiene 'ruby'? " + miSet.has("ruby"));

miSet.delete("python");
console.log("Después de eliminar 'python': " + setToString(miSet));

