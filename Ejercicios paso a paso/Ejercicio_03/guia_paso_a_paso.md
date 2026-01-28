# Guía Paso a Paso: Lista de la Compra con Cálculo de Totales

## Conceptos de JavaScript necesarios

Este ejercicio introduce los **arrays** y los **bucles for**, fundamentales para trabajar con colecciones de datos.

### 1. Arrays (Arreglos)

Un array es una colección ordenada de elementos. Puedes almacenar cualquier tipo de dato.

```javascript
// Array de strings
const frutas = ["Manzana", "Naranja", "Plátano"];

// Array de números
const numeros = [10, 20, 30, 40];

// Array mixto (posible, pero no recomendado)
const mixto = ["Hola", 42, true];
```

**Características importantes:**
- Los índices empiezan en **0** (el primer elemento está en la posición 0)
- La propiedad `.length` indica cuántos elementos tiene
- Son mutables: puedes cambiar su contenido

```javascript
const colores = ["rojo", "verde", "azul"];
console.log(colores[0]);      // "rojo" (primer elemento)
console.log(colores[2]);      // "azul" (tercer elemento)
console.log(colores.length);  // 3
```

📚 **Documentación**: [Arrays - MDN Web Docs](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array)

### 2. Bucle `for`

El bucle `for` permite repetir código un número determinado de veces.

```javascript
for (inicialización; condición; actualización) {
    // Código que se repite
}
```

**Las tres partes del `for`:**
1. **Inicialización**: Se ejecuta una vez al inicio (`let i = 0`)
2. **Condición**: Se evalúa antes de cada iteración. Si es `true`, continúa
3. **Actualización**: Se ejecuta al final de cada iteración (`i++`)

```javascript
for (let i = 0; i < 5; i++) {
    console.log("Iteración número: " + i);
}
// Imprime: 0, 1, 2, 3, 4
```

📚 **Documentación**: [for - MDN Web Docs](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/for)

### 3. Recorrer un Array con `for`

El patrón más común para recorrer un array:

```javascript
const frutas = ["Manzana", "Naranja", "Plátano"];

for (let i = 0; i < frutas.length; i++) {
    console.log(frutas[i]);
}
// Imprime: Manzana, Naranja, Plátano
```

**¿Por qué `i < frutas.length` y no `i <= frutas.length`?**
- Si el array tiene 3 elementos, los índices son 0, 1 y 2
- `length` es 3, pero no existe `frutas[3]`
- Por eso usamos `<` (menor estricto)

### 4. El operador `+=`

Es un atajo para sumar y asignar:

```javascript
let total = 0;
total = total + 10;  // Forma larga
total += 10;         // Forma corta (equivalente)

let contador = 0;
contador++;          // Equivale a contador += 1
```

### 5. El método `join()`

Une todos los elementos de un array en un string:

```javascript
const frutas = ["Manzana", "Naranja", "Plátano"];
console.log(frutas.join(", "));  // "Manzana, Naranja, Plátano"
console.log(frutas.join(" - ")); // "Manzana - Naranja - Plátano"
console.log(frutas.join(""));    // "ManzanaNaranjaPlátano"
```

📚 **Documentación**: [Array.join() - MDN Web Docs](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/join)

---

## Proceso de Resolución Paso a Paso

### Paso 1: Analizar el problema

Tenemos dos arrays paralelos (mismo número de elementos, relacionados por posición):

```
Índice:     0        1       2        3        4        5       6       7
Productos: Leche    Pan    Huevos   Queso    Jamón   Aceite  Arroz   Pasta
Precios:   1.20    0.90    2.50     4.80     6.50    5.99    1.85    1.10
```

El producto en `productos[3]` ("Queso") tiene el precio `precios[3]` (4.80).

### Paso 2: Definir los arrays de datos

```javascript
const productos = ["Leche", "Pan", "Huevos", "Queso", "Jamón", "Aceite", "Arroz", "Pasta"];
const precios = [1.20, 0.90, 2.50, 4.80, 6.50, 5.99, 1.85, 1.10];
```

Usamos `const` porque no vamos a reasignar los arrays (aunque podemos modificar su contenido).

### Paso 3: Crear `calcularTotal` - Sumar todos los precios

**Algoritmo:**
1. Crear una variable `total` inicializada en 0
2. Recorrer cada precio del array
3. Sumar cada precio al total
4. Devolver el total

```javascript
function calcularTotal(arrayPrecios) {
    let total = 0;
    
    for (let i = 0; i < arrayPrecios.length; i++) {
        total = total + arrayPrecios[i];
    }
    
    return total;
}
```

**Traza de ejecución:**
```
Inicio: total = 0
i=0: total = 0 + 1.20 = 1.20
i=1: total = 1.20 + 0.90 = 2.10
i=2: total = 2.10 + 2.50 = 4.60
...
Final: total = 24.84
```

### Paso 4: Crear `encontrarMasCaro` - Encontrar el máximo

**Algoritmo:**
1. Asumir que el primer elemento es el más caro
2. Recorrer el resto del array
3. Si encontramos uno mayor, actualizar el máximo
4. Devolver el nombre y precio del más caro

```javascript
function encontrarMasCaro(arrayProductos, arrayPrecios) {
    let indiceMasCaro = 0;
    let precioMasCaro = arrayPrecios[0];
    
    for (let i = 1; i < arrayPrecios.length; i++) {  // Empezamos en 1
        if (arrayPrecios[i] > precioMasCaro) {
            precioMasCaro = arrayPrecios[i];
            indiceMasCaro = i;
        }
    }
    
    return {
        nombre: arrayProductos[indiceMasCaro],
        precio: precioMasCaro
    };
}
```

**¿Por qué empezamos en `i = 1`?**
- Ya asumimos que el elemento en posición 0 es el máximo inicial
- No tiene sentido comparar el elemento 0 consigo mismo

**Traza de ejecución:**
```
Inicio: indiceMasCaro = 0, precioMasCaro = 1.20
i=1: 0.90 > 1.20? NO
i=2: 2.50 > 1.20? SÍ → precioMasCaro = 2.50, indiceMasCaro = 2
i=3: 4.80 > 2.50? SÍ → precioMasCaro = 4.80, indiceMasCaro = 3
i=4: 6.50 > 4.80? SÍ → precioMasCaro = 6.50, indiceMasCaro = 4
i=5: 5.99 > 6.50? NO
i=6: 1.85 > 6.50? NO
i=7: 1.10 > 6.50? NO
Final: indiceMasCaro = 4 (Jamón), precioMasCaro = 6.50
```

### Paso 5: Crear `contarProductosCaros` - Contar con condición

**Algoritmo:**
1. Crear un contador en 0
2. Recorrer cada precio
3. Si el precio supera el umbral, incrementar contador
4. Devolver el contador

```javascript
const contarProductosCaros = (arrayPrecios, umbral) => {
    let contador = 0;
    
    for (let i = 0; i < arrayPrecios.length; i++) {
        if (arrayPrecios[i] > umbral) {
            contador++;
        }
    }
    
    return contador;
};
```

**Con umbral = 5.00:**
```
i=0: 1.20 > 5.00? NO
i=1: 0.90 > 5.00? NO
i=2: 2.50 > 5.00? NO
i=3: 4.80 > 5.00? NO
i=4: 6.50 > 5.00? SÍ → contador = 1
i=5: 5.99 > 5.00? SÍ → contador = 2
i=6: 1.85 > 5.00? NO
i=7: 1.10 > 5.00? NO
Final: contador = 2
```

### Paso 6: Programa principal

```javascript
const UMBRAL_CARO = 5.00;

let total = calcularTotal(precios);
let productoMasCaro = encontrarMasCaro(productos, precios);
let cantidadCaros = contarProductosCaros(precios, UMBRAL_CARO);
```

### Paso 7: Mostrar resultados

```javascript
console.log("- Precio total: " + total.toFixed(2) + " €");
console.log("- Producto más caro: " + productoMasCaro.nombre + 
            " (" + productoMasCaro.precio.toFixed(2) + " €)");
```

---

## Puntos Clave de Aprendizaje

### Patrón: Acumulador

Usado en `calcularTotal`:
```javascript
let acumulador = 0;  // Valor inicial
for (let i = 0; i < array.length; i++) {
    acumulador += array[i];  // Acumular
}
return acumulador;
```

### Patrón: Búsqueda del máximo/mínimo

Usado en `encontrarMasCaro`:
```javascript
let maximo = array[0];  // Asumir el primero
for (let i = 1; i < array.length; i++) {
    if (array[i] > maximo) {  // ¿Es mayor?
        maximo = array[i];    // Actualizar
    }
}
return maximo;
```

### Patrón: Contador con condición

Usado en `contarProductosCaros`:
```javascript
let contador = 0;
for (let i = 0; i < array.length; i++) {
    if (condicion) {
        contador++;
    }
}
return contador;
```

### Arrays paralelos

Cuando tienes datos relacionados en arrays separados:
```javascript
const nombres = ["Ana", "Luis", "María"];
const edades = [25, 30, 28];

// nombres[i] corresponde a edades[i]
for (let i = 0; i < nombres.length; i++) {
    console.log(nombres[i] + " tiene " + edades[i] + " años");
}
```

---

## Errores Comunes a Evitar

### 1. Índice fuera de rango
```javascript
const arr = [1, 2, 3];
console.log(arr[3]); // undefined (no existe)
```

### 2. Usar `<=` en lugar de `<`
```javascript
// ❌ INCORRECTO
for (let i = 0; i <= arr.length; i++) // Accede a índice inexistente

// ✓ CORRECTO
for (let i = 0; i < arr.length; i++)
```

### 3. Olvidar inicializar el acumulador
```javascript
// ❌ INCORRECTO
let total;  // undefined
total += 5; // NaN (Not a Number)

// ✓ CORRECTO
let total = 0;
total += 5; // 5
```

---

## Ejercicios Adicionales para Practicar

1. **Producto más barato**: Modifica `encontrarMasCaro` para crear `encontrarMasBarato`.

2. **Filtrar productos**: Crea una función que devuelva un nuevo array solo con los productos que cuesten menos de 3€.

3. **Ordenar por precio**: Intenta ordenar los productos de menor a mayor precio (investigando el método `.sort()`).

4. **Buscar producto**: Crea una función que reciba el nombre de un producto y devuelva su precio (o -1 si no existe).

---

## Referencias Adicionales

- [Arrays en JavaScript - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [Bucle for - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/for)
- [Array.prototype.join() - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/join)
- [Iteración sobre Arrays - JavaScript.info](https://es.javascript.info/array#iteracion-sobre-los-elementos)

