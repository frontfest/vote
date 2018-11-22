# Webapp de FrontFest para hacer votaciones

El objetivo de la aplicación es que los asistentes a un evento puedan votar introduciendo el código único o localizador de su entrada. Con esto se garantiza que únicamente puedan votar los asistentes reales, y además, como el localizador es único, se evita la duplicidad de voto.

Se usa una base de datos **sqlite** para almacenar la información, que tendrá dos tablas:

- una llamada 'Census', que almacena la lista de localizadores y si han votado ya o no, para así evitar la duplicidad,
- y otra llamada 'Votes', que no será más que una lista de votos, no asociados de ningún modo con los votantes.

De este modo conseguimos recabar la misma información que en unas elecciones normales, es decir, el porcentaje de participación y la cantidad de votos que recibe cada opción. Además, sabemos quién ha votado, pero no qué, por lo que podemos garantizar el anonimato del voto.

## Cargar datos

Crear un archivo en la raíz del proyecto llamado por ejemplo `data.txt`. Hay que introducir en este archivo el cuerpo electoral, que será la lista de localizadores, uno en cada línea. Con esta lista se alimentará la tabla 'Census' al ejecutar el script de carga.

```bash
yarn load data.txt
```

## Ejecutar la aplicación

Ejecutamos y accedemos a través del navegador web en el puerto 3000.

```bash
yarn install
yarn start
```
