# Guía Paso a Paso: Sistema de Diccionario y Traductor

## Conceptos de JavaScript necesarios

Este ejercicio introduce los **Maps**, una estructura de datos clave-valor más potente que los objetos simples.

### 1. ¿Qué es un Map?

Un `Map` es una colección de pares **clave-valor** donde:
- Las claves pueden ser de **cualquier tipo** (no solo strings como en objetos)
- Mantiene el **orden de inserción**
- Tiene métodos específicos para manipular los datos

```javascript
// Crear un Map vacío
const miMap = new Map();

// Crear un Map con valores iniciales
const mapaInicial = new Map([
    ["clave1", "valor1"],
    ["clave2", "valor2"]
]);
```

📚 **Documentación**: [Map - MDN Web Docs](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Map)

### 2. Métodos principales de Map

| Método | Descripción | Ejemplo |
|--------|-------------|---------|
| `set(clave, valor)` | Añade o actualiza un par | `miMap.set("nombre", "Ana")` |
| `get(clave)` | Obtiene el valor de una clave | `miMap.get("nombre")` → "Ana" |
| `has(clave)` | Comprueba si existe la clave | `miMap.has("nombre")` → true |
| `delete(clave)` | Elimina un par clave-valor | `miMap.delete("nombre")` |
| `clear()` | Elimina todos los pares | `miMap.clear()` |
| `size` | Número de pares (propiedad) | `miMap.size` |

```javascript
const edades = new Map();

edades.set("Ana", 25);
edades.set("Luis", 30);
edades.set("María", 28);

console.log(edades.get("Ana"));     // 25
console.log(edades.has("Pedro"));   // false
console.log(edades.size);           // 3

edades.delete("Luis");
console.log(edades.size);           // 2
```

### 3. Iterar sobre un Map

Hay varias formas de recorrer un Map:

**Con `for...of` y desestructuración:**
```javascript
const frutas = new Map([
    ["manzana", 5],
    ["naranja", 3]
]);

// Obtener clave y valor a la vez
for (const [fruta, cantidad] of frutas) {
    console.log(fruta + ": " + cantidad);
}

// Solo claves
for (const fruta of frutas.keys()) {
    console.log(fruta);
}

// Solo valores
for (const cantidad of frutas.values()) {
    console.log(cantidad);
}
```

**La desestructuración `[clave, valor]`:**
```javascript
// En lugar de:
for (const par of frutas) {
    const clave = par[0];
    const valor = par[1];
}

// Podemos escribir:
for (const [clave, valor] of frutas) {
    // clave y valor disponibles directamente
}
```

📚 **Documentación**: [Desestructuración - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)

### 4. Map vs Objeto: ¿Cuándo usar cada uno?

| Característica | Object | Map |
|----------------|--------|-----|
| Claves | Solo strings y symbols | Cualquier tipo |
| Orden | No garantizado | Orden de inserción |
| Tamaño | `Object.keys(obj).length` | `map.size` |
| Iteración | Necesita `Object.keys()` | Directa con `for...of` |
| Rendimiento | Bueno para datos pequeños | Mejor para muchos add/delete |

**Usa Objeto cuando:**
- Las claves son strings simples
- Trabajas con JSON
- Necesitas un registro de datos simple

**Usa Map cuando:**
- Las claves no son strings (números, objetos)
- Necesitas mantener el orden de inserción
- Añades/eliminas claves frecuentemente
- Necesitas saber el tamaño fácilmente

### 5. El método `split()`

Divide un string en un array según un separador:

```javascript
const frase = "hola mundo cruel";
const palabras = frase.split(" ");
console.log(palabras);  // ["hola", "mundo", "cruel"]

const fecha = "2024-01-15";
const partes = fecha.split("-");
console.log(partes);  // ["2024", "01", "15"]
```

📚 **Documentación**: [String.split() - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String/split)

### 6. El método `join()`

El opuesto de `split()`: une un array en un string:

```javascript
const palabras = ["hola", "mundo"];
const frase = palabras.join(" ");
console.log(frase);  // "hola mundo"

const partes = ["2024", "01", "15"];
const fecha = partes.join("-");
console.log(fecha);  // "2024-01-15"
```

### 7. El operador `||` para valores por defecto

Ya lo vimos antes, pero es muy útil con Maps:

```javascript
const conteo = new Map();

// Si la clave no existe, get() devuelve undefined
// undefined || 0 → 0
const valorActual = conteo.get("palabra") || 0;
conteo.set("palabra", valorActual + 1);
```

---

## Proceso de Resolución Paso a Paso

### Paso 1: Diseñar la estructura de datos

Necesitamos:
1. Un **Map** para el diccionario (palabra → información)
2. Un **Map** para estadísticas (palabra → número de búsquedas)

```javascript
const diccionario = new Map();
const estadisticasBusqueda = new Map();
```

Cada entrada del diccionario tendrá como valor un objeto:
```javascript
{
    ingles: "house",
    definicion: "Edificio para habitar",
    ejemplo: "Mi casa tiene tres habitaciones"
}
```

### Paso 2: Función `agregarPalabra`

```javascript
function agregarPalabra(dic, palabra, info) {
    const palabraNormalizada = palabra.toLowerCase();
    
    if (dic.has(palabraNormalizada)) {
        console.log('"' + palabra + '" ya existe.');
        return false;
    }
    
    dic.set(palabraNormalizada, {
        ingles: info.ingles,
        definicion: info.definicion,
        ejemplo: info.ejemplo
    });
    
    return true;
}
```

**Puntos importantes:**
- Normalizamos a minúsculas para evitar duplicados ("Casa" y "casa")
- Verificamos si existe antes de añadir
- Usamos `set()` para añadir el par clave-valor

### Paso 3: Función `buscarPalabra`

```javascript
function buscarPalabra(dic, palabra) {
    const palabraNormalizada = palabra.toLowerCase();
    return dic.get(palabraNormalizada);
}
```

`get()` devuelve:
- El valor si la clave existe
- `undefined` si no existe

### Paso 4: Función `eliminarPalabra`

```javascript
const eliminarPalabra = (dic, palabra) => {
    const palabraNormalizada = palabra.toLowerCase();
    
    if (!dic.has(palabraNormalizada)) {
        console.log('"' + palabra + '" no existe.');
        return false;
    }
    
    dic.delete(palabraNormalizada);
    return true;
};
```

### Paso 5: Función `listarPalabras`

```javascript
function listarPalabras(dic) {
    const palabras = [];
    
    for (const palabra of dic.keys()) {
        palabras.push(palabra);
    }
    
    return palabras;
}
```

`.keys()` devuelve un iterador con todas las claves del Map.

### Paso 6: Función `traducirFrase`

**Algoritmo:**
1. Dividir la frase en palabras con `split(" ")`
2. Para cada palabra, buscar su traducción
3. Si existe, usar la traducción; si no, mantener la original
4. Unir las palabras con `join(" ")`

```javascript
function traducirFrase(dic, frase) {
    const palabras = frase.toLowerCase().split(" ");
    const traduccion = [];
    
    for (let i = 0; i < palabras.length; i++) {
        const palabra = palabras[i];
        const info = dic.get(palabra);
        
        if (info) {
            traduccion.push(info.ingles);
        } else {
            traduccion.push("[" + palabra + "]");
        }
    }
    
    return traduccion.join(" ");
}
```

**Ejemplo:**
```
Frase: "el perro come en casa"
Split: ["el", "perro", "come", "en", "casa"]

"el" → info.ingles = "the" ✓
"perro" → info.ingles = "dog" ✓
"come" → no existe → "[come]"
"en" → info.ingles = "in" ✓
"casa" → info.ingles = "house" ✓

Resultado: "the dog [come] in house"
```

### Paso 7: Funciones de estadísticas

```javascript
function registrarBusqueda(stats, palabra) {
    const palabraNormalizada = palabra.toLowerCase();
    const busquedasActuales = stats.get(palabraNormalizada) || 0;
    stats.set(palabraNormalizada, busquedasActuales + 1);
}
```

**El patrón `get() || 0`:**
- Si la palabra existe: devuelve el número de búsquedas
- Si no existe: devuelve `undefined`, y `undefined || 0` es `0`

```javascript
const obtenerMasBuscadas = (stats, cantidad) => {
    // Convertir Map a array para poder ordenar
    const arrayStats = [];
    
    for (const [palabra, busquedas] of stats) {
        arrayStats.push({ palabra: palabra, busquedas: busquedas });
    }
    
    // Ordenar de mayor a menor
    // ... (algoritmo de ordenación)
    
    // Devolver solo los primeros 'cantidad'
    return arrayStats.slice(0, cantidad);
};
```

---

## Puntos Clave de Aprendizaje

### Patrón: Contador con Map

```javascript
const contador = new Map();

function incrementar(clave) {
    const valorActual = contador.get(clave) || 0;
    contador.set(clave, valorActual + 1);
}

incrementar("manzana");
incrementar("manzana");
incrementar("naranja");

console.log(contador.get("manzana"));  // 2
console.log(contador.get("naranja"));  // 1
```

### Patrón: Diccionario/Caché

```javascript
const cache = new Map();

function obtenerDato(id) {
    // Si ya lo tenemos en caché, devolverlo
    if (cache.has(id)) {
        return cache.get(id);
    }
    
    // Si no, calcularlo/obtenerlo y guardarlo
    const dato = calcularDato(id);
    cache.set(id, dato);
    return dato;
}
```

### Desestructuración en bucles

```javascript
// Sin desestructuración
for (const entrada of miMap) {
    const clave = entrada[0];
    const valor = entrada[1];
}

// Con desestructuración (más limpio)
for (const [clave, valor] of miMap) {
    // clave y valor disponibles directamente
}
```

---

## Errores Comunes a Evitar

### 1. Confundir `get()` con acceso por corchetes

```javascript
const miMap = new Map();
miMap.set("clave", "valor");

// ❌ INCORRECTO (esto es para objetos)
miMap["clave"]  // undefined

// ✓ CORRECTO
miMap.get("clave")  // "valor"
```

### 2. Olvidar que `has()` y `get()` distinguen tipos

```javascript
const miMap = new Map();
miMap.set(1, "número uno");
miMap.set("1", "string uno");

miMap.get(1);    // "número uno"
miMap.get("1");  // "string uno"
miMap.has(1);    // true
miMap.has("1");  // true
// ¡Son claves diferentes!
```

### 3. No normalizar las claves

```javascript
const diccionario = new Map();

// ❌ Problema: "Casa" y "casa" serían diferentes
diccionario.set("Casa", info1);
diccionario.set("casa", info2);  // Dos entradas diferentes

// ✓ Solución: normalizar siempre
diccionario.set(palabra.toLowerCase(), info);
```

---

## Ejercicios Adicionales para Practicar

1. **Añadir sinónimos**: Modifica la estructura para que cada palabra pueda tener múltiples sinónimos.

2. **Búsqueda inversa**: Crea una función que dado el inglés, devuelva el español.

3. **Exportar/Importar**: Crea funciones para convertir el Map a JSON y viceversa.

4. **Palabras similares**: Implementa una búsqueda que encuentre palabras que empiecen igual (ej: "cas" encuentra "casa", "casas", "casero").

---

## Referencias Adicionales

- [Map - MDN Web Docs](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Map)
- [String.split() - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String/split)
- [Array.join() - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/join)
- [Desestructuración - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
- [Map vs Object - JavaScript.info](https://es.javascript.info/map-set)

