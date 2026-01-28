# Modulo 3 - Ejercicios

### Ejercicio 1. Verificar si un número es primo

Crea un programa que lea un número entero positivo y determine si es primo o no. Para esto:

1. Define una función `esPrimo(n)` que reciba un número y devuelva `true` si es primo, o `false` en caso contrario.  
2. Llama a esta función en tu programa principal para mostrar por consola o por pantalla el resultado (por ejemplo, “El número 7 es primo” o “El número 8 no es primo”).  
3. Usa un bucle (`for`) en la función para revisar divisores.  

**Recordatorio**: Un número es primo si es mayor que 1 y solo es divisible por 1 y por sí mismo.

### Ejercicio 2 - Conversion de temperaturas

Se requiere un conversor de temperaturas que permita convertir entre **Celsius** y **Fahrenheit**. El programa debe:

1. Establecer una variable para indicar qué tipo de conversión desea realizar:
    - `1` para Celsius a Fahrenheit,
    - `2` para Fahrenheit a Celsius,
    - `0` para salir.
2. Según la opción elegida, usar un valor determinado por ti para la temperatura y mostrar el resultado de la conversión.
3. Utiliza un **switch** para manejar las distintas opciones de menú.
4. Define al menos dos funciones: `celsiusAFahrenheit` y `fahrenheitACelsius`.


### Ejercicio 3 - Factorial de un número

El factorial de un número entero positivo `n` (representado como `n!`) se define como el producto de todos los enteros positivos desde 1 hasta `n`. Por ejemplo:

``4! = 1 * 2 * 3 * 4 = 24``

Para resolver este ejercicio:
1. Crea una función `factorial(n)` que use un bucle `for` para calcular el factorial de `n`.
2. En tu programa principal, declara una variable con un número entero y muestra el resultado del factorial de ese número.
3. Asegúrate de manejar el caso `n = 0`, cuyo factorial es `1` por definición.

### Ejercicio 4 - Gastos de envío

Un servicio de mensajería ofrece dos tipos de envío:
1. Envío estándar.
2. Envío exprés.

El costo se calcula según el **peso** del paquete y el **tipo de envío**. Por ejemplo, usando la siguiente tabla ficticia:

- **Envío estándar**:
   - Hasta 1 kg: 5 €
   - Más de 1 kg y hasta 5 kg: 10 €
   - Más de 5 kg: 15 €

- **Envío exprés**:
   - Hasta 1 kg: 8 €
   - Más de 1 kg y hasta 5 kg: 14 €
   - Más de 5 kg: 20 €

Debes simular el envío de un paquete:
1. Conoce su **peso** (simulado en una variable).
2. Conoce su **tipo de envío** (simulado en una variable).
3. Calcula el costo y lo devuelve en una funcion `calcularCostoEnvio(peso, tipoEnvio)`.
4. Muestra el costo de enviar varios paquetes en una funcion `simularEnvios()` que llamara varias veces a `calcularCostoEnvio(peso, tipoEnvio)`.

