let matrizValores = [
    [3, 5, 9, 1],   
    [12, 4, 7, 8]
];
let maximo = matrizValores[0][0];

for (let i = 0; i < matrizValores.length; i++) {
    for (let j = 0; j < matrizValores[i].length; j++) {
        if (matrizValores[i][j] > maximo) {
            maximo = matrizValores[i][j];
        }
    }   
}  
    console.log("El valor maximo es: " + maximo);
 