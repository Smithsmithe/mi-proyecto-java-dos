# Guía Paso a Paso: Sistema de Etiquetas para un Blog

## Conceptos de JavaScript necesarios

Este ejercicio introduce los **Sets**, una estructura de datos para almacenar valores únicos.

### 1. ¿Qué es un Set?

Un `Set` es una colección de valores donde **cada valor solo puede aparecer una vez**. Es ideal para:
- Eliminar duplicados de un array
- Comprobar rápidamente si un elemento existe
- Realizar operaciones de conjuntos (unión, intersección, diferencia)

```javascript
// Crear un Set vacío
const miSet = new Set();

// Crear un Set desde un array (elimina duplicados automáticamente)
const numeros = new Set([1, 2, 2, 3, 3, 3]);
console.log(numeros);  // Set { 1, 2, 3 }
```

📚 **Documentación**: [Set - MDN Web Docs](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Set)

### 2. Métodos principales de Set

| Método | Descripción | Ejemplo |
|--------|-------------|---------|
| `add(valor)` | Añade un elemento | `miSet.add("hola")` |
| `has(valor)` | Comprueba si existe | `miSet.has("hola")` → true |
| `delete(valor)` | Elimina un elemento | `miSet.delete("hola")` |
| `clear()` | Elimina todos los elementos | `miSet.clear()` |
| `size` | Número de elementos (propiedad) | `miSet.size` → 0 |

```javascript
const frutas = new Set();

frutas.add("manzana");
frutas.add("naranja");
frutas.add("manzana");  // Ignorado (ya existe)

console.log(frutas.size);       // 2
console.log(frutas.has("pera")); // false

frutas.delete("naranja");
console.log(frutas);            // Set { "manzana" }
```

### 3. Recorrer un Set con `for...of`

El bucle `for...of` permite iterar sobre los valores de un Set:

```javascript
const colores = new Set(["rojo", "verde", "azul"]);

for (const color of colores) {
    console.log(color);
}
// rojo
// verde
// azul
```

**Diferencia con `for` tradicional:**
- `for (let i = 0; i < array.length; i++)` → accedes por índice
- `for (const elemento of coleccion)` → accedes directamente al valor

📚 **Documentación**: [for...of - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/for...of)

### 4. Convertir entre Set y Array

```javascript
// Array → Set (elimina duplicados)
const arrayConDuplicados = [1, 2, 2, 3, 3, 3];
const setSinDuplicados = new Set(arrayConDuplicados);

// Set → Array
const arrayUnico = Array.from(setSinDuplicados);  // [1, 2, 3]
// O también:
const arrayUnico2 = [...setSinDuplicados];        // [1, 2, 3]
```

### 5. Operaciones de conjuntos

Los Sets son perfectos para operaciones matemáticas de conjuntos:

**Unión (A ∪ B)**: Todos los elementos de ambos
```javascript
const a = new Set([1, 2, 3]);
const b = new Set([3, 4, 5]);
const union = new Set([...a, ...b]);  // Set { 1, 2, 3, 4, 5 }
```

**Intersección (A ∩ B)**: Elementos que están en ambos
```javascript
const interseccion = new Set();
for (const elemento of a) {
    if (b.has(elemento)) {
        interseccion.add(elemento);
    }
}
// Set { 3 }
```

**Diferencia (A - B)**: Elementos de A que no están en B
```javascript
const diferencia = new Set();
for (const elemento of a) {
    if (!b.has(elemento)) {
        diferencia.add(elemento);
    }
}
// Set { 1, 2 }
```

### 6. La sentencia `continue`

Dentro de un bucle, `continue` salta a la siguiente iteración:

```javascript
for (let i = 0; i < 5; i++) {
    if (i === 2) {
        continue;  // Salta el 2
    }
    console.log(i);
}
// Imprime: 0, 1, 3, 4
```

---

## Proceso de Resolución Paso a Paso

### Paso 1: Entender la estructura de datos

Cada artículo tiene un título y un array de etiquetas:

```javascript
{
    titulo: "Introducción a JavaScript",
    etiquetas: ["javascript", "programacion", "web", "principiantes"]
}
```

El problema: algunas etiquetas se repiten entre artículos. Queremos trabajar con etiquetas únicas.

### Paso 2: Función `obtenerTodasLasEtiquetas`

**Objetivo:** Recopilar todas las etiquetas de todos los artículos, sin duplicados.

```javascript
function obtenerTodasLasEtiquetas(listaArticulos) {
    const todasLasEtiquetas = new Set();  // Set para evitar duplicados
    
    for (let i = 0; i < listaArticulos.length; i++) {
        const etiquetasArticulo = listaArticulos[i].etiquetas;
        
        for (let j = 0; j < etiquetasArticulo.length; j++) {
            todasLasEtiquetas.add(etiquetasArticulo[j]);
        }
    }
    
    return todasLasEtiquetas;
}
```

**¿Por qué un Set?**
- Si usáramos un array, tendríamos que verificar si cada etiqueta ya existe antes de añadirla
- Con Set, los duplicados se ignoran automáticamente

**Traza:**
```
Artículo 0: ["javascript", "programacion", "web", "principiantes"]
  → Set: { javascript, programacion, web, principiantes }

Artículo 1: ["css", "diseño", "web", "layout"]
  → Set: { javascript, programacion, web, principiantes, css, diseño, layout }
  (web ya existía, se ignora)

... y así sucesivamente
```

### Paso 3: Función `etiquetasComunes` (intersección)

**Objetivo:** Encontrar etiquetas que están en ambos conjuntos.

```javascript
function etiquetasComunes(etiquetas1, etiquetas2) {
    const set1 = new Set(etiquetas1);  // Convertimos a Set
    const set2 = new Set(etiquetas2);
    const comunes = new Set();
    
    for (const etiqueta of set1) {
        if (set2.has(etiqueta)) {  // ¿Está en el segundo?
            comunes.add(etiqueta);
        }
    }
    
    return comunes;
}
```

**Ejemplo:**
```
etiquetas1: ["javascript", "programacion", "web", "principiantes"]
etiquetas2: ["react", "javascript", "frameworks", "principiantes"]

Recorremos set1:
- "javascript" → ¿está en set2? SÍ → añadir a comunes
- "programacion" → ¿está en set2? NO
- "web" → ¿está en set2? NO
- "principiantes" → ¿está en set2? SÍ → añadir a comunes

Resultado: { javascript, principiantes }
```

### Paso 4: Función `etiquetasUnicas` (diferencia)

**Objetivo:** Encontrar etiquetas que están en el primero pero NO en el segundo.

```javascript
const etiquetasUnicas = (etiquetas1, etiquetas2) => {
    const set1 = new Set(etiquetas1);
    const set2 = new Set(etiquetas2);
    const unicas = new Set();
    
    for (const etiqueta of set1) {
        if (!set2.has(etiqueta)) {  // ¿NO está en el segundo?
            unicas.add(etiqueta);
        }
    }
    
    return unicas;
};
```

La única diferencia con la intersección es el `!` (negación) en la condición.

### Paso 5: Función `articulosRelacionados`

**Objetivo:** Encontrar artículos que comparten al menos una etiqueta.

```javascript
function articulosRelacionados(listaArticulos, indiceArticulo) {
    const articuloReferencia = listaArticulos[indiceArticulo];
    const etiquetasReferencia = articuloReferencia.etiquetas;
    const relacionados = [];
    
    for (let i = 0; i < listaArticulos.length; i++) {
        if (i === indiceArticulo) {
            continue;  // No comparar consigo mismo
        }
        
        const otroArticulo = listaArticulos[i];
        const comunes = etiquetasComunes(etiquetasReferencia, otroArticulo.etiquetas);
        
        if (comunes.size > 0) {  // Si hay al menos una en común
            relacionados.push({
                titulo: otroArticulo.titulo,
                etiquetasComunes: comunes
            });
        }
    }
    
    return relacionados;
}
```

**Uso de `continue`:**
- Cuando `i === indiceArticulo`, el artículo se estaría comparando consigo mismo
- `continue` salta esa iteración y pasa a la siguiente

### Paso 6: Función `contarEtiquetas`

Esta función usa un objeto para contar (igual que en el ejercicio anterior):

```javascript
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
```

---

## Puntos Clave de Aprendizaje

### Set vs Array: ¿Cuándo usar cada uno?

| Usa Array cuando... | Usa Set cuando... |
|---------------------|-------------------|
| El orden importa | Solo necesitas valores únicos |
| Puedes tener duplicados | No quieres duplicados |
| Necesitas acceso por índice | Solo necesitas saber si existe |
| Necesitas métodos como map, filter | Necesitas operaciones de conjuntos |

### Complejidad: `has()` vs búsqueda en Array

```javascript
// En Array: búsqueda lineal O(n)
const array = [1, 2, 3, 4, 5];
array.includes(3);  // Debe revisar potencialmente todo el array

// En Set: búsqueda O(1) 
const set = new Set([1, 2, 3, 4, 5]);
set.has(3);  // Acceso directo, muy rápido
```

Para colecciones grandes, `Set.has()` es mucho más eficiente.

### Patrón: Eliminar duplicados de un array

```javascript
const conDuplicados = [1, 2, 2, 3, 3, 3, 4];
const sinDuplicados = [...new Set(conDuplicados)];
// [1, 2, 3, 4]
```

Este es un patrón muy común y útil.

---

## Errores Comunes a Evitar

### 1. Olvidar que Set no tiene índices

```javascript
const miSet = new Set(["a", "b", "c"]);

// ❌ INCORRECTO
miSet[0]  // undefined

// ✓ CORRECTO - convertir a array primero
Array.from(miSet)[0]  // "a"
```

### 2. Confundir `size` con `length`

```javascript
const miSet = new Set([1, 2, 3]);
const miArray = [1, 2, 3];

// Set usa size
miSet.size    // 3
miSet.length  // undefined

// Array usa length
miArray.length  // 3
```

### 3. Comparar Sets directamente

```javascript
const set1 = new Set([1, 2, 3]);
const set2 = new Set([1, 2, 3]);

// ❌ INCORRECTO
set1 === set2  // false (son objetos diferentes)

// ✓ CORRECTO - comparar contenido
set1.size === set2.size && [...set1].every(x => set2.has(x))
```

---

## Ejercicios Adicionales para Practicar

1. **Unión de etiquetas**: Crea una función que devuelva la unión de las etiquetas de dos artículos.

2. **Artículos sin relacionar**: Encuentra artículos que no comparten ninguna etiqueta con ningún otro.

3. **Etiquetas exclusivas**: Encuentra etiquetas que solo aparecen en un único artículo.

4. **Similitud**: Crea una función que calcule el porcentaje de etiquetas en común entre dos artículos.

---

## Referencias Adicionales

- [Set - MDN Web Docs](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Set)
- [for...of - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/for...of)
- [Array.from() - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/from)
- [Operador spread (...) - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

