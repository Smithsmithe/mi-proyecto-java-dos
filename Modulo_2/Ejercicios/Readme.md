# Ejercicio: Crear y Enlazar un Repositorio Local y Remoto con Git

En este ejercicio, aprenderemos cómo crear un repositorio local utilizando `git init`, cómo crear un repositorio remoto en GitHub, y cómo enlazarlos. También verificaremos la conexión mediante `git push` y `git pull`.

## Pasos

### 1. Crear el repositorio local
1. Abre una terminal.
2. Navega hasta la carpeta donde quieres crear tu repositorio local.
3. Ejecuta el comando:
   ```bash
   git init mi-proyecto-javascript
   ```
   Esto inicializa un nuevo repositorio Git en la carpeta `mi-proyecto-javascript`.

4. Navega al directorio recién creado:
   ```bash
   cd mi-proyecto-javascript
   ```

5. Crea un archivo de ejemplo para confirmar los cambios:
   ```bash
   echo "# Mi Proyecto JavaScript" > README.md
   git add README.md
   git commit -m "Inicializando el repositorio con README"
   ```
   
Recuerda que también puedes usar el archivo `index.js` que genera el IDE si has creado el proyecto a través de él.

### 2. Crear el repositorio remoto en GitHub
1. Ve a [GitHub](https://github.com) e inicia sesión en tu cuenta o crea una nueva.
2. Haz clic en el botón "+" (esquina superior derecha) y selecciona "New repository". También puedes encontrar un botón verde que indica "New Repository" en la página de GitHub.
3. Ingresa el nombre `mi-proyecto-javascript`.
4. Opcionalmente, añade una descripción. No marques ninguna opción de inicialización (como README o .gitignore).
5. Haz clic en "Create repository".

### 3. Enlazar el repositorio local con el remoto
1. Copia la URL del repositorio remoto desde la página de GitHub (por ejemplo: `https://github.com/tu-usuario/mi-proyecto-javascript.git`).
2. En la terminal, enlaza el repositorio remoto:
   ```bash
   git remote add origin https://github.com/tu-usuario/mi-proyecto-javascript.git
   ```

3. Empuja los cambios locales al repositorio remoto:
   ```bash
   git branch -M master
   git push -u origin master
   ```

### 4. Verificar la conexión con `git pull`
1. Realiza un cambio directo en el repositorio remoto desde la interfaz web de GitHub:
    - Navega a tu repositorio remoto.
    - Haz clic en el archivo `README.md` o en el archivo que hayas subido al repositorio.
    - Selecciona "Edit this file".
    - Añade una nueva línea vacia (con el mensaje de commit: "Este es un cambio hecho desde GitHub.").
    - Haz clic en "Commit changes".

2. Vuelve a la terminal y actualiza tu repositorio local:
   ```bash
   git pull origin master
   ```
   Confirma que el cambio hecho en GitHub ahora está presente en tu repositorio local.
