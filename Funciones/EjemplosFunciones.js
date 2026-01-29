/**
 * @param {*} cadena
 * @returns true si la cadena es un palíndromo, false en caso contrario
*/
const Palindrome = (cadena) => {
    if (typeof cadena === 'string') {
        let cadenainvertida = cadena.split('').reverse().join('');
        return cadena === cadenainvertida;
    } else {
        return false;
    }
}


const arraToMap = (array) => {
    if ( Array.isArray(array)) {
        let result = new Map();
        for(indice in array){
            result.set(indice, array[indice]);
        }
        return result;
    } else {
        return null;
    }
}


const reverseSet = (set) => {
    if (set instanceof Set) {
        return new Set(Array.from(set).reverse());
    } else {
        return false;
    }
}


// pruebas
console.log(Palindrome("anitalavalatina"));
console.log(arraToMap(['a', 'b', 'c', 'd']));
console.log(reverseSet(new Set([1, 2, 3, 4, 5])));
console.log(reverseSet("esto no es un set"));
console.log(arraToMap("esto no es un array"));
console.log(Palindrome(12321));
console.log(Palindrome(12345));
console.log(Palindrome(["a", "b", "a"]));
console.log(Palindrome({key: "value"}));
console.log(Palindrome(null));
console.log(Palindrome(undefined));
console.log(Palindrome(123.321));
console .log(Palindrome("seres"));
