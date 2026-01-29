// ===============================
// CREACIÓN DE ARRAYS
// ===============================

// Array vacío
const vacio = [];
console.log("Array vacío:");
console.log(vacio);
console.log("Longitud:", vacio.length);
console.log("---------------");

// Array de personas
const personas = ["Carlos", "María", "Juan"];
console.log("Array personas:");
console.log(personas);
console.log("Longitud:", personas.length);
console.log("---------------");

// Array de números
const numeros = [1, 2, 100];
console.log("Array números:");
console.log(numeros);
console.log("Longitud:", numeros.length);
console.log("---------------");

// ===============================
// ARRAY MIXTO
// ===============================

const mix = ["María", 1, 2, 100];
console.log("Array Mix (1):");
console.log(mix);
console.log("Longitud:", mix.length);
console.log("---------------");

// ===============================
// OPERACIONES BÁSICAS
// ===============================

// Agregar elementos
mix.push(100);      // al final
mix.push(true);     // otro al final
mix.unshift(false); // al inicio

console.log("Array Mix (2):");
console.log(mix);
console.log("Longitud:", mix.length);
console.log("---------------");

// Redimensionar el array (crea huecos)
mix[10] = 10;

console.log("Array Mix (3) → AQUÍ SE VEN LOS EMPTY ITEMS:");
console.log(mix);
console.log("Longitud:", mix.length);
console.log("---------------");

// ===============================
// ELIMINAR ELEMENTOS
// ===============================

let lastItem = mix.pop();   // elimina el último (10)
let firstItem = mix.shift(); // elimina el primero (false)

console.log("Elemento eliminado con pop:", lastItem);
console.log("Elemento eliminado con shift:", firstItem);

console.log("Array Mix (4):");
console.log(mix);
console.log("Longitud:", mix.length);
console.log("---------------");

// ===============================
// RECORRER EL ARRAY
// ===============================

console.log("Iterando sobre el array mix:");

for (let indice in mix) {
  console.log(`Índice ${indice}:`, mix[indice]);

  // Multiplicar solo los números
  if (typeof mix[indice] === "number") {
    mix[indice] *= 3;
  }
}

console.log("---------------");

// ===============================
// RESULTADO FINAL
// ===============================

console.log("Array Mix FINAL:");
console.log(mix);
console.log("Longitud final:", mix.length);
