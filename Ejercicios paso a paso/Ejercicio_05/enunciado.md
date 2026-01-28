# Ejercicio 5: Gestión de Perfiles de Usuario

## Contexto

Estás desarrollando un sistema de gestión de perfiles de usuario para una aplicación web. Cada usuario tiene diferentes datos asociados (nombre, email, edad, etc.) y necesitas crear funciones que validen y muestren esta información.

## Objetivo

Crea un programa en JavaScript que:

1. Defina varios **objetos** representando perfiles de usuario con diferentes propiedades.
2. Acceda a las propiedades de los objetos usando **notación de punto** y **notación de corchetes**.
3. Valide los datos del usuario comprobando si existen o tienen valor (usando **valores truthy/falsy**).
4. Muestre un resumen del perfil, indicando qué datos están completos y cuáles faltan.

## Datos de ejemplo

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
    email: "",
    edad: 0,
    telefono: null,
    direccion: undefined,
    premium: false
};
```

## Requisitos

- Crea una función `mostrarPerfil(usuario)` que muestre todas las propiedades del usuario.
- Crea una función `validarPerfil(usuario)` que verifique qué campos tienen valor y cuáles no, aprovechando los valores truthy/falsy.
- Crea una función `obtenerPropiedad(usuario, nombrePropiedad)` que use notación de corchetes para acceder dinámicamente a una propiedad.
- El programa debe manejar correctamente los valores `null`, `undefined`, `""` (string vacío), `0` y `false`.

## Ejemplo de salida esperada

```
👤 PERFIL DE USUARIO
====================
Nombre: María García
Email: maria@example.com
Edad: 28 años
Teléfono: 612345678
Dirección: Calle Mayor 15, Madrid
Cuenta Premium: Sí

✅ Validación del perfil:
- nombre: ✓ Completo
- email: ✓ Completo
- edad: ✓ Completo
- telefono: ✓ Completo
- direccion: ✓ Completo
- premium: ✓ Completo

Campos completos: 6/6
```

```
👤 PERFIL DE USUARIO
====================
Nombre: Pedro López
Email: (no especificado)
Edad: (no especificada)
Teléfono: (no especificado)
Dirección: (no especificada)
Cuenta Premium: No

✅ Validación del perfil:
- nombre: ✓ Completo
- email: ✗ Falta
- edad: ✗ Falta
- telefono: ✗ Falta
- direccion: ✗ Falta
- premium: ✓ Completo (valor: false)

Campos completos: 2/6
```

## Pistas

- En JavaScript, los valores "falsy" son: `false`, `0`, `""`, `null`, `undefined`, `NaN`
- Todos los demás valores son "truthy"
- Puedes acceder a propiedades con `objeto.propiedad` o `objeto["propiedad"]`
- La notación de corchetes permite usar variables: `objeto[variableConNombre]`
- El valor `false` es diferente de "no tener valor": es un valor válido para booleanos

## Bonus (opcional)

1. Crea una función que devuelva un array con los nombres de los campos que faltan.
2. Añade una propiedad `fechaRegistro` como objeto Date y muéstrala formateada.
3. Crea una función que "fusione" dos perfiles, completando los campos vacíos del primero con los del segundo.

