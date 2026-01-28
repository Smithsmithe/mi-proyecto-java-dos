/**
 * Ejercicio 10: Sistema Completo de Gestión de Biblioteca
 *
 * Este ejercicio integra todos los conceptos aprendidos:
 * - Variables y constantes
 * - Funciones tradicionales y flecha
 * - Control de flujo (if-else, switch)
 * - Bucles (for, while)
 * - Arrays y objetos
 * - Sets y Maps
 * - Matrices bidimensionales
 */

// ============================================
// CONSTANTES DE CONFIGURACIÓN
// ============================================

// Límites de préstamo según tipo de usuario
const LIMITE_ESTUDIANTE = 3;
const LIMITE_PROFESOR = 5;
const LIMITE_GENERAL = 2;

// Estados de préstamo
const ESTADO_ACTIVO = "activo";
const ESTADO_DEVUELTO = "devuelto";

// Géneros disponibles
const GENEROS = ["novela", "ciencia_ficcion", "infantil", "historia", "poesia", "teatro"];

// Meses para la matriz de estadísticas
const MESES = ["Ene", "Feb", "Mar", "Abr", "May", "Jun"];

// ============================================
// ESTRUCTURAS DE DATOS PRINCIPALES
// ============================================

// Array de objetos - Catálogo de libros
const catalogo = [];

// Map - Usuarios registrados (ID → objeto usuario)
const usuarios = new Map();

// Set - Usuarios con préstamos activos
const usuariosConPrestamos = new Set();

// Array - Historial completo de préstamos
const historialPrestamos = [];

// Map - Libros organizados por género (género → array de ISBNs)
const librosPorGenero = new Map();

// Map - Contador de préstamos por libro (ISBN → número de préstamos)
const contadorPrestamosLibro = new Map();

// Matriz - Préstamos por género y mes [género][mes]
let matrizPrestamosGeneroMes = [];

// ============================================
// FUNCIONES DE INICIALIZACIÓN
// ============================================

/**
 * Inicializa la matriz de préstamos por género y mes
 */
function inicializarMatrizPrestamos() {
    matrizPrestamosGeneroMes = [];

    for (let i = 0; i < GENEROS.length; i++) {
        const filaGenero = [];
        for (let j = 0; j < MESES.length; j++) {
            filaGenero.push(0);
        }
        matrizPrestamosGeneroMes.push(filaGenero);
    }
}

/**
 * Inicializa el Map de libros por género
 */
function inicializarLibrosPorGenero() {
    for (let i = 0; i < GENEROS.length; i++) {
        librosPorGenero.set(GENEROS[i], []);
    }
}

// ============================================
// FUNCIONES DE GESTIÓN DE LIBROS
// ============================================

/**
 * Agrega un libro al catálogo
 * @param {object} libro - El libro a agregar
 * @returns {boolean} true si se agregó correctamente
 */
function agregarLibro(libro) {
    // Validar que el libro tenga los campos necesarios
    if (!libro.isbn || !libro.titulo || !libro.autor || !libro.genero) {
        console.log("❌ Error: El libro debe tener ISBN, título, autor y género");
        return false;
    }

    // Verificar que no exista ya un libro con ese ISBN
    const existente = obtenerLibroPorISBN(libro.isbn);
    if (existente) {
        console.log("❌ Error: Ya existe un libro con ISBN " + libro.isbn);
        return false;
    }

    // Agregar valores por defecto si no se especificaron
    const libroCompleto = {
        isbn: libro.isbn,
        titulo: libro.titulo,
        autor: libro.autor,
        genero: libro.genero,
        anioPublicacion: libro.anioPublicacion || 0,
        copiasTotales: libro.copiasTotales || 1,
        copiasDisponibles: libro.copiasDisponibles || libro.copiasTotales || 1
    };

    catalogo.push(libroCompleto);

    // Agregar al índice por género
    if (librosPorGenero.has(libro.genero)) {
        librosPorGenero.get(libro.genero).push(libro.isbn);
    }

    // Inicializar contador de préstamos
    contadorPrestamosLibro.set(libro.isbn, 0);

    return true;
}

/**
 * Obtiene un libro por su ISBN
 * @param {string} isbn - El ISBN del libro
 * @returns {object|null} El libro o null si no existe
 */
function obtenerLibroPorISBN(isbn) {
    for (let i = 0; i < catalogo.length; i++) {
        if (catalogo[i].isbn === isbn) {
            return catalogo[i];
        }
    }
    return null;
}

/**
 * Busca libros por un criterio específico
 * @param {string} criterio - "titulo", "autor" o "genero"
 * @param {string} valor - El valor a buscar
 * @returns {object[]} Array de libros que coinciden
 */
function buscarLibros(criterio, valor) {
    const resultados = [];
    const valorLower = valor.toLowerCase();

    for (let i = 0; i < catalogo.length; i++) {
        const libro = catalogo[i];
        let campoLibro = "";

        switch (criterio) {
            case "titulo":
                campoLibro = libro.titulo.toLowerCase();
                break;
            case "autor":
                campoLibro = libro.autor.toLowerCase();
                break;
            case "genero":
                campoLibro = libro.genero.toLowerCase();
                break;
            default:
                continue;
        }

        // Búsqueda parcial (contiene el valor)
        if (campoLibro.includes(valorLower)) {
            resultados.push(libro);
        }
    }

    return resultados;
}

/**
 * Obtiene todos los libros con copias disponibles
 * @returns {object[]} Array de libros disponibles
 */
const obtenerLibrosDisponibles = () => {
    const disponibles = [];

    for (let i = 0; i < catalogo.length; i++) {
        if (catalogo[i].copiasDisponibles > 0) {
            disponibles.push(catalogo[i]);
        }
    }

    return disponibles;
};

/**
 * Verifica si un libro tiene copias disponibles
 * @param {string} isbn - El ISBN del libro
 * @returns {boolean} true si hay copias disponibles
 */
const verificarDisponibilidad = (isbn) => {
    const libro = obtenerLibroPorISBN(isbn);
    return libro && libro.copiasDisponibles > 0;
};

// ============================================
// FUNCIONES DE GESTIÓN DE USUARIOS
// ============================================

/**
 * Registra un nuevo usuario
 * @param {object} usuario - El usuario a registrar
 * @returns {boolean} true si se registró correctamente
 */
function registrarUsuario(usuario) {
    if (!usuario.id || !usuario.nombre || !usuario.tipo) {
        console.log("❌ Error: El usuario debe tener ID, nombre y tipo");
        return false;
    }

    if (usuarios.has(usuario.id)) {
        console.log("❌ Error: Ya existe un usuario con ID " + usuario.id);
        return false;
    }

    const usuarioCompleto = {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email || "",
        tipo: usuario.tipo,
        librosPrestados: [],
        historialPrestamos: [],
        totalPrestamosHistorico: 0
    };

    usuarios.set(usuario.id, usuarioCompleto);
    return true;
}

/**
 * Obtiene un usuario por su ID
 * @param {string} id - El ID del usuario
 * @returns {object|undefined} El usuario o undefined
 */
const obtenerUsuario = (id) => {
    return usuarios.get(id);
};

/**
 * Obtiene el límite de préstamos según el tipo de usuario
 * @param {string} tipo - El tipo de usuario
 * @returns {number} El límite de préstamos
 */
function obtenerLimitePrestamoUsuario(tipo) {
    switch (tipo) {
        case "estudiante":
            return LIMITE_ESTUDIANTE;
        case "profesor":
            return LIMITE_PROFESOR;
        case "general":
            return LIMITE_GENERAL;
        default:
            return LIMITE_GENERAL;
    }
}

/**
 * Verifica si un usuario puede realizar más préstamos
 * @param {string} idUsuario - El ID del usuario
 * @returns {boolean} true si puede realizar más préstamos
 */
function puedeRealizarPrestamo(idUsuario) {
    const usuario = obtenerUsuario(idUsuario);

    if (!usuario) {
        return false;
    }

    const limite = obtenerLimitePrestamoUsuario(usuario.tipo);
    return usuario.librosPrestados.length < limite;
}

// ============================================
// FUNCIONES DE GESTIÓN DE PRÉSTAMOS
// ============================================

/**
 * Realiza un préstamo de un libro a un usuario
 * @param {string} idUsuario - El ID del usuario
 * @param {string} isbn - El ISBN del libro
 * @returns {object} Resultado de la operación
 */
function realizarPrestamo(idUsuario, isbn) {
    // Verificar que el usuario existe
    const usuario = obtenerUsuario(idUsuario);
    if (!usuario) {
        return { exito: false, mensaje: "Usuario no encontrado" };
    }

    // Verificar que el libro existe
    const libro = obtenerLibroPorISBN(isbn);
    if (!libro) {
        return { exito: false, mensaje: "Libro no encontrado" };
    }

    // Verificar disponibilidad
    if (!verificarDisponibilidad(isbn)) {
        return { exito: false, mensaje: "No hay copias disponibles de este libro" };
    }

    // Verificar límite de préstamos
    if (!puedeRealizarPrestamo(idUsuario)) {
        const limite = obtenerLimitePrestamoUsuario(usuario.tipo);
        return { exito: false, mensaje: "Usuario ha alcanzado el límite de préstamos (" + limite + ")" };
    }

    // Verificar que el usuario no tenga ya este libro
    if (usuario.librosPrestados.includes(isbn)) {
        return { exito: false, mensaje: "El usuario ya tiene prestado este libro" };
    }

    // Realizar el préstamo
    libro.copiasDisponibles--;
    usuario.librosPrestados.push(isbn);
    usuario.totalPrestamosHistorico++;

    // Agregar al set de usuarios con préstamos
    usuariosConPrestamos.add(idUsuario);

    // Incrementar contador de préstamos del libro
    const prestamosActuales = contadorPrestamosLibro.get(isbn) || 0;
    contadorPrestamosLibro.set(isbn, prestamosActuales + 1);

    // Crear registro de préstamo
    const prestamo = {
        isbn: isbn,
        idUsuario: idUsuario,
        tituloLibro: libro.titulo,
        nombreUsuario: usuario.nombre,
        fechaPrestamo: new Date().toISOString().split('T')[0],
        fechaDevolucion: null,
        estado: ESTADO_ACTIVO
    };

    historialPrestamos.push(prestamo);
    usuario.historialPrestamos.push(prestamo);

    // Actualizar matriz de estadísticas
    const indiceMes = new Date().getMonth();
    const indiceGenero = GENEROS.indexOf(libro.genero);
    if (indiceGenero !== -1 && indiceMes < MESES.length) {
        matrizPrestamosGeneroMes[indiceGenero][indiceMes]++;
    }

    return {
        exito: true,
        mensaje: "Préstamo realizado: \"" + libro.titulo + "\" → " + usuario.nombre
    };
}

/**
 * Realiza la devolución de un libro
 * @param {string} idUsuario - El ID del usuario
 * @param {string} isbn - El ISBN del libro
 * @returns {object} Resultado de la operación
 */
function realizarDevolucion(idUsuario, isbn) {
    const usuario = obtenerUsuario(idUsuario);
    if (!usuario) {
        return { exito: false, mensaje: "Usuario no encontrado" };
    }

    const libro = obtenerLibroPorISBN(isbn);
    if (!libro) {
        return { exito: false, mensaje: "Libro no encontrado" };
    }

    // Verificar que el usuario tiene el libro
    const indicePrestamo = usuario.librosPrestados.indexOf(isbn);
    if (indicePrestamo === -1) {
        return { exito: false, mensaje: "El usuario no tiene prestado este libro" };
    }

    // Realizar la devolución
    libro.copiasDisponibles++;
    usuario.librosPrestados.splice(indicePrestamo, 1);

    // Si el usuario no tiene más préstamos, quitarlo del set
    if (usuario.librosPrestados.length === 0) {
        usuariosConPrestamos.delete(idUsuario);
    }

    // Actualizar el registro del préstamo en el historial
    for (let i = historialPrestamos.length - 1; i >= 0; i--) {
        const p = historialPrestamos[i];
        if (p.isbn === isbn && p.idUsuario === idUsuario && p.estado === ESTADO_ACTIVO) {
            p.estado = ESTADO_DEVUELTO;
            p.fechaDevolucion = new Date().toISOString().split('T')[0];
            break;
        }
    }

    return {
        exito: true,
        mensaje: "Devolución realizada: \"" + libro.titulo + "\" ← " + usuario.nombre
    };
}

/**
 * Obtiene todos los préstamos activos
 * @returns {object[]} Array de préstamos activos
 */
const obtenerPrestamosActivos = () => {
    const activos = [];

    for (let i = 0; i < historialPrestamos.length; i++) {
        if (historialPrestamos[i].estado === ESTADO_ACTIVO) {
            activos.push(historialPrestamos[i]);
        }
    }

    return activos;
};

// ============================================
// FUNCIONES DE ESTADÍSTICAS Y REPORTES
// ============================================

/**
 * Genera estadísticas generales de la biblioteca
 * @returns {object} Objeto con las estadísticas
 */
function generarEstadisticasGenerales() {
    let copiasTotales = 0;
    let copiasDisponibles = 0;

    for (let i = 0; i < catalogo.length; i++) {
        copiasTotales += catalogo[i].copiasTotales;
        copiasDisponibles += catalogo[i].copiasDisponibles;
    }

    return {
        totalLibros: catalogo.length,
        copiasTotales: copiasTotales,
        copiasDisponibles: copiasDisponibles,
        copiasPrestadas: copiasTotales - copiasDisponibles,
        totalUsuarios: usuarios.size,
        usuariosActivos: usuariosConPrestamos.size,
        totalPrestamosHistorico: historialPrestamos.length,
        prestamosActivos: obtenerPrestamosActivos().length
    };
}

/**
 * Obtiene los N libros más prestados
 * @param {number} n - Cantidad de libros a devolver
 * @returns {object[]} Array de objetos con libro y número de préstamos
 */
function obtenerLibrosMasPrestados(n) {
    // Convertir el Map a array para poder ordenar
    const arrayPrestamos = [];

    for (const [isbn, prestamos] of contadorPrestamosLibro) {
        const libro = obtenerLibroPorISBN(isbn);
        if (libro) {
            arrayPrestamos.push({
                libro: libro,
                prestamos: prestamos
            });
        }
    }

    // Ordenar de mayor a menor
    for (let i = 0; i < arrayPrestamos.length - 1; i++) {
        for (let j = i + 1; j < arrayPrestamos.length; j++) {
            if (arrayPrestamos[j].prestamos > arrayPrestamos[i].prestamos) {
                const temp = arrayPrestamos[i];
                arrayPrestamos[i] = arrayPrestamos[j];
                arrayPrestamos[j] = temp;
            }
        }
    }

    // Devolver solo los primeros n
    const resultado = [];
    for (let i = 0; i < n && i < arrayPrestamos.length; i++) {
        resultado.push(arrayPrestamos[i]);
    }

    return resultado;
}

/**
 * Obtiene los N usuarios más activos
 * @param {number} n - Cantidad de usuarios a devolver
 * @returns {object[]} Array de objetos con usuario y estadísticas
 */
function obtenerUsuariosMasActivos(n) {
    const arrayUsuarios = [];

    for (const [id, usuario] of usuarios) {
        arrayUsuarios.push({
            usuario: usuario,
            totalPrestamos: usuario.totalPrestamosHistorico
        });
    }

    // Ordenar de mayor a menor
    for (let i = 0; i < arrayUsuarios.length - 1; i++) {
        for (let j = i + 1; j < arrayUsuarios.length; j++) {
            if (arrayUsuarios[j].totalPrestamos > arrayUsuarios[i].totalPrestamos) {
                const temp = arrayUsuarios[i];
                arrayUsuarios[i] = arrayUsuarios[j];
                arrayUsuarios[j] = temp;
            }
        }
    }

    const resultado = [];
    for (let i = 0; i < n && i < arrayUsuarios.length; i++) {
        resultado.push(arrayUsuarios[i]);
    }

    return resultado;
}

/**
 * Genera la matriz de préstamos por género
 * @returns {string} Representación visual de la matriz
 */
function mostrarMatrizPrestamosGenero() {
    let resultado = "";

    // Cabecera
    resultado += "              ";
    for (let j = 0; j < MESES.length; j++) {
        resultado += MESES[j].padStart(5);
    }
    resultado += "  Total\n";

    // Filas (géneros)
    for (let i = 0; i < GENEROS.length; i++) {
        let total = 0;
        resultado += GENEROS[i].padEnd(14);

        for (let j = 0; j < MESES.length; j++) {
            resultado += String(matrizPrestamosGeneroMes[i][j]).padStart(5);
            total += matrizPrestamosGeneroMes[i][j];
        }

        resultado += String(total).padStart(7) + "\n";
    }

    return resultado;
}

/**
 * Obtiene estadísticas de libros por género
 * @returns {object[]} Array con estadísticas por género
 */
function obtenerEstadisticasPorGenero() {
    const stats = [];

    for (const [genero, isbns] of librosPorGenero) {
        let disponibles = 0;
        let totales = 0;

        for (let i = 0; i < isbns.length; i++) {
            const libro = obtenerLibroPorISBN(isbns[i]);
            if (libro) {
                disponibles += libro.copiasDisponibles;
                totales += libro.copiasTotales;
            }
        }

        stats.push({
            genero: genero,
            cantidadLibros: isbns.length,
            copiasTotales: totales,
            copiasDisponibles: disponibles
        });
    }

    return stats;
}

// ============================================
// FUNCIONES DE VISUALIZACIÓN
// ============================================

/**
 * Muestra el catálogo de libros formateado
 */
function mostrarCatalogo() {
    console.log("\n📖 CATÁLOGO DE LIBROS (" + catalogo.length + " libros)");
    console.log("-".repeat(60));

    for (let i = 0; i < catalogo.length; i++) {
        const libro = catalogo[i];
        console.log((i + 1) + ". \"" + libro.titulo + "\" - " + libro.autor +
                    " (" + libro.genero + ") [" + libro.copiasDisponibles + "/" +
                    libro.copiasTotales + " disponibles]");
    }
}

/**
 * Muestra los usuarios registrados
 */
function mostrarUsuarios() {
    console.log("\n👥 USUARIOS REGISTRADOS (" + usuarios.size + " usuarios)");
    console.log("-".repeat(60));

    for (const [id, usuario] of usuarios) {
        const prestados = usuario.librosPrestados.length;
        const limite = obtenerLimitePrestamoUsuario(usuario.tipo);
        console.log("- " + usuario.nombre + " (" + usuario.tipo + ") - " +
                    prestados + "/" + limite + " libros prestados");
    }
}

/**
 * Muestra los préstamos activos
 */
function mostrarPrestamosActivos() {
    const activos = obtenerPrestamosActivos();

    console.log("\n📋 PRÉSTAMOS ACTIVOS (" + activos.length + ")");
    console.log("-".repeat(60));

    if (activos.length === 0) {
        console.log("No hay préstamos activos.");
        return;
    }

    for (let i = 0; i < activos.length; i++) {
        const p = activos[i];
        console.log("- \"" + p.tituloLibro + "\" → " + p.nombreUsuario +
                    " (desde " + p.fechaPrestamo + ")");
    }
}

// ============================================
// DATOS DE PRUEBA E INICIALIZACIÓN
// ============================================

function cargarDatosDePrueba() {
    // Inicializar estructuras
    inicializarMatrizPrestamos();
    inicializarLibrosPorGenero();

    // Agregar libros
    agregarLibro({
        isbn: "978-84-376-0494-7",
        titulo: "Don Quijote de la Mancha",
        autor: "Miguel de Cervantes",
        genero: "novela",
        anioPublicacion: 1605,
        copiasTotales: 3,
        copiasDisponibles: 3
    });

    agregarLibro({
        isbn: "978-84-204-8499-3",
        titulo: "Cien años de soledad",
        autor: "Gabriel García Márquez",
        genero: "novela",
        anioPublicacion: 1967,
        copiasTotales: 2,
        copiasDisponibles: 2
    });

    agregarLibro({
        isbn: "978-84-9838-074-5",
        titulo: "El principito",
        autor: "Antoine de Saint-Exupéry",
        genero: "infantil",
        anioPublicacion: 1943,
        copiasTotales: 4,
        copiasDisponibles: 4
    });

    agregarLibro({
        isbn: "978-84-663-2738-8",
        titulo: "1984",
        autor: "George Orwell",
        genero: "ciencia_ficcion",
        anioPublicacion: 1949,
        copiasTotales: 2,
        copiasDisponibles: 2
    });

    agregarLibro({
        isbn: "978-84-9759-632-1",
        titulo: "La sombra del viento",
        autor: "Carlos Ruiz Zafón",
        genero: "novela",
        anioPublicacion: 2001,
        copiasTotales: 3,
        copiasDisponibles: 3
    });

    agregarLibro({
        isbn: "978-84-233-4789-1",
        titulo: "Breve historia del tiempo",
        autor: "Stephen Hawking",
        genero: "ciencia_ficcion",
        anioPublicacion: 1988,
        copiasTotales: 2,
        copiasDisponibles: 2
    });

    agregarLibro({
        isbn: "978-84-9104-925-2",
        titulo: "Sapiens",
        autor: "Yuval Noah Harari",
        genero: "historia",
        anioPublicacion: 2011,
        copiasTotales: 3,
        copiasDisponibles: 3
    });

    agregarLibro({
        isbn: "978-84-670-5052-1",
        titulo: "Romeo y Julieta",
        autor: "William Shakespeare",
        genero: "teatro",
        anioPublicacion: 1597,
        copiasTotales: 2,
        copiasDisponibles: 2
    });

    // Registrar usuarios
    registrarUsuario({
        id: "U001",
        nombre: "Ana García",
        email: "ana@email.com",
        tipo: "estudiante"
    });

    registrarUsuario({
        id: "U002",
        nombre: "Carlos López",
        email: "carlos@email.com",
        tipo: "profesor"
    });

    registrarUsuario({
        id: "U003",
        nombre: "María Rodríguez",
        email: "maria@email.com",
        tipo: "estudiante"
    });

    registrarUsuario({
        id: "U004",
        nombre: "Pedro Sánchez",
        email: "pedro@email.com",
        tipo: "general"
    });

    registrarUsuario({
        id: "U005",
        nombre: "Laura Martínez",
        email: "laura@email.com",
        tipo: "profesor"
    });
}

// ============================================
// PROGRAMA PRINCIPAL
// ============================================

console.log("╔══════════════════════════════════════════════════════════╗");
console.log("║       📚 SISTEMA DE GESTIÓN DE BIBLIOTECA 📚            ║");
console.log("╚══════════════════════════════════════════════════════════╝");

// Cargar datos iniciales
cargarDatosDePrueba();

// Mostrar catálogo y usuarios
mostrarCatalogo();
mostrarUsuarios();

// Realizar operaciones de préstamo
console.log("\n" + "═".repeat(60));
console.log("📋 OPERACIONES DE PRÉSTAMO");
console.log("═".repeat(60));

let resultado;

resultado = realizarPrestamo("U001", "978-84-376-0494-7");
console.log(resultado.exito ? "✓ " + resultado.mensaje : "✗ " + resultado.mensaje);

resultado = realizarPrestamo("U001", "978-84-204-8499-3");
console.log(resultado.exito ? "✓ " + resultado.mensaje : "✗ " + resultado.mensaje);

resultado = realizarPrestamo("U002", "978-84-9838-074-5");
console.log(resultado.exito ? "✓ " + resultado.mensaje : "✗ " + resultado.mensaje);

resultado = realizarPrestamo("U002", "978-84-663-2738-8");
console.log(resultado.exito ? "✓ " + resultado.mensaje : "✗ " + resultado.mensaje);

resultado = realizarPrestamo("U003", "978-84-376-0494-7");
console.log(resultado.exito ? "✓ " + resultado.mensaje : "✗ " + resultado.mensaje);

resultado = realizarPrestamo("U003", "978-84-9838-074-5");
console.log(resultado.exito ? "✓ " + resultado.mensaje : "✗ " + resultado.mensaje);

resultado = realizarPrestamo("U004", "978-84-9759-632-1");
console.log(resultado.exito ? "✓ " + resultado.mensaje : "✗ " + resultado.mensaje);

resultado = realizarPrestamo("U004", "978-84-9104-925-2");
console.log(resultado.exito ? "✓ " + resultado.mensaje : "✗ " + resultado.mensaje);

// Intentar préstamo que excede límite (usuario general solo puede tener 2)
resultado = realizarPrestamo("U004", "978-84-670-5052-1");
console.log(resultado.exito ? "✓ " + resultado.mensaje : "✗ " + resultado.mensaje);

// Realizar una devolución
resultado = realizarDevolucion("U001", "978-84-204-8499-3");
console.log(resultado.exito ? "✓ " + resultado.mensaje : "✗ " + resultado.mensaje);

// Mostrar préstamos activos
mostrarPrestamosActivos();

// Búsqueda de libros
console.log("\n" + "═".repeat(60));
console.log("🔍 BÚSQUEDA DE LIBROS");
console.log("═".repeat(60));

console.log("\nBuscando libros por autor 'García':");
const resultadosBusqueda = buscarLibros("autor", "García");
for (let i = 0; i < resultadosBusqueda.length; i++) {
    console.log("  - \"" + resultadosBusqueda[i].titulo + "\" de " + resultadosBusqueda[i].autor);
}

console.log("\nBuscando libros del género 'novela':");
const novelasEncontradas = buscarLibros("genero", "novela");
for (let i = 0; i < novelasEncontradas.length; i++) {
    console.log("  - \"" + novelasEncontradas[i].titulo + "\"");
}

// Estadísticas generales
console.log("\n" + "═".repeat(60));
console.log("📊 ESTADÍSTICAS GENERALES");
console.log("═".repeat(60));

const stats = generarEstadisticasGenerales();
console.log("Total de libros en catálogo: " + stats.totalLibros);
console.log("Copias totales: " + stats.copiasTotales);
console.log("Copias disponibles: " + stats.copiasDisponibles);
console.log("Copias prestadas: " + stats.copiasPrestadas);
console.log("Usuarios registrados: " + stats.totalUsuarios);
console.log("Usuarios con préstamos activos: " + stats.usuariosActivos);
console.log("Total préstamos histórico: " + stats.totalPrestamosHistorico);

// Top libros más prestados
console.log("\n🏆 TOP 3 LIBROS MÁS PRESTADOS");
console.log("-".repeat(40));
const topLibros = obtenerLibrosMasPrestados(3);
for (let i = 0; i < topLibros.length; i++) {
    console.log((i + 1) + ". \"" + topLibros[i].libro.titulo + "\" - " +
                topLibros[i].prestamos + " préstamos");
}

// Top usuarios más activos
console.log("\n👑 TOP 3 USUARIOS MÁS ACTIVOS");
console.log("-".repeat(40));
const topUsuarios = obtenerUsuariosMasActivos(3);
for (let i = 0; i < topUsuarios.length; i++) {
    console.log((i + 1) + ". " + topUsuarios[i].usuario.nombre + " - " +
                topUsuarios[i].totalPrestamos + " préstamos");
}

// Estadísticas por género
console.log("\n📚 ESTADÍSTICAS POR GÉNERO");
console.log("-".repeat(40));
const statsPorGenero = obtenerEstadisticasPorGenero();
for (let i = 0; i < statsPorGenero.length; i++) {
    const s = statsPorGenero[i];
    if (s.cantidadLibros > 0) {
        console.log("- " + s.genero + ": " + s.cantidadLibros + " libros, " +
                    s.copiasDisponibles + "/" + s.copiasTotales + " copias disponibles");
    }
}

// Matriz de préstamos
console.log("\n📈 MATRIZ DE PRÉSTAMOS POR GÉNERO Y MES");
console.log("-".repeat(50));
console.log(mostrarMatrizPrestamosGenero());

// Libros disponibles
console.log("📗 LIBROS DISPONIBLES ACTUALMENTE");
console.log("-".repeat(40));
const disponibles = obtenerLibrosDisponibles();
for (let i = 0; i < disponibles.length; i++) {
    console.log("- \"" + disponibles[i].titulo + "\" (" +
                disponibles[i].copiasDisponibles + " copias)");
}

console.log("\n" + "═".repeat(60));
console.log("✅ Sistema de biblioteca funcionando correctamente");
console.log("═".repeat(60));

