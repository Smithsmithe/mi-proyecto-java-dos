
let estudiantes = new Map();

estudiantes.set("juan", new Map([
    ["matematicas", 7],
    ["fisica", 6],
    ["quimica", 8]
]));

estudiantes.set("maria", new Map([
    ["matematicas", 9],
    ["fisica", 8],
    ["quimica", 7]
]));

estudiantes.set("pedro", new Map([
    ["matematicas", 6],
    ["fisica", 5],
    ["quimica", 6]
]));

console.log("Promedios de los estudiantes:");
for (const [nombre, materias] of estudiantes) {
    let suma = 0;
    let asinaturasCount = 0;
    for (let [asigatura, nota] of materias) {
        suma += nota;
        asinaturasCount++;
    }
    let promedio = suma / asinaturasCount;
    console.log(`${nombre}: ${promedio.toFixed(2)}`);
}


// Buscar estudianteespecifico
let estudianteBuscado = "maria";
console.log(`\nNotas de ${estudianteBuscado}:`);
if (estudiantes.has(estudianteBuscado)) {
    for (let [asigatura, nota] of estudiantes.get(estudianteBuscado)) {
        console.log(`${asigatura}: ${nota}`);
    }   
} else {
    console.log("Estudiante no encontrado.");
}   