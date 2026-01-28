# Guía Paso a Paso: Sistema Completo de Gestión de Biblioteca

## Introducción

Este ejercicio final integra **todos los conceptos** aprendidos en los ejercicios anteriores. Es un proyecto completo que simula un sistema real de gestión de biblioteca.

### Conceptos que se aplican:

| Ejercicio | Concepto | Aplicación en este ejercicio |
|-----------|----------|------------------------------|
| 1 | Variables y constantes | Configuración, límites, estados |
| 2 | Funciones | Todas las operaciones del sistema |
| 3 | Arrays y bucles for | Catálogo de libros, historial |
| 4 | While y switch | Menús, procesamiento de opciones |
| 5 | Objetos literales, truthy/falsy | Libros, usuarios, préstamos |
| 6 | Arrays de objetos | Catálogo, historial de préstamos |
| 7 | Sets | Usuarios con préstamos activos |
| 8 | Maps | Usuarios por ID, libros por género |
| 9 | Matrices | Estadísticas por género y mes |

---

## Arquitectura del Sistema

### Diagrama de Estructuras de Datos

```
┌─────────────────────────────────────────────────────────────────┐
│                    SISTEMA DE BIBLIOTECA                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────┐     ┌─────────────────┐                    │
│  │    catalogo     │     │    usuarios     │                    │
│  │ (Array<Libro>)  │     │  (Map<ID,User>) │                    │
│  └────────┬────────┘     └────────┬────────┘                    │
│           │                       │                              │
│           └───────────┬───────────┘                              │
│                       │                                          │
│                       ▼                                          │
│           ┌─────────────────────┐                               │
│           │ historialPrestamos  │                               │
│           │  (Array<Prestamo>)  │                               │
│           └─────────────────────┘                               │
│                                                                  │
│  ┌─────────────────┐     ┌─────────────────────────┐           │
│  │usuariosConPres. │     │   librosPorGenero       │           │
│  │   (Set<ID>)     │     │ (Map<genero,ISBN[]>)    │           │
│  └─────────────────┘     └─────────────────────────┘           │
│                                                                  │
│  ┌─────────────────────────────────────────────┐               │
│  │        matrizPrestamosGeneroMes             │               │
│  │           (number[][])                       │               │
│  │                                              │               │
│  │        Ene  Feb  Mar  Abr  May  Jun         │               │
│  │ novela  [0]  [1]  [2]  [3]  [4]  [5]        │               │
│  │ ciencia [0]  [1]  [2]  [3]  [4]  [5]        │               │
│  │ ...                                          │               │
│  └─────────────────────────────────────────────┘               │
└─────────────────────────────────────────────────────────────────┘
```

---

## Proceso de Resolución Paso a Paso

### Paso 1: Definir las Constantes de Configuración

Empezamos definiendo todo lo que no cambiará durante la ejecución:

```javascript
// Límites de préstamo según tipo de usuario
const LIMITE_ESTUDIANTE = 3;
const LIMITE_PROFESOR = 5;
const LIMITE_GENERAL = 2;

// Estados posibles de un préstamo
const ESTADO_ACTIVO = "activo";
const ESTADO_DEVUELTO = "devuelto";

// Géneros de libros disponibles
const GENEROS = ["novela", "ciencia_ficcion", "infantil", "historia", "poesia", "teatro"];

// Meses para estadísticas
const MESES = ["Ene", "Feb", "Mar", "Abr", "May", "Jun"];
```

**¿Por qué constantes?**
- Son valores de configuración que definen las reglas del negocio
- Si necesitas cambiar un límite, solo lo cambias en un lugar
- El código es más legible: `LIMITE_ESTUDIANTE` vs `3`

### Paso 2: Diseñar las Estructuras de Datos

Cada estructura tiene un propósito específico:

```javascript
// Array de objetos - Para el catálogo (necesitamos recorrer, filtrar)
const catalogo = [];

// Map - Para usuarios (acceso rápido por ID)
const usuarios = new Map();

// Set - Para saber rápidamente quién tiene préstamos
const usuariosConPrestamos = new Set();

// Array - Historial cronológico de préstamos
const historialPrestamos = [];

// Map - Índice de libros por género (para búsquedas rápidas)
const librosPorGenero = new Map();

// Map - Contador de préstamos por libro
const contadorPrestamosLibro = new Map();

// Matriz - Estadísticas bidimensionales
let matrizPrestamosGeneroMes = [];
```

**Decisiones de diseño:**

| Estructura | ¿Por qué esta elección? |
|------------|-------------------------|
| `catalogo` (Array) | Necesitamos recorrer todos los libros, filtrar, buscar |
| `usuarios` (Map) | Acceso directo por ID, sin necesidad de buscar |
| `usuariosConPrestamos` (Set) | Solo necesitamos saber si están o no, sin duplicados |
| `librosPorGenero` (Map) | Agrupar libros por categoría, acceso por clave |
| `matrizPrestamosGeneroMes` (Array 2D) | Datos tabulares con dos dimensiones |

### Paso 3: Funciones de Inicialización

Preparamos las estructuras antes de usarlas:

```javascript
function inicializarMatrizPrestamos() {
    matrizPrestamosGeneroMes = [];
    
    // Crear una fila por cada género
    for (let i = 0; i < GENEROS.length; i++) {
        const filaGenero = [];
        // Cada fila tiene una columna por cada mes
        for (let j = 0; j < MESES.length; j++) {
            filaGenero.push(0);
        }
        matrizPrestamosGeneroMes.push(filaGenero);
    }
}

function inicializarLibrosPorGenero() {
    for (let i = 0; i < GENEROS.length; i++) {
        librosPorGenero.set(GENEROS[i], []);
    }
}
```

### Paso 4: Funciones de Gestión de Libros

#### Agregar libro con validación:

```javascript
function agregarLibro(libro) {
    // 1. Validar campos obligatorios
    if (!libro.isbn || !libro.titulo || !libro.autor || !libro.genero) {
        console.log("❌ Error: Faltan campos obligatorios");
        return false;
    }
    
    // 2. Verificar que no exista
    const existente = obtenerLibroPorISBN(libro.isbn);
    if (existente) {
        console.log("❌ Error: ISBN duplicado");
        return false;
    }
    
    // 3. Crear objeto completo con valores por defecto
    const libroCompleto = {
        isbn: libro.isbn,
        titulo: libro.titulo,
        autor: libro.autor,
        genero: libro.genero,
        anioPublicacion: libro.anioPublicacion || 0,
        copiasTotales: libro.copiasTotales || 1,
        copiasDisponibles: libro.copiasDisponibles || libro.copiasTotales || 1
    };
    
    // 4. Agregar a las estructuras correspondientes
    catalogo.push(libroCompleto);
    
    if (librosPorGenero.has(libro.genero)) {
        librosPorGenero.get(libro.genero).push(libro.isbn);
    }
    
    contadorPrestamosLibro.set(libro.isbn, 0);
    
    return true;
}
```

**Patrón importante: Valores por defecto con `||`**
```javascript
anioPublicacion: libro.anioPublicacion || 0
// Si libro.anioPublicacion es undefined/null/0, usa 0
```

#### Búsqueda flexible:

```javascript
function buscarLibros(criterio, valor) {
    const resultados = [];
    const valorLower = valor.toLowerCase();
    
    for (let i = 0; i < catalogo.length; i++) {
        const libro = catalogo[i];
        let campoLibro = "";
        
        // Switch para seleccionar el campo según el criterio
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
                continue; // Si el criterio no es válido, saltar
        }
        
        // Búsqueda parcial con includes()
        if (campoLibro.includes(valorLower)) {
            resultados.push(libro);
        }
    }
    
    return resultados;
}
```

### Paso 5: Funciones de Gestión de Usuarios

#### Registro con Map:

```javascript
function registrarUsuario(usuario) {
    // Validaciones
    if (!usuario.id || !usuario.nombre || !usuario.tipo) {
        return false;
    }
    
    if (usuarios.has(usuario.id)) {
        return false; // Ya existe
    }
    
    // Crear usuario completo
    const usuarioCompleto = {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email || "",
        tipo: usuario.tipo,
        librosPrestados: [],       // Array de ISBNs
        historialPrestamos: [],    // Array de objetos préstamo
        totalPrestamosHistorico: 0
    };
    
    usuarios.set(usuario.id, usuarioCompleto);
    return true;
}
```

#### Obtener límite según tipo:

```javascript
function obtenerLimitePrestamoUsuario(tipo) {
    switch (tipo) {
        case "estudiante":
            return LIMITE_ESTUDIANTE;  // 3
        case "profesor":
            return LIMITE_PROFESOR;    // 5
        case "general":
            return LIMITE_GENERAL;     // 2
        default:
            return LIMITE_GENERAL;
    }
}
```

### Paso 6: Sistema de Préstamos (la función más compleja)

```javascript
function realizarPrestamo(idUsuario, isbn) {
    // 1. Obtener usuario y libro
    const usuario = obtenerUsuario(idUsuario);
    if (!usuario) {
        return { exito: false, mensaje: "Usuario no encontrado" };
    }
    
    const libro = obtenerLibroPorISBN(isbn);
    if (!libro) {
        return { exito: false, mensaje: "Libro no encontrado" };
    }
    
    // 2. Verificar disponibilidad
    if (!verificarDisponibilidad(isbn)) {
        return { exito: false, mensaje: "No hay copias disponibles" };
    }
    
    // 3. Verificar límite de préstamos
    if (!puedeRealizarPrestamo(idUsuario)) {
        const limite = obtenerLimitePrestamoUsuario(usuario.tipo);
        return { exito: false, mensaje: "Límite alcanzado (" + limite + ")" };
    }
    
    // 4. Verificar que no tenga ya el libro
    if (usuario.librosPrestados.includes(isbn)) {
        return { exito: false, mensaje: "Ya tiene este libro" };
    }
    
    // 5. REALIZAR EL PRÉSTAMO - Modificar todas las estructuras
    
    // Decrementar copias disponibles del libro
    libro.copiasDisponibles--;
    
    // Agregar ISBN a la lista del usuario
    usuario.librosPrestados.push(isbn);
    usuario.totalPrestamosHistorico++;
    
    // Agregar usuario al Set de usuarios con préstamos
    usuariosConPrestamos.add(idUsuario);
    
    // Incrementar contador del libro
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
    
    // Guardar en historiales
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
```

**Observa cómo un préstamo afecta a MÚLTIPLES estructuras:**
1. `libro.copiasDisponibles` (objeto en catalogo)
2. `usuario.librosPrestados` (array en el usuario)
3. `usuario.totalPrestamosHistorico` (contador)
4. `usuariosConPrestamos` (Set)
5. `contadorPrestamosLibro` (Map)
6. `historialPrestamos` (Array global)
7. `usuario.historialPrestamos` (Array del usuario)
8. `matrizPrestamosGeneroMes` (Matriz)

### Paso 7: Funciones de Estadísticas

#### Estadísticas generales:

```javascript
function generarEstadisticasGenerales() {
    let copiasTotales = 0;
    let copiasDisponibles = 0;
    
    // Recorrer catálogo sumando
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
```

#### Obtener ranking (ordenar y limitar):

```javascript
function obtenerLibrosMasPrestados(n) {
    // 1. Convertir Map a Array para poder ordenar
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
    
    // 2. Ordenar de mayor a menor (burbuja)
    for (let i = 0; i < arrayPrestamos.length - 1; i++) {
        for (let j = i + 1; j < arrayPrestamos.length; j++) {
            if (arrayPrestamos[j].prestamos > arrayPrestamos[i].prestamos) {
                const temp = arrayPrestamos[i];
                arrayPrestamos[i] = arrayPrestamos[j];
                arrayPrestamos[j] = temp;
            }
        }
    }
    
    // 3. Devolver solo los primeros n
    const resultado = [];
    for (let i = 0; i < n && i < arrayPrestamos.length; i++) {
        resultado.push(arrayPrestamos[i]);
    }
    
    return resultado;
}
```

#### Mostrar matriz de estadísticas:

```javascript
function mostrarMatrizPrestamosGenero() {
    let resultado = "";
    
    // Cabecera con los meses
    resultado += "              ";
    for (let j = 0; j < MESES.length; j++) {
        resultado += MESES[j].padStart(5);
    }
    resultado += "  Total\n";
    
    // Filas (una por género)
    for (let i = 0; i < GENEROS.length; i++) {
        let total = 0;
        resultado += GENEROS[i].padEnd(14);
        
        // Columnas (una por mes)
        for (let j = 0; j < MESES.length; j++) {
            resultado += String(matrizPrestamosGeneroMes[i][j]).padStart(5);
            total += matrizPrestamosGeneroMes[i][j];
        }
        
        resultado += String(total).padStart(7) + "\n";
    }
    
    return resultado;
}
```

---

## Patrones de Diseño Utilizados

### 1. Patrón Resultado de Operación

```javascript
function realizarPrestamo(...) {
    // En caso de error
    return { exito: false, mensaje: "Descripción del error" };
    
    // En caso de éxito
    return { exito: true, mensaje: "Descripción del éxito" };
}

// Uso
const resultado = realizarPrestamo("U001", "ISBN123");
if (resultado.exito) {
    console.log("✓ " + resultado.mensaje);
} else {
    console.log("✗ " + resultado.mensaje);
}
```

### 2. Patrón Validación Temprana

```javascript
function miFuncion(param) {
    // Validar todo al principio
    if (!param) {
        return { exito: false, mensaje: "Parámetro requerido" };
    }
    
    if (!condicion1) {
        return { exito: false, mensaje: "Error 1" };
    }
    
    if (!condicion2) {
        return { exito: false, mensaje: "Error 2" };
    }
    
    // Si llegamos aquí, todo está bien
    // ... lógica principal ...
}
```

### 3. Patrón Índices Paralelos

```javascript
// GENEROS[i] corresponde a matrizPrestamosGeneroMes[i]
const GENEROS = ["novela", "ciencia_ficcion", ...];
const matrizPrestamosGeneroMes = [
    [/*datos de novela*/],
    [/*datos de ciencia_ficcion*/],
    ...
];

// Para encontrar el índice de un género:
const indice = GENEROS.indexOf("novela"); // 0
```

### 4. Patrón Múltiples Estructuras Sincronizadas

Cuando una operación afecta a varias estructuras, mantenerlas sincronizadas:

```javascript
// Al prestar un libro, actualizamos TODO:
libro.copiasDisponibles--;
usuario.librosPrestados.push(isbn);
usuariosConPrestamos.add(idUsuario);
contadorPrestamosLibro.set(isbn, prestamos + 1);
historialPrestamos.push(prestamo);
matrizPrestamosGeneroMes[genero][mes]++;

// Al devolver, deshacemos TODO:
libro.copiasDisponibles++;
usuario.librosPrestados.splice(indice, 1);
if (usuario.librosPrestados.length === 0) {
    usuariosConPrestamos.delete(idUsuario);
}
prestamo.estado = ESTADO_DEVUELTO;
```

---

## Resumen de Estructuras y Sus Usos

| Estructura | Tipo | Propósito |
|------------|------|-----------|
| `catalogo` | Array<Objeto> | Lista ordenada de todos los libros |
| `usuarios` | Map<ID, Objeto> | Acceso rápido a usuarios por ID |
| `usuariosConPrestamos` | Set<ID> | Saber rápidamente quién tiene préstamos |
| `historialPrestamos` | Array<Objeto> | Registro cronológico de operaciones |
| `librosPorGenero` | Map<string, Array> | Índice para búsquedas por género |
| `contadorPrestamosLibro` | Map<ISBN, number> | Estadísticas de popularidad |
| `matrizPrestamosGeneroMes` | number[][] | Datos tabulares para reportes |

---

## Ejercicios de Extensión

1. **Sistema de reservas**: Permitir reservar libros no disponibles.

2. **Multas**: Calcular multas por días de retraso.

3. **Autenticación**: Añadir sistema de login con contraseñas.

4. **Persistencia**: Guardar y cargar datos de un archivo.

5. **Interfaz**: Crear un menú interactivo con switch/while.

---

## Referencias

- [Arrays - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [Objects - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Object)
- [Map - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Map)
- [Set - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Set)
- [Date - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Date)

