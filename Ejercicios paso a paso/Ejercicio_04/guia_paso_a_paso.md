# Guía Paso a Paso: Simulador de Cajero Automático

## Conceptos de JavaScript necesarios

Este ejercicio introduce el bucle **`while`** y la estructura **`switch`**, dos herramientas fundamentales para control de flujo.

### 1. Bucle `while`

El bucle `while` repite un bloque de código **mientras** una condición sea verdadera.

```javascript
while (condicion) {
    // Código que se repite
    // IMPORTANTE: algo debe cambiar para que la condición 
    // eventualmente sea false, o tendrás un bucle infinito
}
```

**Ejemplo:**
```javascript
let contador = 0;

while (contador < 5) {
    console.log("Contador: " + contador);
    contador++;  // Sin esto, ¡bucle infinito!
}
// Imprime: 0, 1, 2, 3, 4
```

**Diferencia con `for`:**
- `for`: Cuando sabes cuántas veces iterar (recorrer un array, contar hasta N)
- `while`: Cuando no sabes cuántas veces, depende de una condición (esperar input, buscar algo)

📚 **Documentación**: [while - MDN Web Docs](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/while)

### 2. Estructura `switch`

`switch` evalúa una expresión y ejecuta el código del `case` que coincida.

```javascript
switch (expresion) {
    case valor1:
        // Código si expresion === valor1
        break;
    case valor2:
        // Código si expresion === valor2
        break;
    default:
        // Código si no coincide ningún case
        break;
}
```

**Ejemplo:**
```javascript
let dia = 3;

switch (dia) {
    case 1:
        console.log("Lunes");
        break;
    case 2:
        console.log("Martes");
        break;
    case 3:
        console.log("Miércoles");
        break;
    default:
        console.log("Otro día");
        break;
}
// Imprime: "Miércoles"
```

**⚠️ Importancia del `break`:**
Sin `break`, la ejecución "cae" al siguiente case:

```javascript
let numero = 1;

switch (numero) {
    case 1:
        console.log("Uno");
        // ¡Falta break!
    case 2:
        console.log("Dos");
        break;
}
// Imprime: "Uno" y "Dos" (comportamiento no deseado)
```

📚 **Documentación**: [switch - MDN Web Docs](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/switch)

### 3. Variables booleanas como "flags"

Una variable booleana puede controlar un bucle:

```javascript
let continuar = true;

while (continuar) {
    // Hacer algo...
    
    if (condicionParaTerminar) {
        continuar = false;  // El bucle terminará
    }
}
```

Este patrón es muy útil para menús y programas interactivos.

### 4. Comparación: `switch` vs `if-else`

Ambos pueden lograr lo mismo, pero tienen diferentes usos ideales:

```javascript
// Con if-else (mejor para rangos o condiciones complejas)
if (nota >= 90) {
    console.log("Sobresaliente");
} else if (nota >= 70) {
    console.log("Notable");
} else {
    console.log("Necesita mejorar");
}

// Con switch (mejor para valores exactos)
switch (opcion) {
    case 1: hacerAlgo(); break;
    case 2: hacerOtraCosa(); break;
    case 3: hacerOtraMas(); break;
}
```

**Usa `switch` cuando:**
- Comparas una variable contra valores específicos
- Tienes muchos casos posibles (más legible que muchos `else if`)

**Usa `if-else` cuando:**
- Necesitas evaluar rangos (mayor que, menor que)
- Las condiciones son complejas

---

## Proceso de Resolución Paso a Paso

### Paso 1: Analizar el problema

Necesitamos:
1. Un **bucle** que mantenga el cajero funcionando
2. Una forma de **elegir** entre diferentes operaciones
3. **Funciones** para cada operación bancaria
4. Una forma de **terminar** el programa

### Paso 2: Definir las constantes

```javascript
const SALDO_INICIAL = 1000;
const OPCION_CONSULTAR = 1;
const OPCION_INGRESAR = 2;
const OPCION_RETIRAR = 3;
const OPCION_SALIR = 4;
```

**¿Por qué constantes para las opciones?**
- El código es más legible: `case OPCION_CONSULTAR` vs `case 1`
- Si cambias el número de una opción, solo lo cambias en un lugar
- Evita "números mágicos" en el código

### Paso 3: Crear las funciones de operaciones

**Función para consultar saldo:**
```javascript
function consultarSaldo(saldo) {
    console.log("💰 Su saldo actual es: " + saldo.toFixed(2) + " €");
}
```

Esta función solo muestra información, no devuelve nada.

**Función para ingresar dinero:**
```javascript
function ingresarDinero(saldo, cantidad) {
    if (cantidad <= 0) {
        console.log("❌ La cantidad a ingresar debe ser positiva.");
        return saldo;  // Devolvemos el saldo sin cambios
    }
    
    const nuevoSaldo = saldo + cantidad;
    console.log("📥 Ingreso de " + cantidad.toFixed(2) + " € realizado.");
    return nuevoSaldo;
}
```

**Puntos importantes:**
- Validamos que la cantidad sea positiva
- Devolvemos el **nuevo saldo** para actualizar la variable externa
- Si hay error, devolvemos el saldo original sin cambios

**Función para retirar dinero:**
```javascript
const retirarDinero = (saldo, cantidad) => {
    if (cantidad <= 0) {
        console.log("❌ La cantidad a retirar debe ser positiva.");
        return saldo;
    }
    
    if (cantidad > saldo) {
        console.log("❌ Fondos insuficientes.");
        return saldo;
    }
    
    const nuevoSaldo = saldo - cantidad;
    console.log("📤 Retiro de " + cantidad.toFixed(2) + " € realizado.");
    return nuevoSaldo;
};
```

**Validación importante:** No permitimos retirar más de lo disponible.

### Paso 4: Preparar los datos de simulación

```javascript
const operaciones = [
    { opcion: 1 },                    // Consultar saldo
    { opcion: 2, cantidad: 500 },     // Ingresar 500€
    { opcion: 3, cantidad: 200 },     // Retirar 200€
    { opcion: 4 }                     // Salir
];
```

Cada elemento es un **objeto** con:
- `opcion`: El número de operación
- `cantidad`: (opcional) La cantidad para ingresos/retiros

### Paso 5: Configurar el bucle principal

```javascript
let saldo = SALDO_INICIAL;
let indiceOperacion = 0;
let cajeroActivo = true;

while (cajeroActivo) {
    // Obtener operación actual
    const operacionActual = operaciones[indiceOperacion];
    
    // Procesar la operación...
    
    // Avanzar al siguiente
    indiceOperacion++;
    
    // Seguridad: evitar bucle infinito
    if (indiceOperacion >= operaciones.length) {
        cajeroActivo = false;
    }
}
```

**Variables de control:**
- `cajeroActivo`: Controla si el bucle continúa
- `indiceOperacion`: Indica qué operación procesar

### Paso 6: Implementar el switch

```javascript
switch (opcion) {
    case OPCION_CONSULTAR:
        consultarSaldo(saldo);
        break;
        
    case OPCION_INGRESAR:
        saldo = ingresarDinero(saldo, operacionActual.cantidad);
        break;
        
    case OPCION_RETIRAR:
        saldo = retirarDinero(saldo, operacionActual.cantidad);
        break;
        
    case OPCION_SALIR:
        console.log("👋 ¡Hasta pronto!");
        cajeroActivo = false;
        break;
        
    default:
        console.log("❌ Opción no válida.");
        break;
}
```

**Observaciones:**
- Cada `case` termina con `break`
- Para ingresar y retirar, **actualizamos** `saldo` con el valor devuelto
- Para salir, ponemos `cajeroActivo = false` para terminar el `while`
- `default` maneja opciones no válidas

### Paso 7: Traza de ejecución

Veamos cómo funciona con las operaciones de ejemplo:

```
Estado inicial: saldo = 1000, indiceOperacion = 0, cajeroActivo = true

--- Iteración 1 ---
operaciones[0] = { opcion: 1 }
switch(1) → case OPCION_CONSULTAR → consultarSaldo(1000)
Output: "💰 Su saldo actual es: 1000.00 €"
indiceOperacion = 1

--- Iteración 2 ---
operaciones[1] = { opcion: 2, cantidad: 500 }
switch(2) → case OPCION_INGRESAR → saldo = ingresarDinero(1000, 500)
Output: "📥 Ingreso de 500.00 € realizado"
saldo = 1500
indiceOperacion = 2

--- Iteración 3 ---
operaciones[2] = { opcion: 3, cantidad: 200 }
switch(3) → case OPCION_RETIRAR → saldo = retirarDinero(1500, 200)
Output: "📤 Retiro de 200.00 € realizado"
saldo = 1300
indiceOperacion = 3

--- Iteración 4 ---
operaciones[3] = { opcion: 4 }
switch(4) → case OPCION_SALIR → cajeroActivo = false
Output: "👋 ¡Hasta pronto!"

--- Fin del while (cajeroActivo es false) ---
```

---

## Puntos Clave de Aprendizaje

### Patrón: Bucle controlado por bandera

```javascript
let continuar = true;

while (continuar) {
    // ... hacer cosas ...
    
    if (condicionDeSalida) {
        continuar = false;
    }
}
```

### Patrón: Menú con switch

```javascript
switch (opcionUsuario) {
    case 1:
        // Opción 1
        break;
    case 2:
        // Opción 2
        break;
    // ...más opciones...
    default:
        // Opción no válida
        break;
}
```

### Funciones que modifican estado

Cuando una función necesita "modificar" una variable externa:
1. Recibe el valor actual como parámetro
2. Calcula el nuevo valor
3. Lo devuelve con `return`
4. El código que llama actualiza la variable

```javascript
function aumentar(valor, incremento) {
    return valor + incremento;
}

let numero = 10;
numero = aumentar(numero, 5);  // numero ahora es 15
```

---

## Errores Comunes a Evitar

### 1. Olvidar el `break` en switch
```javascript
// ❌ INCORRECTO
switch (opcion) {
    case 1:
        hacerAlgo();
        // ¡Falta break! Ejecutará también case 2
    case 2:
        hacerOtraCosa();
        break;
}
```

### 2. Bucle infinito
```javascript
// ❌ INCORRECTO - Bucle infinito
let activo = true;
while (activo) {
    console.log("Hola");
    // ¡Nunca cambiamos 'activo' a false!
}
```

### 3. No actualizar la variable con el return
```javascript
// ❌ INCORRECTO
ingresarDinero(saldo, 500);  // El nuevo saldo se pierde

// ✓ CORRECTO
saldo = ingresarDinero(saldo, 500);  // Actualizamos saldo
```

---

## Ejercicios Adicionales para Practicar

1. **Añade transferencias**: Nueva opción para transferir a otra cuenta (simplemente restar del saldo).

2. **Historial**: Guarda cada operación en un array y muéstralo al salir.

3. **PIN de seguridad**: Al iniciar, pide un PIN y da 3 intentos antes de bloquear.

4. **Límite de retiro**: No permitir retirar más de 600€ en total por sesión.

---

## Referencias Adicionales

- [while - MDN Web Docs](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/while)
- [switch - MDN Web Docs](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/switch)
- [do...while - MDN Web Docs](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/do...while)
- [Estructuras de control - JavaScript.info](https://es.javascript.info/while-for)

