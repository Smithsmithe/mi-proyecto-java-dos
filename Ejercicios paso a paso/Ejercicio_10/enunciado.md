# Ejercicio 10: Sistema Completo de Gestión de Biblioteca

## Contexto

Estás desarrollando un sistema de gestión para una biblioteca municipal. El sistema debe manejar libros, usuarios, préstamos y estadísticas. Este ejercicio integra **todos los conceptos** aprendidos en los ejercicios anteriores.

## Objetivo

Crea un programa en JavaScript que gestione una biblioteca con las siguientes funcionalidades:

### 1. Gestión de Libros
- Cada libro tiene: ISBN, título, autor, género, año de publicación, disponibilidad y número de copias.
- Almacenar libros en un **array de objetos**.
- Buscar libros por título, autor o género.
- Filtrar libros disponibles.

### 2. Gestión de Usuarios
- Cada usuario tiene: ID, nombre, email, tipo (estudiante/profesor/general) y lista de libros prestados.
- Los usuarios se almacenan en un **Map** (ID → objeto usuario).
- Diferentes límites de préstamo según tipo de usuario.

### 3. Sistema de Préstamos
- Registrar préstamos y devoluciones.
- Controlar que no se exceda el límite de préstamos por usuario.
- Usar un **Set** para registrar usuarios con préstamos activos.
- Historial de préstamos.

### 4. Catálogo por Géneros
- Organizar libros por género usando un **Map** (género → array de libros).
- Estadísticas de libros por género.

### 5. Estadísticas y Reportes
- Libros más prestados.
- Usuarios más activos.
- Disponibilidad general.
- Matriz de préstamos por mes/género.

## Estructuras de Datos Requeridas

```javascript
// Libro (objeto)
{
    isbn: "978-84-376-0494-7",
    titulo: "Don Quijote de la Mancha",
    autor: "Miguel de Cervantes",
    genero: "novela",
    anioPublicacion: 1605,
    copiasTotales: 3,
    copiasDisponibles: 2
}

// Usuario (en Map)
{
    id: "U001",
    nombre: "Ana García",
    email: "ana@email.com",
    tipo: "estudiante",  // "estudiante", "profesor", "general"
    librosPrestados: ["978-84-376-0494-7"],
    historialPrestamos: [...]
}

// Préstamo (objeto en historial)
{
    isbn: "978-84-376-0494-7",
    idUsuario: "U001",
    fechaPrestamo: "2024-01-15",
    fechaDevolucion: null,
    estado: "activo"  // "activo", "devuelto", "retrasado"
}
```

## Requisitos Funcionales

### Funciones de Libros
- `agregarLibro(libro)` - Añade un libro al catálogo.
- `buscarLibros(criterio, valor)` - Busca por título, autor o género.
- `obtenerLibrosDisponibles()` - Devuelve libros con copias disponibles.
- `obtenerLibroPorISBN(isbn)` - Busca un libro específico.

### Funciones de Usuarios
- `registrarUsuario(usuario)` - Registra un nuevo usuario.
- `obtenerUsuario(id)` - Obtiene un usuario por ID.
- `obtenerLimitePrestamoUsuario(tipo)` - Devuelve el límite según tipo.

### Funciones de Préstamos
- `realizarPrestamo(idUsuario, isbn)` - Registra un préstamo.
- `realizarDevolucion(idUsuario, isbn)` - Registra una devolución.
- `obtenerPrestamosActivos()` - Lista préstamos sin devolver.
- `verificarDisponibilidad(isbn)` - Comprueba si hay copias.

### Funciones de Estadísticas
- `generarEstadisticasGenerales()` - Resumen del estado de la biblioteca.
- `obtenerLibrosMasPrestados(n)` - Top N libros más prestados.
- `obtenerUsuariosMasActivos(n)` - Top N usuarios con más préstamos.
- `generarMatrizPrestamosPorGenero()` - Matriz de estadísticas.

## Ejemplo de Salida Esperada

```
📚 SISTEMA DE GESTIÓN DE BIBLIOTECA
===================================

📖 CATÁLOGO DE LIBROS (8 libros)
--------------------------------
1. "Don Quijote de la Mancha" - Miguel de Cervantes (novela) [2/3 disponibles]
2. "Cien años de soledad" - Gabriel García Márquez (novela) [1/2 disponibles]
3. "El principito" - Antoine de Saint-Exupéry (infantil) [3/3 disponibles]
...

👥 USUARIOS REGISTRADOS (5 usuarios)
------------------------------------
- Ana García (estudiante) - 2 libros prestados
- Carlos López (profesor) - 0 libros prestados
...

📋 OPERACIONES DE PRÉSTAMO
--------------------------
✓ Préstamo realizado: "Don Quijote" → Ana García
✗ Error: Usuario ha alcanzado el límite de préstamos
✓ Devolución realizada: "Cien años de soledad" ← Carlos López

📊 ESTADÍSTICAS GENERALES
-------------------------
Total de libros en catálogo: 8
Copias totales: 24
Copias prestadas: 7
Copias disponibles: 17
Usuarios activos (con préstamos): 4

🏆 TOP 3 LIBROS MÁS PRESTADOS
-----------------------------
1. "El principito" - 15 préstamos
2. "Don Quijote" - 12 préstamos
3. "1984" - 8 préstamos

📈 MATRIZ DE PRÉSTAMOS POR GÉNERO
---------------------------------
              Ene  Feb  Mar  Total
novela         5    3    7    15
ciencia_fic    2    4    3     9
infantil       8    6    9    23
historia       1    2    1     4
```

## Pistas

- Usa constantes para los límites de préstamo según tipo de usuario.
- Un Set es perfecto para saber rápidamente qué usuarios tienen préstamos activos.
- Un Map con género como clave facilita agrupar libros.
- La matriz de estadísticas puede ser un array bidimensional donde cada fila es un género.
- Separa la lógica en funciones pequeñas y reutilizables.
- Valida siempre los datos antes de realizar operaciones.

## Bonus (opcional)

1. **Sistema de reservas**: Si un libro no está disponible, permitir reservarlo.
2. **Multas por retraso**: Calcular multas por días de retraso en devoluciones.
3. **Búsqueda avanzada**: Buscar por múltiples criterios simultáneamente.
4. **Recomendaciones**: Sugerir libros basándose en el historial del usuario.
5. **Exportar datos**: Generar un resumen en formato legible.

## Criterios de Evaluación

Este ejercicio demuestra dominio de:
- ✅ Variables y constantes (`let`, `const`)
- ✅ Funciones tradicionales y flecha
- ✅ Control de flujo (`if-else`, `switch`)
- ✅ Bucles (`for`, `while`)
- ✅ Arrays y sus métodos
- ✅ Objetos literales y acceso a propiedades
- ✅ Sets para colecciones únicas
- ✅ Maps para pares clave-valor
- ✅ Matrices bidimensionales
- ✅ Valores truthy/falsy
- ✅ Buenas prácticas de código

