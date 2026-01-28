# Guía Paso a Paso: Mapa del Tesoro - Matrices Bidimensionales

## Conceptos de JavaScript necesarios

Este ejercicio introduce las **matrices** (arrays bidimensionales), una forma de representar datos en dos dimensiones como tableros, mapas o tablas.

### 1. ¿Qué es una Matriz?

Una matriz es un **array de arrays**. Cada elemento del array principal es otro array (una fila):

```javascript
// Matriz 3x4 (3 filas, 4 columnas)
const matriz = [
    ["A", "B", "C", "D"],   // fila 0
    ["E", "F", "G", "H"],   // fila 1
    ["I", "J", "K", "L"]    // fila 2
];
//   0    1    2    3  ← columnas
```

**Visualización:**
```
        Columna
        0   1   2   3
      ┌───┬───┬───┬───┐
Fila 0│ A │ B │ C │ D │
      ├───┼───┼───┼───┤
Fila 1│ E │ F │ G │ H │
      ├───┼───┼───┼───┤
Fila 2│ I │ J │ K │ L │
      └───┴───┴───┴───┘
```

### 2. Acceso a elementos

Para acceder a un elemento necesitas **dos índices**: fila y columna.

```javascript
const matriz = [
    ["A", "B", "C"],
    ["D", "E", "F"],
    ["G", "H", "I"]
];

// Sintaxis: matriz[fila][columna]
console.log(matriz[0][0]);  // "A" (fila 0, columna 0)
console.log(matriz[0][2]);  // "C" (fila 0, columna 2)
console.log(matriz[1][1]);  // "E" (fila 1, columna 1)
console.log(matriz[2][0]);  // "G" (fila 2, columna 0)
```

**Recuerda:** Los índices empiezan en 0.

### 3. Dimensiones de una matriz

```javascript
const matriz = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12]
];

// Número de filas
const filas = matriz.length;  // 3

// Número de columnas (de la primera fila)
const columnas = matriz[0].length;  // 4
```

### 4. Recorrer una matriz con bucles anidados

Para visitar todos los elementos necesitas **dos bucles for**:

```javascript
const matriz = [
    ["A", "B", "C"],
    ["D", "E", "F"]
];

// Bucle externo: recorre filas
for (let fila = 0; fila < matriz.length; fila++) {
    
    // Bucle interno: recorre columnas de cada fila
    for (let columna = 0; columna < matriz[fila].length; columna++) {
        console.log("Posición [" + fila + "][" + columna + "] = " + matriz[fila][columna]);
    }
}
```

**Salida:**
```
Posición [0][0] = A
Posición [0][1] = B
Posición [0][2] = C
Posición [1][0] = D
Posición [1][1] = E
Posición [1][2] = F
```

### 5. Modificar elementos

```javascript
const matriz = [
    [".", ".", "."],
    [".", ".", "."],
    [".", ".", "."]
];

// Colocar una "X" en la fila 1, columna 1
matriz[1][1] = "X";

// Colocar una "O" en la fila 0, columna 2
matriz[0][2] = "O";
```

### 6. `Math.abs()` - Valor absoluto

Devuelve el valor absoluto (siempre positivo) de un número:

```javascript
Math.abs(5);    // 5
Math.abs(-5);   // 5
Math.abs(-3.7); // 3.7
```

Es útil para calcular distancias (que siempre son positivas).

📚 **Documentación**: [Math.abs() - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Math/abs)

### 7. Distancia Manhattan

Es la distancia entre dos puntos moviéndose solo horizontal y verticalmente (como en un tablero de ajedrez):

```
    A ─ ─ ─ ┐
            │
            │
            B

Distancia Manhattan = |x1 - x2| + |y1 - y2|
```

```javascript
function distanciaManhattan(pos1, pos2) {
    return Math.abs(pos1.fila - pos2.fila) + Math.abs(pos1.columna - pos2.columna);
}
```

---

## Proceso de Resolución Paso a Paso

### Paso 1: Diseñar la estructura del mapa

Usamos una matriz donde cada celda es un string que representa el contenido:

```javascript
const VACIO = ".";
const OBSTACULO = "#";
const TESORO = "T";
const JUGADOR = "J";
const TRAMPA = "X";

const mapa = [
    ["#", "#", "#", "#", "#", "#", "#", "#"],
    ["#", "J", ".", ".", "#", ".", "T", "#"],
    ["#", ".", "#", ".", ".", ".", ".", "#"],
    // ... más filas
];
```

### Paso 2: Función `mostrarMapa`

**Objetivo:** Mostrar el mapa de forma visual.

```javascript
function mostrarMapa(matriz) {
    for (let fila = 0; fila < matriz.length; fila++) {
        let lineaVisual = "";
        
        for (let columna = 0; columna < matriz[fila].length; columna++) {
            lineaVisual += matriz[fila][columna] + " ";
        }
        
        console.log(lineaVisual);
    }
}
```

**Traza:**
```
Fila 0: lineaVisual = "# # # # # # # # "
Fila 1: lineaVisual = "# J . . # . T # "
...
```

### Paso 3: Función `encontrarPosicion`

**Objetivo:** Encontrar dónde está un elemento específico.

```javascript
function encontrarPosicion(matriz, elemento) {
    for (let fila = 0; fila < matriz.length; fila++) {
        for (let columna = 0; columna < matriz[fila].length; columna++) {
            if (matriz[fila][columna] === elemento) {
                return { fila: fila, columna: columna };
            }
        }
    }
    return null;
}
```

**¿Por qué devolver un objeto?**
- Necesitamos devolver DOS valores (fila y columna)
- Un objeto `{ fila: 1, columna: 1 }` los agrupa de forma clara

### Paso 4: Función `contarElementos`

**Objetivo:** Contar cuántas veces aparece un elemento.

```javascript
function contarElementos(matriz, elemento) {
    let contador = 0;
    
    for (let fila = 0; fila < matriz.length; fila++) {
        for (let columna = 0; columna < matriz[fila].length; columna++) {
            if (matriz[fila][columna] === elemento) {
                contador++;
            }
        }
    }
    
    return contador;
}
```

Es el mismo patrón de recorrido, pero en lugar de devolver al encontrar, sumamos al contador.

### Paso 5: Función `esPosicionValida`

**Objetivo:** Verificar si una posición es válida para moverse.

```javascript
const esPosicionValida = (matriz, fila, columna) => {
    // 1. Verificar límites del mapa
    if (fila < 0 || fila >= matriz.length) {
        return false;
    }
    if (columna < 0 || columna >= matriz[fila].length) {
        return false;
    }
    
    // 2. Verificar que no es obstáculo
    if (matriz[fila][columna] === OBSTACULO) {
        return false;
    }
    
    return true;
};
```

**Casos que rechazamos:**
- Fila negativa (arriba del mapa)
- Fila >= número de filas (abajo del mapa)
- Columna negativa (izquierda del mapa)
- Columna >= número de columnas (derecha del mapa)
- La celda es un obstáculo

### Paso 6: Función `moverJugador`

**Algoritmo:**
1. Encontrar posición actual del jugador
2. Calcular nueva posición según dirección
3. Verificar si es válida
4. Si hay tesoro o trampa, actualizar puntuación
5. Actualizar el mapa

```javascript
function moverJugador(matriz, direccion) {
    const posActual = encontrarPosicion(matriz, JUGADOR);
    
    // Calcular nueva posición
    let nuevaFila = posActual.fila;
    let nuevaColumna = posActual.columna;
    
    switch (direccion) {
        case "arriba":
            nuevaFila = posActual.fila - 1;  // Subir = restar fila
            break;
        case "abajo":
            nuevaFila = posActual.fila + 1;  // Bajar = sumar fila
            break;
        case "izquierda":
            nuevaColumna = posActual.columna - 1;
            break;
        case "derecha":
            nuevaColumna = posActual.columna + 1;
            break;
    }
    
    // Verificar y mover
    if (!esPosicionValida(matriz, nuevaFila, nuevaColumna)) {
        return { exito: false };
    }
    
    // Actualizar mapa
    matriz[posActual.fila][posActual.columna] = VACIO;
    matriz[nuevaFila][nuevaColumna] = JUGADOR;
    
    return { exito: true };
}
```

**Sistema de coordenadas:**
```
        ← columna −    columna + →
                    
    ↑     [0][0]  [0][1]  [0][2]
  fila −  
          [1][0]  [1][1]  [1][2]
  fila +  
    ↓     [2][0]  [2][1]  [2][2]
```

### Paso 7: Función `encontrarTodosLosTesoros`

**Objetivo:** Similar a `encontrarPosicion`, pero devuelve TODOS los encontrados.

```javascript
function encontrarTodosLosTesoros(matriz) {
    const tesoros = [];
    
    for (let fila = 0; fila < matriz.length; fila++) {
        for (let columna = 0; columna < matriz[fila].length; columna++) {
            if (matriz[fila][columna] === TESORO) {
                tesoros.push({ fila: fila, columna: columna });
            }
        }
    }
    
    return tesoros;
}
```

**Diferencia con `encontrarPosicion`:**
- `encontrarPosicion`: devuelve el PRIMERO encontrado (`return` inmediato)
- `encontrarTodosLosTesoros`: acumula TODOS en un array

### Paso 8: Función `calcularDistancia`

```javascript
const calcularDistancia = (pos1, pos2) => {
    const distanciaFila = Math.abs(pos1.fila - pos2.fila);
    const distanciaColumna = Math.abs(pos1.columna - pos2.columna);
    return distanciaFila + distanciaColumna;
};
```

**Ejemplo:**
```
Pos1: {fila: 1, columna: 1} (Jugador)
Pos2: {fila: 6, columna: 1} (Tesoro)

distanciaFila = |1 - 6| = 5
distanciaColumna = |1 - 1| = 0
distancia total = 5 + 0 = 5 pasos
```

---

## Puntos Clave de Aprendizaje

### Patrón: Recorrido completo de matriz

```javascript
for (let fila = 0; fila < matriz.length; fila++) {
    for (let columna = 0; columna < matriz[fila].length; columna++) {
        // Hacer algo con matriz[fila][columna]
    }
}
```

### Patrón: Buscar en matriz

```javascript
function buscarEnMatriz(matriz, valor) {
    for (let fila = 0; fila < matriz.length; fila++) {
        for (let columna = 0; columna < matriz[fila].length; columna++) {
            if (matriz[fila][columna] === valor) {
                return { fila, columna };  // Encontrado
            }
        }
    }
    return null;  // No encontrado
}
```

### Patrón: Verificar límites

```javascript
function estaEnLimites(matriz, fila, columna) {
    return fila >= 0 && 
           fila < matriz.length && 
           columna >= 0 && 
           columna < matriz[0].length;
}
```

### Direcciones como cambios de coordenadas

```javascript
const direcciones = {
    arriba:    { fila: -1, columna:  0 },
    abajo:     { fila: +1, columna:  0 },
    izquierda: { fila:  0, columna: -1 },
    derecha:   { fila:  0, columna: +1 }
};

// Usar:
const cambio = direcciones["arriba"];
nuevaFila = posActual.fila + cambio.fila;
nuevaColumna = posActual.columna + cambio.columna;
```

---

## Errores Comunes a Evitar

### 1. Confundir fila y columna

```javascript
// ❌ INCORRECTO (invertido)
matriz[columna][fila]

// ✓ CORRECTO
matriz[fila][columna]
```

### 2. Olvidar verificar límites

```javascript
// ❌ INCORRECTO (puede dar error si fila es -1)
if (matriz[fila][columna] === "X") { ... }

// ✓ CORRECTO (verificar primero)
if (esPosicionValida(matriz, fila, columna)) {
    if (matriz[fila][columna] === "X") { ... }
}
```

### 3. Confundir el sistema de coordenadas

```javascript
// En una matriz:
// - Fila 0 está ARRIBA
// - Fila N está ABAJO
// - Subir = RESTAR fila
// - Bajar = SUMAR fila
```

### 4. No actualizar ambas celdas al mover

```javascript
// ❌ INCORRECTO (el jugador queda duplicado)
matriz[nuevaFila][nuevaColumna] = JUGADOR;

// ✓ CORRECTO
matriz[posActual.fila][posActual.columna] = VACIO;  // Limpiar anterior
matriz[nuevaFila][nuevaColumna] = JUGADOR;          // Nueva posición
```

---

## Ejercicios Adicionales para Practicar

1. **Diagonal**: Añade movimiento en diagonal (arriba-izquierda, arriba-derecha, etc.).

2. **Rango de visión**: Crea una función que devuelva todas las celdas visibles desde la posición del jugador (sin obstáculos).

3. **Mapa aleatorio**: Genera un mapa con obstáculos, tesoros y trampas colocados aleatoriamente.

4. **Múltiples jugadores**: Modifica el código para soportar varios jugadores en el mismo mapa.

5. **Contador de movimientos**: Añade un límite de movimientos y muestra los restantes.

---

## Referencias Adicionales

- [Arrays - MDN Web Docs](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [Math.abs() - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Math/abs)
- [Matrices en JavaScript - JavaScript.info](https://es.javascript.info/array#matrices)
- [Distancia Manhattan - Wikipedia](https://es.wikipedia.org/wiki/Distancia_de_Manhattan)

