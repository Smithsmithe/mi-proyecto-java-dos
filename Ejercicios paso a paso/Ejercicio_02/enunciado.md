# Ejercicio 2: Calculadora de Propinas en un Restaurante

## Contexto

Estás desarrollando una pequeña aplicación para un restaurante que ayuda a los clientes a calcular la propina que quieren dejar y dividir la cuenta entre varias personas.

En muchos países es habitual dejar propina tras una comida. El porcentaje puede variar:
- **10%** - Servicio aceptable
- **15%** - Buen servicio
- **20%** - Servicio excelente

## Objetivo

Crea un programa en JavaScript que:

1. Defina una **función tradicional** (`function`) llamada `calcularPropina` que reciba el importe de la cuenta y el porcentaje de propina, y devuelva el valor de la propina.

2. Defina una **función flecha** llamada `calcularTotalConPropina` que reciba el importe y la propina, y devuelva el total a pagar.

3. Defina una **función flecha** llamada `dividirCuenta` que reciba el total y el número de personas, y devuelva cuánto debe pagar cada una.

4. En el programa principal:
   - Declara variables para el importe de la cuenta, el porcentaje de propina deseado y el número de comensales.
   - Usa las funciones para calcular y mostrar:
     - El importe de la propina
     - El total a pagar (cuenta + propina)
     - Cuánto paga cada persona

## Requisitos

- La función `calcularPropina` debe usar la sintaxis tradicional `function`.
- Las funciones `calcularTotalConPropina` y `dividirCuenta` deben usar sintaxis de función flecha (`=>`).
- Todas las funciones deben recibir parámetros y devolver un valor (usar `return`).
- Los resultados monetarios deben mostrarse con 2 decimales.

## Ejemplo de salida esperada

```
🍽️  Calculadora de Propinas
===========================
Importe de la cuenta: 85.50 €
Porcentaje de propina: 15%
Número de comensales: 4

📊 Desglose:
- Propina: 12.83 €
- Total a pagar: 98.33 €
- Cada persona paga: 24.58 €
```

## Pistas

- Para calcular un porcentaje: `importe * (porcentaje / 100)`
- Para redondear a 2 decimales puedes usar `toFixed(2)` (devuelve un string) o `Math.round(numero * 100) / 100`
- Las funciones flecha con una sola expresión pueden omitir las llaves `{}` y el `return`

## Bonus (opcional)

Si terminas pronto, añade una función que sugiera el porcentaje de propina según una valoración del servicio (1-5 estrellas).

