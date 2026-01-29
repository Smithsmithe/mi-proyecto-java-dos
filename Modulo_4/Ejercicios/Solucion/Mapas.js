const menus = new Map();

menus.clear();

menus.set('lunes', ['tostadas', 'cafe', 'zumo']);
menus.set('martes', ['arroz', 'pollo', 'ensalada']);
menus.set('miercoles', ['sopa', 'pescado', 'verduras']);
menus.set(100,['hamburguesa', 'patatas', 'refresco', 'helado']);

menus.delete('miercoles');

menus.set('miercoles', ['arroz', 'carne', 'chuleta']);

const hayMenusViernes = menus.has('viernes');
const menusMartes = menus.get('martes');

console.log("Interando sobre los menús... (clave-valor)");
for (const [clave, valor] of menus) {
    console.log(clave + ': ' + valor);
}

console.log("Interando sobre los menús... (clave)");
for (const clave of menus.keys()) {
    console.log(clave);
}

console.log("Interando sobre los menús... (valor)");
for (const valor of menus.values()) {
    console.log(valor);
}