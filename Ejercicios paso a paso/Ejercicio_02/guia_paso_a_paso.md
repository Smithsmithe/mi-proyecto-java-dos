# Guía Paso a Paso: Calculadora de Propinas en un Restaurante

## Conceptos de JavaScript necesarios

Este ejercicio introduce las **funciones**, uno de los conceptos más importantes en programación.

### 1. Funciones Tradicionales (`function`)

Una función es un bloque de código reutilizable que realiza una tarea específica. La sintaxis tradicional usa la palabra clave `function`:

```javascript
function nombreFuncion(parametro1, parametro2) {
    // Código que hace algo
    return resultado; // Devuelve un valor
}
```

**Partes de una función:**
- **Nombre**: Identifica la función (usa camelCase)
- **Parámetros**: Valores de entrada entre paréntesis (pueden ser 0 o más)
- **Cuerpo**: El código entre llaves `{}`
- **Return**: Devuelve un valor (opcional, pero muy común)

```javascript
function sumar(a, b) {
    return a + b;
}

let resultado = sumar(5, 3); // resultado = 8
```

📚 **Documentación**: [Funciones - MDN Web Docs](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Functions)

### 2. Funciones Flecha (`=>`)

Introducidas en ES6 (2015), son una forma más concisa de escribir funciones:

```javascript
// Sintaxis completa
const nombreFuncion = (parametro1, parametro2) => {
    // Código
    return resultado;
};

// Sintaxis concisa (una sola expresión)
const nombreFuncion = (parametro1, parametro2) => expresion;
```

**Equivalencias:**

```javascript
// Función tradicional
function duplicar(n) {
    return n * 2;
}

// Función flecha (forma completa)
const duplicar = (n) => {
    return n * 2;
};

// Función flecha (forma concisa) - ¡Sin llaves ni return!
const duplicar = (n) => n * 2;

// Si solo hay UN parámetro, los paréntesis son opcionales
const duplicar = n => n * 2;
```

📚 **Documentación**: [Funciones flecha - MDN Web Docs](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Functions/Arrow_functions)

### 3. Parámetros y Argumentos

- **Parámetros**: Variables que defines en la declaración de la función
- **Argumentos**: Valores reales que pasas al llamar la función

```javascript
//           parámetros
//              ↓   ↓
function saludar(nombre, edad) {
    console.log("Hola " + nombre + ", tienes " + edad + " años");
}

//       argumentos
//          ↓      ↓
saludar("Ana", 25); // "Hola Ana, tienes 25 años"
```

### 4. El método `toFixed()`

Convierte un número a string con un número fijo de decimales:

```javascript
let precio = 19.99999;
console.log(precio.toFixed(2)); // "20.00" (string)
console.log(precio.toFixed(0)); // "20" (string)
```

📚 **Documentación**: [toFixed() - MDN Web Docs](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed)

---

## Proceso de Resolución Paso a Paso

### Paso 1: Analizar el problema

Identifiquemos las operaciones que necesitamos:

| Operación | Entrada | Salida |
|-----------|---------|--------|
| Calcular propina | importe, porcentaje | valor de la propina |
| Calcular total | importe, propina | total a pagar |
| Dividir cuenta | total, personas | pago por persona |

Cada operación será una función.

### Paso 2: Crear la función tradicional `calcularPropina`

Empezamos con la función que calcula la propina. Usamos la sintaxis tradicional:

```javascript
function calcularPropina(importe, porcentaje) {
    const propina = importe * (porcentaje / 100);
    return propina;
}
```

**¿Por qué esta estructura?**
1. Recibimos `importe` (ej: 85.50) y `porcentaje` (ej: 15)
2. Calculamos: `85.50 * (15 / 100)` = `85.50 * 0.15` = `12.825`
3. Devolvemos el resultado

**Probemos mentalmente:**
- `calcularPropina(100, 10)` → `100 * 0.10` = `10` ✓
- `calcularPropina(50, 20)` → `50 * 0.20` = `10` ✓

### Paso 3: Crear la función flecha `calcularTotalConPropina`

Ahora usamos una función flecha con sintaxis completa:

```javascript
const calcularTotalConPropina = (importe, propina) => {
    return importe + propina;
};
```

**¿Por qué `const`?**
- Las funciones flecha se asignan a variables
- Usamos `const` porque la función no va a cambiar

**Versión más concisa:**
Como solo tenemos una expresión, podemos simplificar:

```javascript
const calcularTotalConPropina = (importe, propina) => importe + propina;
```

Cuando una función flecha tiene solo una expresión:
- No necesita llaves `{}`
- No necesita `return` (el resultado se devuelve implícitamente)

### Paso 4: Crear la función flecha `dividirCuenta`

Aplicamos directamente la forma concisa:

```javascript
const dividirCuenta = (total, personas) => total / personas;
```

**Nota importante:** Esta función asume que `personas` nunca será 0. En un programa real, deberíamos validar esto:

```javascript
const dividirCuenta = (total, personas) => {
    if (personas <= 0) {
        return 0; // O lanzar un error
    }
    return total / personas;
};
```

### Paso 5: Definir las variables de entrada

```javascript
let importeCuenta = 85.50;
let porcentajePropina = 15;
let numeroComensales = 4;
```

Usamos `let` porque estos valores representan datos de entrada que podrían cambiar.

### Paso 6: Usar las funciones

Ahora llamamos a las funciones en orden lógico:

```javascript
// Primero calculamos la propina
let propina = calcularPropina(importeCuenta, porcentajePropina);

// Con la propina, calculamos el total
let totalPagar = calcularTotalConPropina(importeCuenta, propina);

// Finalmente, dividimos entre los comensales
let pagoPorPersona = dividirCuenta(totalPagar, numeroComensales);
```

**Observa el flujo de datos:**
```
importeCuenta (85.50) ──┬──→ calcularPropina() ──→ propina (12.825)
                       │                              │
porcentajePropina (15) ─┘                              │
                                                      ↓
importeCuenta (85.50) ──────→ calcularTotalConPropina() ──→ totalPagar (98.325)
                                                              │
                                                              ↓
numeroComensales (4) ──────→ dividirCuenta() ──→ pagoPorPersona (24.58)
```

### Paso 7: Mostrar los resultados formateados

```javascript
console.log("- Propina: " + propina.toFixed(2) + " €");
console.log("- Total a pagar: " + totalPagar.toFixed(2) + " €");
console.log("- Cada persona paga: " + pagoPorPersona.toFixed(2) + " €");
```

Usamos `toFixed(2)` para mostrar exactamente 2 decimales (como es habitual con dinero).

---

## Puntos Clave de Aprendizaje

### ¿Cuándo usar función tradicional vs función flecha?

| Función tradicional | Función flecha |
|---------------------|----------------|
| Más verbosa pero clara | Más concisa |
| Se puede llamar antes de declararla (hoisting) | Debe declararse antes de usarla |
| Tiene su propio `this` | Hereda el `this` del contexto |
| Ideal para métodos de objetos | Ideal para funciones simples, callbacks |

Para este nivel de aprendizaje, **ambas son intercambiables** en la mayoría de casos.

### El principio de responsabilidad única

Cada función hace **una sola cosa**:
- `calcularPropina` → solo calcula la propina
- `calcularTotalConPropina` → solo suma importe + propina
- `dividirCuenta` → solo divide

Esto hace el código:
- Más fácil de entender
- Más fácil de probar
- Más fácil de reutilizar

### Funciones puras

Nuestras funciones son "puras":
- Dado el mismo input, siempre producen el mismo output
- No modifican variables externas
- No tienen efectos secundarios

```javascript
calcularPropina(100, 10); // Siempre devuelve 10
calcularPropina(100, 10); // Siempre devuelve 10
```

---

## Comparativa de Sintaxis

```javascript
// 1. Función tradicional
function calcularPropina(importe, porcentaje) {
    return importe * (porcentaje / 100);
}

// 2. Función flecha - forma completa
const calcularPropina = (importe, porcentaje) => {
    return importe * (porcentaje / 100);
};

// 3. Función flecha - forma concisa
const calcularPropina = (importe, porcentaje) => importe * (porcentaje / 100);
```

Las tres hacen exactamente lo mismo. Elige la que te resulte más clara.

---

## Ejercicios Adicionales para Practicar

1. **Añade validación**: Modifica `calcularPropina` para que devuelva 0 si el porcentaje es negativo.

2. **Crea una función `calcularTodo`**: Que reciba importe, porcentaje y personas, y devuelva un objeto con propina, total y pagoPorPersona.

3. **Redondeo al alza**: Modifica `dividirCuenta` para que redondee al céntimo superior (así nadie paga de menos).

4. **Función de descuento**: Crea una función flecha que aplique un descuento al importe antes de calcular la propina.

---

## Referencias Adicionales

- [Funciones en JavaScript - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Functions)
- [Funciones flecha - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
- [Parámetros de función - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Functions/Default_parameters)
- [Number.prototype.toFixed() - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed)

