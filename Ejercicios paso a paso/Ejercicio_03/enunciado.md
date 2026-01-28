# Ejercicio 3: Lista de la Compra con Cálculo de Totales

## Contexto

Estás creando una pequeña aplicación para gestionar una lista de la compra. Tienes un array con los productos que has comprado y otro array con sus precios correspondientes. Necesitas calcular el total de la compra, encontrar el producto más caro y contar cuántos productos superan un precio determinado.

## Objetivo

Crea un programa en JavaScript que:

1. Defina dos **arrays**:
   - Uno con los nombres de los productos (strings)
   - Otro con los precios de cada producto (números), en el mismo orden

2. Usando un bucle **`for`**, calcule:
   - El **precio total** de todos los productos
   - El **producto más caro** y su precio
   - **Cuántos productos** cuestan más de 5€

3. Muestre los resultados de forma clara por consola.

## Datos de ejemplo

```javascript
const productos = ["Leche", "Pan", "Huevos", "Queso", "Jamón", "Aceite", "Arroz", "Pasta"];
const precios = [1.20, 0.90, 2.50, 4.80, 6.50, 5.99, 1.85, 1.10];
```

## Requisitos

- Utiliza un bucle `for` tradicional para recorrer los arrays.
- Crea una función `calcularTotal(precios)` que devuelva la suma de todos los precios.
- Crea una función `encontrarMasCaro(productos, precios)` que devuelva el nombre y precio del producto más caro.
- Crea una función `contarProductosCaros(precios, umbral)` que cuente cuántos productos superan el umbral indicado.

## Ejemplo de salida esperada

```
🛒 Lista de la Compra
=====================
Productos: Leche, Pan, Huevos, Queso, Jamón, Aceite, Arroz, Pasta

📊 Resumen:
- Total de productos: 8
- Precio total: 24.84 €
- Producto más caro: Jamón (6.50 €)
- Productos que cuestan más de 5.00 €: 2
```

## Pistas

- Los arrays tienen una propiedad `.length` que indica cuántos elementos contienen.
- Puedes acceder a un elemento de un array con `array[indice]`, donde el índice empieza en 0.
- Para encontrar el máximo, necesitas una variable que guarde el valor más alto encontrado hasta el momento.
- Recuerda que `i++` es equivalente a `i = i + 1`.

## Bonus (opcional)

1. Calcula el **precio medio** de los productos.
2. Encuentra el **producto más barato**.
3. Crea una función que genere un "ticket de compra" formateado con cada producto y su precio.

