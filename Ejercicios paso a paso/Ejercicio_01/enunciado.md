# Ejercicio 1: Sistema de Verificación de Edad para un Cine

## Contexto

Trabajas para un cine que necesita un pequeño sistema para verificar si un cliente puede acceder a ver una película según su clasificación por edades. Las películas tienen diferentes clasificaciones:

- **TP (Todos los Públicos)**: Cualquier edad puede verla
- **+7**: Solo mayores de 7 años
- **+12**: Solo mayores de 12 años
- **+16**: Solo mayores de 16 años
- **+18**: Solo mayores de 18 años

## Objetivo

Crea un programa en JavaScript que:

1. Defina como **constantes** los límites de edad para cada clasificación (7, 12, 16, 18).
2. Use **variables** para almacenar:
   - La edad del cliente
   - La clasificación de la película que quiere ver (como string: "TP", "+7", "+12", "+16", "+18")
3. Mediante estructuras **if-else**, determine si el cliente puede ver la película.
4. Muestre por consola un mensaje indicando si el acceso está permitido o denegado.

## Requisitos

- Utiliza `const` para valores que no cambiarán (los límites de edad).
- Utiliza `let` para valores que podrían cambiar (la edad del cliente y la clasificación elegida).
- El programa debe manejar correctamente todos los casos de clasificación.
- Si la clasificación introducida no es válida, debe mostrar un mensaje de error.

## Ejemplo de salida esperada

```
Verificación de acceso al cine
==============================
Edad del cliente: 15 años
Película seleccionada: clasificación +12

✓ Acceso permitido. ¡Disfruta de la película!
```

```
Verificación de acceso al cine
==============================
Edad del cliente: 14 años
Película seleccionada: clasificación +16

✗ Acceso denegado. La película requiere tener al menos 16 años.
```

## Pistas

- Recuerda que las comparaciones de edad usan operadores como `>=` (mayor o igual).
- Puedes usar `else if` para encadenar múltiples condiciones.
- Piensa en qué orden evaluar las clasificaciones para que el código sea más legible.

