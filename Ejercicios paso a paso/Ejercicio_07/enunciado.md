# Ejercicio 7: Sistema de Etiquetas para un Blog

## Contexto

Estás desarrollando un sistema de etiquetas (tags) para un blog. Los artículos pueden tener múltiples etiquetas, y necesitas:
- Evitar etiquetas duplicadas
- Encontrar etiquetas comunes entre artículos
- Obtener todas las etiquetas únicas del blog
- Sugerir artículos relacionados basándose en etiquetas compartidas

## Objetivo

Crea un programa en JavaScript que:

1. Use **Set** para gestionar colecciones de etiquetas únicas.
2. Implemente operaciones típicas de conjuntos:
   - **Unión**: Todas las etiquetas de varios artículos
   - **Intersección**: Etiquetas comunes entre artículos
   - **Diferencia**: Etiquetas que tiene un artículo pero no otro
3. Determine qué artículos están relacionados (comparten al menos una etiqueta).

## Datos de ejemplo

```javascript
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
```

## Requisitos

- `obtenerTodasLasEtiquetas(articulos)` - Devuelve un Set con todas las etiquetas únicas del blog.
- `etiquetasComunes(etiquetas1, etiquetas2)` - Devuelve un Set con las etiquetas que aparecen en ambos arrays.
- `etiquetasUnicas(etiquetas1, etiquetas2)` - Devuelve las etiquetas que están en el primero pero no en el segundo.
- `articulosRelacionados(articulos, indiceArticulo)` - Devuelve los artículos que comparten al menos una etiqueta con el artículo indicado.
- `contarEtiquetas(articulos)` - Cuenta cuántas veces aparece cada etiqueta en el blog.

## Ejemplo de salida esperada

```
📝 SISTEMA DE ETIQUETAS DEL BLOG
================================

🏷️ Todas las etiquetas del blog (únicas):
javascript, programacion, web, principiantes, css, diseño, layout, react, frameworks, nodejs, backend, api, responsive, movil

Total: 14 etiquetas únicas

🔍 Comparando "Introducción a JavaScript" con "React para principiantes":
Etiquetas en común: javascript, principiantes
Etiquetas solo en el primero: programacion, web
Etiquetas solo en el segundo: react, frameworks

📰 Artículos relacionados con "Introducción a JavaScript":
- "CSS Grid vs Flexbox" (etiquetas en común: web)
- "React para principiantes" (etiquetas en común: javascript, principiantes)
- "Node.js y Express" (etiquetas en común: javascript)

📊 Ranking de etiquetas más usadas:
1. javascript: 3 artículos
2. css: 2 artículos
3. diseño: 2 artículos
...
```

## Pistas

- Crea un Set con `new Set()` o `new Set(array)`.
- Usa `.add(valor)` para añadir elementos a un Set.
- Usa `.has(valor)` para comprobar si un elemento existe.
- Usa `.size` para obtener el número de elementos.
- Para convertir un Set a Array: `Array.from(miSet)` o `[...miSet]`.
- Un Set ignora automáticamente los duplicados.

## Bonus (opcional)

1. Implementa una función que sugiera nuevas etiquetas basándose en las más populares.
2. Crea una "nube de etiquetas" que muestre las etiquetas con un indicador visual de popularidad.
3. Encuentra los artículos que NO comparten ninguna etiqueta con los demás.

