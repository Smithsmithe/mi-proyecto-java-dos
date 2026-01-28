# Guía Paso a Paso: Gestión de Perfiles de Usuario

## Conceptos de JavaScript necesarios

Este ejercicio introduce los **objetos literales** y el concepto de **valores truthy/falsy**, fundamentales para trabajar con datos estructurados.

### 1. Objetos Literales

Un objeto es una colección de **propiedades** (pares clave-valor). Se define con llaves `{}`:

```javascript
const persona = {
    nombre: "Ana",      // propiedad: valor
    edad: 25,
    ciudad: "Madrid"
};
```

**Características:**
- Las claves (propiedades) son strings (las comillas son opcionales si no tienen espacios)
- Los valores pueden ser de cualquier tipo
- Se separan las propiedades con comas

📚 **Documentación**: [Trabajando con objetos - MDN Web Docs](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Working_with_Objects)

### 2. Acceso a Propiedades

Hay dos formas de acceder a las propiedades:

**Notación de punto** (la más común):
```javascript
const persona = { nombre: "Ana", edad: 25 };

console.log(persona.nombre);  // "Ana"
console.log(persona.edad);    // 25
```

**Notación de corchetes** (permite usar variables):
```javascript
const persona = { nombre: "Ana", edad: 25 };

console.log(persona["nombre"]);  // "Ana"

// Con una variable:
const propiedad = "edad";
console.log(persona[propiedad]); // 25 (acceso dinámico)
```

**¿Cuándo usar cada una?**
- **Punto**: Cuando conoces el nombre de la propiedad al escribir el código
- **Corchetes**: Cuando el nombre viene de una variable o tiene caracteres especiales

📚 **Documentación**: [Accesores de propiedades - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Property_Accessors)

### 3. Valores Truthy y Falsy

En JavaScript, cualquier valor puede evaluarse como `true` o `false` en un contexto booleano (como un `if`).

**Valores FALSY (se evalúan como false):**
```javascript
false      // El booleano false
0          // El número cero
""         // String vacío
null       // Ausencia intencional de valor
undefined  // Variable sin valor asignado
NaN        // Not a Number
```

**Valores TRUTHY (se evalúan como true):**
```javascript
true           // El booleano true
42             // Cualquier número distinto de 0
"hola"         // Cualquier string no vacío
[]             // Array (incluso vacío)
{}             // Objeto (incluso vacío)
function(){}   // Funciones
```

**Ejemplo práctico:**
```javascript
const nombre = "";

if (nombre) {
    console.log("Tiene nombre");
} else {
    console.log("No tiene nombre");  // Se ejecuta esto
}
```

📚 **Documentación**: [Truthy - MDN](https://developer.mozilla.org/es/docs/Glossary/Truthy) | [Falsy - MDN](https://developer.mozilla.org/es/docs/Glossary/Falsy)

### 4. El operador OR (`||`) con valores por defecto

El operador `||` devuelve el primer valor truthy:

```javascript
const nombre = "" || "Anónimo";     // "Anónimo" (porque "" es falsy)
const edad = 0 || "Desconocida";    // "Desconocida" (porque 0 es falsy)
const ciudad = "Madrid" || "N/A";   // "Madrid" (porque es truthy)
```

**Uso común: valores por defecto**
```javascript
function saludar(nombre) {
    const nombreFinal = nombre || "Invitado";
    console.log("Hola, " + nombreFinal);
}

saludar("Ana");   // "Hola, Ana"
saludar("");      // "Hola, Invitado"
saludar();        // "Hola, Invitado"
```

### 5. Operador ternario (`? :`)

Forma abreviada de un if-else que devuelve un valor:

```javascript
// Sintaxis: condicion ? valorSiTrue : valorSiFalse

const edad = 20;
const mensaje = edad >= 18 ? "Mayor de edad" : "Menor de edad";
console.log(mensaje);  // "Mayor de edad"

// Equivalente con if-else:
let mensaje2;
if (edad >= 18) {
    mensaje2 = "Mayor de edad";
} else {
    mensaje2 = "Menor de edad";
}
```

📚 **Documentación**: [Operador ternario - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Conditional_Operator)

---

## Proceso de Resolución Paso a Paso

### Paso 1: Definir los objetos de usuario

Creamos objetos con diferentes estados de datos:

```javascript
const usuarioCompleto = {
    nombre: "María García",
    email: "maria@example.com",
    edad: 28,
    telefono: "612345678",
    direccion: "Calle Mayor 15, Madrid",
    premium: true
};

const usuarioIncompleto = {
    nombre: "Pedro López",
    email: "",           // String vacío - falsy
    edad: 0,             // Cero - falsy
    telefono: null,      // Null - falsy
    direccion: undefined,// Undefined - falsy
    premium: false       // False - es un valor válido
};
```

**Observación importante:** El segundo usuario tiene valores "falsy" intencionalmente para demostrar cómo manejarlos.

### Paso 2: Crear función para mostrar el perfil

```javascript
function mostrarPerfil(usuario) {
    console.log("👤 PERFIL DE USUARIO");
    console.log("====================");
    
    // Usamos || para mostrar un valor por defecto si la propiedad es falsy
    console.log("Nombre: " + (usuario.nombre || "(no especificado)"));
    console.log("Email: " + (usuario.email || "(no especificado)"));
```

**El truco del `||`:**
- Si `usuario.nombre` es truthy → muestra el nombre
- Si `usuario.nombre` es falsy → muestra "(no especificado)"

### Paso 3: Manejar casos especiales

Algunos valores falsy son válidos en ciertos contextos:

```javascript
// La edad 0 es falsy, pero podríamos querer mostrar "0 años"
if (usuario.edad || usuario.edad === 0) {
    console.log("Edad: " + usuario.edad + " años");
} else {
    console.log("Edad: (no especificada)");
}

// premium puede ser false legítimamente (no es premium)
console.log("Cuenta Premium: " + (usuario.premium ? "Sí" : "No"));
```

**Lección importante:** No todos los valores falsy significan "dato faltante":
- `edad: 0` podría ser válido para un recién nacido
- `premium: false` es un valor válido (significa "no es premium")

### Paso 4: Crear función de validación con acceso dinámico

```javascript
const camposPerfil = ["nombre", "email", "edad", "telefono", "direccion", "premium"];

function validarPerfil(usuario) {
    let camposCompletos = 0;
    
    for (let i = 0; i < camposPerfil.length; i++) {
        const campo = camposPerfil[i];
        // Acceso dinámico: usuario[campo] equivale a usuario.nombre, usuario.email, etc.
        const valor = usuario[campo];
        
        if (valor) {
            console.log("- " + campo + ": ✓ Completo");
            camposCompletos++;
        } else {
            console.log("- " + campo + ": ✗ Falta");
        }
    }
    
    return camposCompletos;
}
```

**¿Por qué notación de corchetes?**
```javascript
const campo = "nombre";

// Esto NO funciona:
usuario.campo  // Busca literalmente una propiedad llamada "campo"

// Esto SÍ funciona:
usuario[campo] // Usa el VALOR de la variable campo ("nombre")
               // Equivale a usuario["nombre"] → usuario.nombre
```

### Paso 5: Crear función de acceso dinámico

```javascript
const obtenerPropiedad = (usuario, nombrePropiedad) => {
    return usuario[nombrePropiedad];
};

// Uso:
obtenerPropiedad(usuarioCompleto, "email");  // "maria@example.com"

// Es útil cuando no sabes qué propiedad necesitarás
const propiedadBuscada = "telefono";
const valor = obtenerPropiedad(usuario, propiedadBuscada);
```

---

## Puntos Clave de Aprendizaje

### Tabla de valores Truthy/Falsy

| Valor | Tipo | ¿Truthy/Falsy? |
|-------|------|----------------|
| `false` | Boolean | Falsy |
| `0` | Number | Falsy |
| `""` | String | Falsy |
| `null` | Null | Falsy |
| `undefined` | Undefined | Falsy |
| `NaN` | Number | Falsy |
| `true` | Boolean | Truthy |
| `1`, `-1`, `3.14` | Number | Truthy |
| `"hola"`, `" "` | String | Truthy |
| `[]` | Array | Truthy |
| `{}` | Object | Truthy |

### Cuándo usar cada notación

```javascript
const usuario = { nombre: "Ana", "fecha-registro": "2024-01-15" };

// Notación de punto: simple y legible
usuario.nombre  // ✓

// Notación de corchetes: cuando es necesario
usuario["fecha-registro"]  // ✓ (el guión no permite notación de punto)

const prop = "nombre";
usuario[prop]  // ✓ (acceso dinámico con variable)
```

### Patrón: Valor por defecto con `||`

```javascript
// En lugar de:
let saludo;
if (usuario.nombre) {
    saludo = usuario.nombre;
} else {
    saludo = "Invitado";
}

// Puedes escribir:
const saludo = usuario.nombre || "Invitado";
```

---

## Errores Comunes a Evitar

### 1. Confundir notación de punto y corchetes con variables

```javascript
const campo = "nombre";

// ❌ INCORRECTO
usuario.campo  // Busca propiedad "campo", no "nombre"

// ✓ CORRECTO
usuario[campo]  // Busca propiedad "nombre"
```

### 2. Asumir que falsy = dato faltante

```javascript
// ❌ INCORRECTO (para booleanos)
if (usuario.premium) {
    console.log("Es premium");
}
// Un usuario con premium: false no entra aquí, pero tiene el dato

// ✓ CORRECTO
if (usuario.premium === true) {
    console.log("Es premium");
}
```

### 3. Usar `||` cuando 0 o "" son valores válidos

```javascript
// ❌ INCORRECTO si 0 es un valor válido
const cantidad = datos.cantidad || 10;  // Si cantidad es 0, devuelve 10

// ✓ CORRECTO (operador nullish coalescing, ES2020)
const cantidad = datos.cantidad ?? 10;  // Solo si es null/undefined
```

---

## Ejercicios Adicionales para Practicar

1. **Añade más propiedades**: Añade `fechaNacimiento`, `hobbies` (array) y `redes` (objeto con twitter, instagram).

2. **Modifica una propiedad**: Crea una función que actualice el email de un usuario.

3. **Compara objetos**: Crea una función que compare dos usuarios y diga cuántas propiedades tienen diferentes.

4. **Fusiona perfiles**: Crea una función que complete los datos vacíos de un usuario con los de otro.

---

## Referencias Adicionales

- [Trabajando con objetos - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Working_with_Objects)
- [Accesores de propiedades - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Property_Accessors)
- [Truthy - MDN](https://developer.mozilla.org/es/docs/Glossary/Truthy)
- [Falsy - MDN](https://developer.mozilla.org/es/docs/Glossary/Falsy)
- [Operador ternario - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Conditional_Operator)

