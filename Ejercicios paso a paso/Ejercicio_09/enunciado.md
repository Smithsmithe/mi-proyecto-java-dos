# Ejercicio 9: Mapa del Tesoro - Matrices Bidimensionales

## Contexto

Estás desarrollando un pequeño juego de "Mapa del Tesoro". El mapa es una cuadrícula (matriz) donde cada celda puede contener:
- `"."` - Terreno vacío
- `"#"` - Obstáculo (roca, árbol)
- `"T"` - Tesoro
- `"J"` - Jugador
- `"X"` - Trampa

El jugador debe navegar por el mapa, encontrar tesoros y evitar trampas.

## Objetivo

Crea un programa en JavaScript que:

1. Represente un mapa como una **matriz bidimensional** (array de arrays).
2. Implemente funciones para:
   - Mostrar el mapa en consola de forma visual
   - Encontrar la posición de un elemento (jugador, tesoros)
   - Contar elementos de un tipo específico
   - Verificar si una posición es válida y transitable
   - Mover al jugador en una dirección
   - Calcular la distancia entre dos posiciones

## Datos de ejemplo

```javascript
const mapa = [
    ["#", "#", "#", "#", "#", "#", "#", "#"],
    ["#", "J", ".", ".", "#", ".", "T", "#"],
    ["#", ".", "#", ".", ".", ".", ".", "#"],
    ["#", ".", "#", ".", "#", "#", ".", "#"],
    ["#", ".", ".", ".", ".", "X", ".", "#"],
    ["#", "#", ".", "#", ".", ".", ".", "#"],
    ["#", "T", ".", ".", ".", "#", "T", "#"],
    ["#", "#", "#", "#", "#", "#", "#", "#"]
];
```

## Requisitos

- `mostrarMapa(mapa)` - Muestra el mapa de forma visual en la consola.
- `encontrarPosicion(mapa, elemento)` - Devuelve `{fila, columna}` del elemento o `null`.
- `contarElementos(mapa, elemento)` - Cuenta cuántas veces aparece un elemento.
- `esPosicionValida(mapa, fila, columna)` - Verifica si la posición está dentro del mapa y es transitable.
- `moverJugador(mapa, direccion)` - Mueve al jugador ("arriba", "abajo", "izquierda", "derecha").
- `encontrarTodosLosTesoros(mapa)` - Devuelve un array con las posiciones de todos los tesoros.
- `calcularDistancia(pos1, pos2)` - Calcula la distancia Manhattan entre dos posiciones.

## Ejemplo de salida esperada

```
🗺️ MAPA DEL TESORO
==================

# # # # # # # #
# J . . # . T #
# . # . . . . #
# . # . # # . #
# . . . . X . #
# # . # . . . #
# T . . . # T #
# # # # # # # #

📍 Posición del jugador: fila 1, columna 1
💎 Tesoros en el mapa: 3
⚠️ Trampas en el mapa: 1

🎮 Moviendo al jugador hacia la derecha...
✓ Movimiento realizado

# # # # # # # #
# . J . # . T #
# . # . . . . #
...

📊 Distancia al tesoro más cercano: 5 pasos
```

## Pistas

- Una matriz es un array donde cada elemento es otro array (fila).
- Accedes a un elemento con `matriz[fila][columna]`.
- Para recorrer una matriz necesitas dos bucles anidados.
- La fila 0 es la de arriba, la columna 0 es la de la izquierda.
- La distancia Manhattan es: `|fila1 - fila2| + |columna1 - columna2|`

## Bonus (opcional)

1. Implementa un sistema de puntuación (puntos por tesoro, penalización por trampa).
2. Crea una función que encuentre el camino más corto a un tesoro.
3. Añade niebla de guerra: el jugador solo ve las celdas cercanas.
4. Genera mapas aleatorios con una distribución de elementos.

