## Solución: Resumen de Comandos
```bash
# Inicializar repositorio local
mkdir mi-proyecto-javascript (Se trata de crear un directorio, puede hacerse desde el IDE o desde el programa por defecto del sistema operativo)
cd mi-proyecto-javascript (movernos al directorio creado desde la terminal. De nuevo, esto puede hacerse a través del IDE o desde la interfaz gráfica de sistema operativo)
git init

# Crear un archivo inicial y hacer un commit
# Para ello creamos en el IDE algun archivo, o usamos el mismo index.js generado.
git add index.js
git commit -m "Inicializando el repositorio"

# Enlazar con repositorio remoto
git remote add origin https://github.com/tu-usuario/mi-proyecto-javascript.git
git branch -M master
git push -u origin master

# Hacer un pull después de un cambio en el remoto
git pull origin master
