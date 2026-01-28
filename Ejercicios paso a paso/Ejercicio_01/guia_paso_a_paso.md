# Guía Paso a Paso: Sistema de Verificación de Edad para un Cine

## Conceptos de JavaScript necesarios

Antes de comenzar, repasemos los conceptos que necesitarás para este ejercicio:

### 1. Declaración de Variables con `let`

`let` se usa para declarar variables cuyo valor puede cambiar durante la ejecución del programa.

```javascript
let edad = 25;
edad = 26; // ✓ Esto es válido, podemos cambiar el valor
```

📚 **Documentación**: [let - MDN Web Docs](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/let)

### 2. Declaración de Constantes con `const`

`const` se usa para declarar valores que **no cambiarán** durante la ejecución. Si intentas reasignar una constante, JavaScript lanzará un error.

```javascript
const EDAD_ADULTO = 18;
EDAD_ADULTO = 21; // ✗ ERROR: Assignment to constant variable
```

📚 **Documentación**: [const - MDN Web Docs](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/const)

### 3. Estructuras Condicionales `if-else`

Permiten ejecutar diferentes bloques de código según se cumpla o no una condición.

```javascript
if (condicion) {
    // Se ejecuta si la condición es verdadera (true)
} else {
    // Se ejecuta si la condición es falsa (false)
}
```

Puedes encadenar múltiples condiciones con `else if`:

```javascript
if (condicion1) {
    // Si condicion1 es true
} else if (condicion2) {
    // Si condicion1 es false pero condicion2 es true
} else {
    // Si ninguna condición anterior es true
}
```

📚 **Documentación**: [if...else - MDN Web Docs](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/if...else)

### 4. Operadores de Comparación

| Operador | Significado | Ejemplo |
|----------|-------------|---------|
| `===` | Igual estricto (valor y tipo) | `5 === 5` → true |
| `!==` | Diferente estricto | `5 !== "5"` → true |
| `>=` | Mayor o igual | `10 >= 10` → true |
| `<=` | Menor o igual | `5 <= 10` → true |
| `>` | Mayor que | `10 > 5` → true |
| `<` | Menor que | `5 < 10` → true |

📚 **Documentación**: [Operadores de comparación - MDN Web Docs](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Expressions_and_Operators#operadores_de_comparacion)

---

## Proceso de Resolución Paso a Paso

### Paso 1: Analizar el problema

Antes de escribir código, debemos entender qué necesitamos:

1. **Datos de entrada**: 
   - Edad del cliente (un número)
   - Clasificación de la película (un texto/string)

2. **Datos fijos (constantes)**:
   - Los límites de edad: 7, 12, 16, 18

3. **Lógica necesaria**:
   - Comparar la edad del cliente con el límite correspondiente a la clasificación
   - Determinar si puede o no entrar

4. **Salida**:
   - Un mensaje indicando si el acceso está permitido o denegado

### Paso 2: Definir las constantes

Empezamos por lo que sabemos que **nunca cambiará**: los límites de edad para cada clasificación.

```javascript
const EDAD_MINIMA_7 = 7;
const EDAD_MINIMA_12 = 12;
const EDAD_MINIMA_16 = 16;
const EDAD_MINIMA_18 = 18;
```

**¿Por qué constantes?**
- Estos valores son reglas del negocio que no cambian mientras el programa se ejecuta
- Usar constantes con nombres descriptivos hace el código más legible
- Si en el futuro cambia algún límite, solo hay que modificarlo en un lugar
- Por convención, las constantes se escriben en MAYÚSCULAS con guiones bajos

### Paso 3: Definir las variables de entrada

Ahora definimos los datos que representan al cliente y su elección:

```javascript
let edadCliente = 15;
let clasificacionPelicula = "+12";
```

**¿Por qué variables (`let`)?**
- En un programa real, estos valores vendrían del usuario (un formulario, por ejemplo)
- Podrían cambiar si el usuario selecciona otra película
- Son datos que varían de una ejecución a otra

### Paso 4: Planificar la estructura de decisión

Antes de escribir el código, pensemos en la lógica:

```
SI la clasificación es "TP"
    → Permitir acceso (cualquier edad)
SI NO, SI la clasificación es "+7"
    → Verificar si edad >= 7
SI NO, SI la clasificación es "+12"
    → Verificar si edad >= 12
SI NO, SI la clasificación es "+16"
    → Verificar si edad >= 16
SI NO, SI la clasificación es "+18"
    → Verificar si edad >= 18
SI NO
    → La clasificación no es válida
```

### Paso 5: Implementar la lógica con if-else

Traducimos nuestra planificación a código JavaScript:

```javascript
let accesoPermitido = false;
let mensajeError = "";

if (clasificacionPelicula === "TP") {
    accesoPermitido = true;
} else if (clasificacionPelicula === "+7") {
    if (edadCliente >= EDAD_MINIMA_7) {
        accesoPermitido = true;
    } else {
        mensajeError = "La película requiere tener al menos " + EDAD_MINIMA_7 + " años.";
    }
}
// ... y así sucesivamente para cada clasificación
```

**Observaciones importantes:**
- Inicializamos `accesoPermitido` como `false` (por defecto, denegamos el acceso)
- Usamos `===` para comparar strings (comparación estricta)
- Anidamos un segundo `if` dentro de cada clasificación para verificar la edad

### Paso 6: Manejar el caso de clasificación inválida

Es importante pensar en qué pasa si alguien introduce una clasificación que no existe:

```javascript
} else {
    mensajeError = "Clasificación no válida. Las clasificaciones válidas son: TP, +7, +12, +16, +18";
}
```

Esto es una **buena práctica**: siempre contemplar casos de error o datos inesperados.

### Paso 7: Mostrar el resultado

Finalmente, mostramos el mensaje apropiado según el resultado:

```javascript
if (accesoPermitido) {
    console.log("✓ Acceso permitido. ¡Disfruta de la película!");
} else {
    console.log("✗ Acceso denegado. " + mensajeError);
}
```

---

## Puntos Clave de Aprendizaje

### ¿Cuándo usar `const` vs `let`?

| Usa `const` cuando... | Usa `let` cuando... |
|----------------------|---------------------|
| El valor nunca cambiará | El valor puede cambiar |
| Son configuraciones fijas | Son datos de entrada del usuario |
| Son valores de referencia | Son contadores o acumuladores |

### El patrón "flag" (bandera)

En este ejercicio usamos una variable `accesoPermitido` como "bandera" o "flag":
- Empieza en `false`
- Se cambia a `true` si se cumple alguna condición
- Al final, verificamos su valor para decidir qué hacer

Este es un patrón muy común en programación.

### Strings y comparación estricta

Usamos `===` en lugar de `==` porque:
- `===` compara valor Y tipo (comparación estricta)
- `==` solo compara valor y puede dar resultados inesperados

```javascript
5 == "5"   // true (convierte tipos)
5 === "5"  // false (tipos diferentes: number vs string)
```

---

## Ejercicios Adicionales para Practicar

1. **Modifica el programa** para que también considere si el cliente va acompañado de un adulto (en cuyo caso, se permite el acceso a películas +12 y +16 para menores).

2. **Añade una clasificación más**: "+13" (común en sistemas de clasificación de otros países).

3. **Experimenta cambiando los valores** de `edadCliente` y `clasificacionPelicula` para ver todos los posibles resultados.

---

## Referencias Adicionales

- [Guía de JavaScript - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide)
- [Variables y constantes en JavaScript](https://developer.mozilla.org/es/docs/Learn/JavaScript/First_steps/Variables)
- [Tomando decisiones en tu código - MDN](https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/conditionals)

