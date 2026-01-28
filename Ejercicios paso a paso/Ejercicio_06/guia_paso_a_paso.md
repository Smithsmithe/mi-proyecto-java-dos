# Guía Paso a Paso: Sistema de Inventario de una Tienda

## Conceptos de JavaScript necesarios

Este ejercicio combina **arrays** y **objetos** para trabajar con colecciones de datos estructurados, un patrón muy común en programación real.

### 1. Arrays de Objetos

Un array puede contener objetos como elementos. Es la forma más común de representar colecciones de datos:

```javascript
const usuarios = [
    { nombre: "Ana", edad: 25 },
    { nombre: "Luis", edad: 30 },
    { nombre: "María", edad: 28 }
];

// Acceder al primer usuario
console.log(usuarios[0]);           // { nombre: "Ana", edad: 25 }

// Acceder a una propiedad del primer usuario
console.log(usuarios[0].nombre);    // "Ana"

// Acceder al segundo usuario, propiedad edad
console.log(usuarios[1].edad);      // 30
```

**Patrón de acceso:** `array[indice].propiedad`

### 2. El método `push()`

Añade uno o más elementos al final de un array:

```javascript
const frutas = ["manzana", "naranja"];

frutas.push("plátano");
console.log(frutas);  // ["manzana", "naranja", "plátano"]

frutas.push("uva", "pera");
console.log(frutas);  // ["manzana", "naranja", "plátano", "uva", "pera"]
```

📚 **Documentación**: [Array.push() - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/push)

### 3. Patrón: Filtrar elementos de un array

Para obtener elementos que cumplan una condición:

```javascript
function filtrar(array, condicion) {
    const resultados = [];  // 1. Crear array vacío
    
    for (let i = 0; i < array.length; i++) {
        if (/* condición */) {
            resultados.push(array[i]);  // 2. Añadir si cumple
        }
    }
    
    return resultados;  // 3. Devolver resultados
}
```

### 4. Patrón: Buscar un elemento

Para encontrar un elemento específico:

```javascript
function buscar(array, valorBuscado) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === valorBuscado) {
            return array[i];  // Encontrado: devolver y salir
        }
    }
    return null;  // No encontrado
}
```

**Nota:** `return` dentro de un bucle lo termina inmediatamente.

### 5. Objetos pasados por referencia

En JavaScript, los objetos no se copian, se pasan por **referencia**:

```javascript
const producto = { nombre: "Laptop", precio: 999 };

function aplicarDescuento(prod) {
    prod.precio = prod.precio * 0.9;  // Modifica el ORIGINAL
}

aplicarDescuento(producto);
console.log(producto.precio);  // 899.1 (¡el original cambió!)
```

Esto significa que si modificas un objeto dentro de una función, el objeto original también cambia.

### 6. Objetos dinámicos (añadir propiedades)

Puedes añadir propiedades a un objeto que no existían:

```javascript
const conteo = {};  // Objeto vacío

conteo["manzanas"] = 5;
conteo["naranjas"] = 3;

console.log(conteo);  // { manzanas: 5, naranjas: 3 }

// También con notación de punto
conteo.peras = 7;
console.log(conteo);  // { manzanas: 5, naranjas: 3, peras: 7 }
```

---

## Proceso de Resolución Paso a Paso

### Paso 1: Entender la estructura de datos

Cada producto es un objeto con 4 propiedades:

```javascript
{
    nombre: "Auriculares Bluetooth",  // string
    precio: 49.99,                     // number
    stock: 15,                         // number
    categoria: "audio"                 // string
}
```

El inventario es un **array** de estos objetos.

### Paso 2: Función `buscarPorCategoria`

**Objetivo:** Devolver todos los productos de una categoría.

**Algoritmo:**
1. Crear un array vacío para resultados
2. Recorrer cada producto
3. Si su categoría coincide, añadirlo a resultados
4. Devolver el array de resultados

```javascript
function buscarPorCategoria(listaProductos, categoria) {
    const resultados = [];
    
    for (let i = 0; i < listaProductos.length; i++) {
        const producto = listaProductos[i];
        
        if (producto.categoria === categoria) {
            resultados.push(producto);
        }
    }
    
    return resultados;
}
```

**Traza con categoria = "audio":**
```
i=0: "Auriculares Bluetooth" → categoria "audio" === "audio"? SÍ → push
i=1: "Teclado Mecánico" → categoria "perifericos" === "audio"? NO
i=2: "Ratón Gaming" → categoria "perifericos" === "audio"? NO
i=3: "Monitor 24 pulgadas" → categoria "monitores" === "audio"? NO
i=4: "Altavoces 2.1" → categoria "audio" === "audio"? SÍ → push
i=5: "Webcam HD" → categoria "perifericos" === "audio"? NO
i=6: "Monitor 27 pulgadas" → categoria "monitores" === "audio"? NO
i=7: "Micrófono USB" → categoria "audio" === "audio"? SÍ → push

Resultado: [Auriculares, Altavoces, Micrófono] (3 productos)
```

### Paso 3: Función `obtenerStockBajo`

**Objetivo:** Encontrar productos con stock menor a un umbral.

```javascript
function obtenerStockBajo(listaProductos, minimo) {
    const productosBajos = [];
    
    for (let i = 0; i < listaProductos.length; i++) {
        if (listaProductos[i].stock < minimo) {
            productosBajos.push(listaProductos[i]);
        }
    }
    
    return productosBajos;
}
```

Es el mismo patrón que antes, pero la condición compara el stock.

### Paso 4: Función `calcularValorInventario`

**Objetivo:** Sumar (precio × stock) de todos los productos.

```javascript
const calcularValorInventario = (listaProductos) => {
    let valorTotal = 0;
    
    for (let i = 0; i < listaProductos.length; i++) {
        const producto = listaProductos[i];
        const valorProducto = producto.precio * producto.stock;
        valorTotal += valorProducto;
    }
    
    return valorTotal;
};
```

**Cálculo:**
```
Auriculares: 49.99 × 15 = 749.85
Teclado: 89.99 × 8 = 719.92
Ratón: 35.50 × 3 = 106.50
Monitor 24": 199.99 × 4 = 799.96
Altavoces: 65.00 × 12 = 780.00
Webcam: 45.00 × 0 = 0.00
Monitor 27": 299.99 × 2 = 599.98
Micrófono: 79.99 × 6 = 479.94
─────────────────────────────
TOTAL: 4236.15 €
```

### Paso 5: Función `buscarProducto`

**Objetivo:** Encontrar UN producto por nombre, o devolver `null`.

```javascript
const buscarProducto = (listaProductos, nombreBuscado) => {
    for (let i = 0; i < listaProductos.length; i++) {
        if (listaProductos[i].nombre === nombreBuscado) {
            return listaProductos[i];  // ¡Encontrado! Salir del bucle
        }
    }
    
    return null;  // Llegamos al final sin encontrarlo
};
```

**Diferencia con filtrar:** Aquí solo queremos UN resultado, así que usamos `return` para salir en cuanto lo encontramos.

### Paso 6: Función `aplicarDescuento`

**Objetivo:** Modificar el precio de productos de una categoría.

```javascript
function aplicarDescuento(listaProductos, categoria, porcentaje) {
    const productosModificados = [];
    
    for (let i = 0; i < listaProductos.length; i++) {
        const producto = listaProductos[i];
        
        if (producto.categoria === categoria) {
            const precioAnterior = producto.precio;
            const descuento = producto.precio * (porcentaje / 100);
            producto.precio = producto.precio - descuento;
            
            productosModificados.push({
                nombre: producto.nombre,
                precioAnterior: precioAnterior,
                precioNuevo: producto.precio
            });
        }
    }
    
    return productosModificados;
}
```

**⚠️ Importante:** Esta función **modifica el array original** porque los objetos se pasan por referencia.

### Paso 7: BONUS - Contar por categoría

**Objetivo:** Crear un objeto con el conteo de cada categoría.

```javascript
function contarPorCategoria(listaProductos) {
    const conteo = {};
    
    for (let i = 0; i < listaProductos.length; i++) {
        const categoria = listaProductos[i].categoria;
        
        if (!conteo[categoria]) {
            conteo[categoria] = 0;  // Primera vez: inicializar
        }
        
        conteo[categoria]++;  // Incrementar
    }
    
    return conteo;
}
```

**Traza:**
```
i=0: categoria="audio" → conteo["audio"] no existe → inicializar a 0 → incrementar
     conteo = { audio: 1 }

i=1: categoria="perifericos" → no existe → inicializar → incrementar
     conteo = { audio: 1, perifericos: 1 }

i=2: categoria="perifericos" → ya existe (1) → incrementar
     conteo = { audio: 1, perifericos: 2 }

... y así sucesivamente

Resultado final: { audio: 3, perifericos: 3, monitores: 2 }
```

---

## Puntos Clave de Aprendizaje

### Patrón: Filtrar array de objetos

```javascript
function filtrarPor(array, propiedad, valor) {
    const resultados = [];
    for (let i = 0; i < array.length; i++) {
        if (array[i][propiedad] === valor) {
            resultados.push(array[i]);
        }
    }
    return resultados;
}

// Uso
filtrarPor(inventario, "categoria", "audio");
filtrarPor(usuarios, "activo", true);
```

### Patrón: Buscar en array de objetos

```javascript
function buscarPor(array, propiedad, valor) {
    for (let i = 0; i < array.length; i++) {
        if (array[i][propiedad] === valor) {
            return array[i];
        }
    }
    return null;
}

// Uso
buscarPor(inventario, "nombre", "Teclado Mecánico");
```

### Patrón: Acumular/Reducir

```javascript
function sumarPropiedad(array, propiedad) {
    let total = 0;
    for (let i = 0; i < array.length; i++) {
        total += array[i][propiedad];
    }
    return total;
}

// Uso
sumarPropiedad(inventario, "stock");  // Total de unidades
```

---

## Errores Comunes a Evitar

### 1. Olvidar que los objetos se modifican por referencia

```javascript
// ❌ Esto modifica el original
function duplicarPrecio(producto) {
    producto.precio = producto.precio * 2;
}

// ✓ Si no quieres modificar el original, crea una copia
function duplicarPrecio(producto) {
    return {
        nombre: producto.nombre,
        precio: producto.precio * 2,
        // ... otras propiedades
    };
}
```

### 2. Confundir `return` dentro de un bucle

```javascript
// ❌ INCORRECTO: devuelve en la primera iteración
function buscarTodos(array, valor) {
    for (let i = 0; i < array.length; i++) {
        return array[i];  // ¡Sale inmediatamente!
    }
}

// ✓ CORRECTO: acumular y devolver al final
function buscarTodos(array, valor) {
    const resultados = [];
    for (let i = 0; i < array.length; i++) {
        if (array[i] === valor) {
            resultados.push(array[i]);
        }
    }
    return resultados;
}
```

### 3. No inicializar propiedades dinámicas

```javascript
// ❌ INCORRECTO
const conteo = {};
conteo["manzanas"]++;  // NaN (undefined + 1)

// ✓ CORRECTO
const conteo = {};
if (!conteo["manzanas"]) {
    conteo["manzanas"] = 0;
}
conteo["manzanas"]++;  // 1
```

---

## Ejercicios Adicionales para Practicar

1. **Ordenar por precio**: Crea una función que devuelva el inventario ordenado de menor a mayor precio.

2. **Producto más caro**: Encuentra el producto con el precio más alto.

3. **Actualizar stock**: Crea una función que reciba un nombre de producto y una cantidad, y actualice el stock.

4. **Productos agotados**: Crea una función que devuelva solo los productos con stock = 0.

5. **Valor por categoría**: Calcula el valor del inventario para cada categoría por separado.

---

## Referencias Adicionales

- [Arrays - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [Array.push() - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/push)
- [Trabajando con objetos - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Working_with_Objects)
- [Paso por valor vs referencia - JavaScript.info](https://es.javascript.info/object-copy)

