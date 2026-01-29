const conjuntoAnimalesVacio = new Set();
const conjuntoAnimales = new Set(['perro', 'gato', 'pez', 'loro', 'Elefante', 'perro', 'gato']);

console.log('set animales: '+ Array.from(conjuntoAnimales));

conjuntoAnimales.add('hamster');
conjuntoAnimales.delete('pez');
console.log('set animales(2): ' + Array.from(conjuntoAnimales));
console.log(conjuntoAnimales.size); // 4

console.log(conjuntoAnimales.has('gato'));
console.log(conjuntoAnimales.has('pez'));
console.log(conjuntoAnimales.has('perro'));

conjuntoAnimales.clear();
console.log(conjuntoAnimales.size); // 0

conjuntoAnimales.add('tortuga').add('conejo').add('iguana').add(10).add(true).add(new Set());
console.log("Interando sobre el conjunto animales... ");
for (animal of conjuntoAnimales) {
    console.log('-'+ animal);
}
