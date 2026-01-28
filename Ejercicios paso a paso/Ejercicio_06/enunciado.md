# Ejercicio 6: Sistema de Inventario de una Tienda

## Contexto

Trabajas en una tienda de electrónica y necesitas un sistema para gestionar el inventario de productos. Cada producto tiene varias propiedades (nombre, precio, stock, categoría) y necesitas realizar diversas operaciones sobre el conjunto de productos.

## Objetivo

Crea un programa en JavaScript que:

1. Gestione un **array de objetos** donde cada objeto representa un producto.
2. Implemente funciones para:
   - Buscar productos por categoría
   - Encontrar productos con stock bajo (menos de 5 unidades)
   - Calcular el valor total del inventario (precio × stock de cada producto)
   - Buscar un producto por su nombre
   - Aplicar un descuento a todos los productos de una categoría

## Datos de ejemplo

```javascript
const inventario = [
    { nombre: "Auriculares Bluetooth", precio: 49.99, stock: 15, categoria: "audio" },
    { nombre: "Teclado Mecánico", precio: 89.99, stock: 8, categoria: "perifericos" },
    { nombre: "Ratón Gaming", precio: 35.50, stock: 3, categoria: "perifericos" },
    { nombre: "Monitor 24 pulgadas", precio: 199.99, stock: 4, categoria: "monitores" },
    { nombre: "Altavoces 2.1", precio: 65.00, stock: 12, categoria: "audio" },
    { nombre: "Webcam HD", precio: 45.00, stock: 0, categoria: "perifericos" },
    { nombre: "Monitor 27 pulgadas", precio: 299.99, stock: 2, categoria: "monitores" },
    { nombre: "Micrófono USB", precio: 79.99, stock: 6, categoria: "audio" }
];
```

## Requisitos

- `buscarPorCategoria(inventario, categoria)` - Devuelve un array con los productos de esa categoría.
- `obtenerStockBajo(inventario, minimo)` - Devuelve productos con stock menor al mínimo indicado.
- `calcularValorInventario(inventario)` - Devuelve el valor total (suma de precio × stock).
- `buscarProducto(inventario, nombre)` - Devuelve el producto o `null` si no existe.
- `aplicarDescuento(inventario, categoria, porcentaje)` - Reduce el precio de los productos de esa categoría.

## Ejemplo de salida esperada

```
🏪 SISTEMA DE INVENTARIO
========================

📦 Productos de la categoría "audio":
- Auriculares Bluetooth: 49.99 € (15 uds)
- Altavoces 2.1: 65.00 € (12 uds)
- Micrófono USB: 79.99 € (6 uds)

⚠️ Productos con stock bajo (menos de 5 unidades):
- Ratón Gaming: 3 unidades
- Monitor 24 pulgadas: 4 unidades
- Webcam HD: 0 unidades (¡SIN STOCK!)
- Monitor 27 pulgadas: 2 unidades

💰 Valor total del inventario: 3.279,67 €

🔍 Búsqueda de "Teclado Mecánico":
Encontrado: Teclado Mecánico - 89.99 € - Stock: 8

🏷️ Aplicando 10% de descuento a categoría "monitores"...
- Monitor 24 pulgadas: 199.99 € → 179.99 €
- Monitor 27 pulgadas: 299.99 € → 269.99 €
```

## Pistas

- Para buscar en un array, puedes usar un bucle `for` y un `if` dentro.
- Para acumular resultados, crea un array vacío y usa `.push()` para añadir elementos.
- Para modificar objetos en un array, accede a ellos por índice: `inventario[i].precio = nuevoValor`
- Recuerda que los objetos se pasan por referencia, así que modificar un objeto en una función afecta al original.

## Bonus (opcional)

1. Añade una función que ordene el inventario por precio (de menor a mayor).
2. Crea una función que genere un informe con el número de productos por categoría.
3. Implementa una función que detecte productos duplicados (mismo nombre).

