/**
 * Ejercicio 5: Gestión de Perfiles de Usuario
 *
 * Este programa trabaja con objetos literales, acceso a propiedades
 * y validación usando valores truthy/falsy.
 */

// ============================================
// DATOS - Objetos de usuario
// ============================================

const usuarioCompleto = {
    nombre: "María García",
    email: "maria@example.com",
    edad: 28,
    telefono: "612345678",
    direccion: "Calle Mayor 15, Madrid",
    premium: true
};

const usuarioIncompleto = {
    nombre: "Pedro López",
    email: "",           // String vacío - falsy
    edad: 0,             // Cero - falsy (pero podría ser válido en otros contextos)
    telefono: null,      // Null - falsy
    direccion: undefined,// Undefined - falsy
    premium: false       // False - falsy (pero es un valor válido para booleanos)
};

// Lista de campos que debe tener un perfil
const camposPerfil = ["nombre", "email", "edad", "telefono", "direccion", "premium"];

// ============================================
// FUNCIONES
// ============================================

/**
 * Muestra el perfil de un usuario de forma formateada
 * Usa notación de punto para acceder a las propiedades
 * @param {object} usuario - El objeto usuario
 */
function mostrarPerfil(usuario) {
    console.log("👤 PERFIL DE USUARIO");
    console.log("====================");

    // Acceso con notación de punto
    console.log("Nombre: " + (usuario.nombre || "(no especificado)"));
    console.log("Email: " + (usuario.email || "(no especificado)"));

    // Para la edad, 0 es falsy pero queremos mostrar "0 años" o "(no especificada)"
    if (usuario.edad || usuario.edad === 0) {
        console.log("Edad: " + usuario.edad + " años");
    } else {
        console.log("Edad: (no especificada)");
    }

    console.log("Teléfono: " + (usuario.telefono || "(no especificado)"));
    console.log("Dirección: " + (usuario.direccion || "(no especificada)"));

    // Para premium, false es un valor válido
    console.log("Cuenta Premium: " + (usuario.premium ? "Sí" : "No"));
}

/**
 * Valida el perfil y muestra qué campos están completos
 * Usa notación de corchetes para acceso dinámico
 * @param {object} usuario - El objeto usuario
 * @returns {number} Cantidad de campos completos
 */
function validarPerfil(usuario) {
    console.log("");
    console.log("✅ Validación del perfil:");

    let camposCompletos = 0;

    for (let i = 0; i < camposPerfil.length; i++) {
        const campo = camposPerfil[i];
        // Acceso dinámico con notación de corchetes
        const valor = usuario[campo];

        // Caso especial: 'premium' puede ser false y es válido
        if (campo === "premium") {
            // Para booleanos, verificamos que sea exactamente true o false
            if (valor === true || valor === false) {
                console.log("- " + campo + ": ✓ Completo (valor: " + valor + ")");
                camposCompletos++;
            } else {
                console.log("- " + campo + ": ✗ Falta");
            }
        }
        // Caso especial: edad 0 podría considerarse no válida
        else if (campo === "edad") {
            if (valor && valor > 0) {
                console.log("- " + campo + ": ✓ Completo");
                camposCompletos++;
            } else {
                console.log("- " + campo + ": ✗ Falta");
            }
        }
        // Caso general: si el valor es truthy, está completo
        else {
            if (valor) {
                console.log("- " + campo + ": ✓ Completo");
                camposCompletos++;
            } else {
                console.log("- " + campo + ": ✗ Falta");
            }
        }
    }

    console.log("");
    console.log("Campos completos: " + camposCompletos + "/" + camposPerfil.length);

    return camposCompletos;
}

/**
 * Obtiene una propiedad del usuario de forma dinámica
 * Demuestra el uso de notación de corchetes con variables
 * @param {object} usuario - El objeto usuario
 * @param {string} nombrePropiedad - El nombre de la propiedad a obtener
 * @returns {any} El valor de la propiedad
 */
const obtenerPropiedad = (usuario, nombrePropiedad) => {
    // Con notación de corchetes podemos usar una variable
    return usuario[nombrePropiedad];
};

/**
 * BONUS: Obtiene los campos que faltan en un perfil
 * @param {object} usuario - El objeto usuario
 * @returns {string[]} Array con los nombres de los campos que faltan
 */
const obtenerCamposFaltantes = (usuario) => {
    const faltantes = [];

    for (let i = 0; i < camposPerfil.length; i++) {
        const campo = camposPerfil[i];
        const valor = usuario[campo];

        // Verificamos si falta (considerando casos especiales)
        let falta = false;

        if (campo === "premium") {
            falta = valor !== true && valor !== false;
        } else if (campo === "edad") {
            falta = !valor || valor <= 0;
        } else {
            falta = !valor;
        }

        if (falta) {
            faltantes.push(campo);
        }
    }

    return faltantes;
};

/**
 * Muestra una tabla de valores truthy/falsy para referencia
 */
function mostrarTablaTruthyFalsy() {
    console.log("");
    console.log("📚 REFERENCIA: Valores Truthy y Falsy");
    console.log("=====================================");

    const ejemplos = [
        { valor: false, descripcion: "false" },
        { valor: 0, descripcion: "0" },
        { valor: "", descripcion: '""' },
        { valor: null, descripcion: "null" },
        { valor: undefined, descripcion: "undefined" },
        { valor: true, descripcion: "true" },
        { valor: 1, descripcion: "1" },
        { valor: "hola", descripcion: '"hola"' },
        { valor: [], descripcion: "[]" },
        { valor: {}, descripcion: "{}" }
    ];

    for (let i = 0; i < ejemplos.length; i++) {
        const ejemplo = ejemplos[i];
        const esTruthy = ejemplo.valor ? "truthy" : "falsy";
        console.log(ejemplo.descripcion + " → " + esTruthy);
    }
}

// ============================================
// PROGRAMA PRINCIPAL
// ============================================

// Mostrar perfil completo
mostrarPerfil(usuarioCompleto);
validarPerfil(usuarioCompleto);

console.log("");
console.log("═".repeat(50));
console.log("");

// Mostrar perfil incompleto
mostrarPerfil(usuarioIncompleto);
validarPerfil(usuarioIncompleto);

// Demostrar obtención dinámica de propiedades
console.log("");
console.log("🔍 Acceso dinámico a propiedades:");
const propiedadBuscada = "email";
console.log("Buscando propiedad: " + propiedadBuscada);
console.log("Valor en usuarioCompleto: " + obtenerPropiedad(usuarioCompleto, propiedadBuscada));
console.log("Valor en usuarioIncompleto: " + (obtenerPropiedad(usuarioIncompleto, propiedadBuscada) || "(vacío)"));

// BONUS: Mostrar campos faltantes
console.log("");
console.log("💡 BONUS - Campos faltantes en usuarioIncompleto:");
const faltantes = obtenerCamposFaltantes(usuarioIncompleto);
console.log(faltantes.join(", "));

// Mostrar tabla de referencia
mostrarTablaTruthyFalsy();

