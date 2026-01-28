# Ejercicio 4: Simulador de Cajero Automático

## Contexto

Estás desarrollando un simulador de cajero automático simplificado. El cajero debe permitir realizar varias operaciones bancarias y seguir funcionando hasta que el usuario decida salir.

## Objetivo

Crea un programa en JavaScript que simule un cajero automático con las siguientes funcionalidades:

1. **Consultar saldo**: Muestra el saldo actual de la cuenta.
2. **Ingresar dinero**: Añade una cantidad al saldo.
3. **Retirar dinero**: Resta una cantidad del saldo (si hay fondos suficientes).
4. **Salir**: Termina la ejecución del programa.

## Requisitos

- Usa un bucle **`while`** para mantener el cajero funcionando hasta que el usuario elija salir.
- Usa **`switch`** para gestionar las diferentes opciones del menú.
- El saldo inicial será de 1000€.
- No se puede retirar más dinero del disponible.
- Crea funciones para cada operación:
  - `consultarSaldo(saldo)` - Muestra el saldo
  - `ingresarDinero(saldo, cantidad)` - Devuelve el nuevo saldo
  - `retirarDinero(saldo, cantidad)` - Devuelve el nuevo saldo o el mismo si no hay fondos

## Simulación de operaciones

Como no podemos pedir datos al usuario en este ejercicio, simularemos una secuencia de operaciones con un array:

```javascript
const operaciones = [
    { opcion: 1 },                    // Consultar saldo
    { opcion: 2, cantidad: 500 },     // Ingresar 500€
    { opcion: 1 },                    // Consultar saldo
    { opcion: 3, cantidad: 200 },     // Retirar 200€
    { opcion: 3, cantidad: 2000 },    // Intentar retirar 2000€ (fallará)
    { opcion: 1 },                    // Consultar saldo
    { opcion: 4 }                     // Salir
];
```

## Ejemplo de salida esperada

```
🏧 CAJERO AUTOMÁTICO
====================

Operación: Consultar saldo
💰 Su saldo actual es: 1000.00 €

Operación: Ingresar dinero
📥 Ingreso de 500.00 € realizado correctamente.

Operación: Consultar saldo
💰 Su saldo actual es: 1500.00 €

Operación: Retirar dinero
📤 Retiro de 200.00 € realizado correctamente.

Operación: Retirar dinero
❌ Fondos insuficientes. Su saldo es 1300.00 € y quiere retirar 2000.00 €

Operación: Consultar saldo
💰 Su saldo actual es: 1300.00 €

Operación: Salir
👋 Gracias por usar nuestro cajero. ¡Hasta pronto!
```

## Pistas

- El bucle `while` continúa mientras una condición sea `true`.
- `switch` evalúa una expresión y ejecuta el código del `case` correspondiente.
- No olvides el `break` en cada `case` del `switch`.
- Usa el `case default` para manejar opciones no válidas.

## Bonus (opcional)

1. Añade una opción para **transferir dinero** a otra cuenta (simplemente resta del saldo).
2. Añade un **límite de retiro diario** de 600€.
3. Cuenta cuántas operaciones se han realizado en la sesión.

