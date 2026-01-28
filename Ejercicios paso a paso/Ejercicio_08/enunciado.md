# Ejercicio 8: Sistema de Diccionario y Traductor

## Contexto

Estás desarrollando un sistema de diccionario multilingüe para una aplicación de aprendizaje de idiomas. Necesitas almacenar palabras con sus traducciones, definiciones y ejemplos de uso. También quieres poder buscar rápidamente y gestionar las palabras del diccionario.

## Objetivo

Crea un programa en JavaScript que:

1. Use **Map** para almacenar un diccionario donde:
   - La **clave** es la palabra en español
   - El **valor** es un objeto con la traducción al inglés, definición y ejemplo

2. Implemente funciones para:
   - Añadir nuevas palabras al diccionario
   - Buscar una palabra y obtener toda su información
   - Eliminar palabras del diccionario
   - Listar todas las palabras disponibles
   - Traducir una frase simple (palabra por palabra)

3. Use otro **Map** para contar cuántas veces se ha buscado cada palabra (estadísticas de uso).

## Datos de ejemplo

```javascript
// Estructura de cada entrada del diccionario
{
    ingles: "house",
    definicion: "Edificio para habitar",
    ejemplo: "Mi casa tiene tres habitaciones"
}
```

## Requisitos

- `agregarPalabra(diccionario, palabra, info)` - Añade una palabra con su información.
- `buscarPalabra(diccionario, palabra)` - Devuelve la información o `undefined` si no existe.
- `eliminarPalabra(diccionario, palabra)` - Elimina una palabra del diccionario.
- `listarPalabras(diccionario)` - Devuelve un array con todas las palabras.
- `traducirFrase(diccionario, frase)` - Traduce una frase palabra por palabra.
- `registrarBusqueda(estadisticas, palabra)` - Incrementa el contador de búsquedas.
- `obtenerMasBuscadas(estadisticas, cantidad)` - Devuelve las N palabras más buscadas.

## Ejemplo de salida esperada

```
📚 DICCIONARIO ESPAÑOL-INGLÉS
=============================

➕ Añadiendo palabras al diccionario...
✓ "casa" añadida correctamente
✓ "perro" añadida correctamente
✓ "gato" añadida correctamente
✓ "comer" añadida correctamente
✓ "dormir" añadida correctamente

📖 Diccionario actual (5 palabras):
- casa → house
- perro → dog
- gato → cat
- comer → eat
- dormir → sleep

🔍 Buscando "perro":
Traducción: dog
Definición: Animal doméstico canino
Ejemplo: "El perro juega en el jardín"

🗑️ Eliminando "gato"...
✓ Palabra eliminada

🌐 Traduciendo frase: "el perro come en casa"
Resultado: the dog eat in house

📊 Estadísticas de búsqueda:
1. perro: 5 búsquedas
2. casa: 3 búsquedas
3. comer: 2 búsquedas
```

## Pistas

- Crea un Map con `new Map()`.
- Usa `.set(clave, valor)` para añadir o actualizar.
- Usa `.get(clave)` para obtener un valor.
- Usa `.has(clave)` para comprobar si existe.
- Usa `.delete(clave)` para eliminar.
- Usa `.keys()` para obtener las claves.
- Usa `.size` para saber cuántos elementos tiene.
- Para traducir una frase, puedes usar `.split(" ")` para dividirla en palabras.

## Bonus (opcional)

1. Implementa búsqueda aproximada (que "casa" encuentre también "casas").
2. Añade sinónimos a cada palabra.
3. Crea un sistema de favoritos usando otro Map.
4. Implementa un historial de las últimas palabras buscadas.

