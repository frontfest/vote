# Webapp para hacer votaciones

El objetivo de la aplicación es que los asistentes a un evento puedan votar introduciendo el código único o localizador de su entrada. Con esto se garantiza que únicamente puedan votar los asistentes reales, y además, como el localizador es único, se evita la duplicidad de voto.

En principio se puede utilizar cualquiera de las bases de datos SQL soportadas por [Sequelize](http://docs.sequelizejs.com/). En este caso usaremos una base de datos **sqlite** para los entornos de *testing* y *development*, y una **PostgreSQL** para *production*.

Existirán dos tablas:

- una llamada 'census', que almacena la lista de localizadores y si han votado ya o no, para así evitar la duplicidad,
- y otra llamada 'votes', que no será más que una lista de votos, no asociados de ningún modo con los votantes.

De este modo conseguimos recabar la misma información que en unas elecciones normales, es decir, el porcentaje de participación y la cantidad de votos que recibe cada opción. Además, sabemos quién ha votado, pero no qué, por lo que podemos garantizar el anonimato del voto.

## Variables de entorno

Se recomienda generar un archivo `.env` en la raíz del proyecto con las variables de entorno.

```bash
DATABASE_URL=postgres://user:password@host:port/database
PORT=3000
```

## Cargar datos

Crear un archivo en la raíz del proyecto llamado, por ejemplo, `dataset.txt`. Hay que introducir en este archivo el censo electoral, que será la lista de localizadores, uno en cada línea. Con esta lista se alimentará la tabla 'census' al ejecutar el script de carga.

```bash
$ yarn load:dev dataset.txt # Carga los datos en un sqlite local, cuyo fichero se generará en la carpeta `database`
$ yarn load dataset.txt # Carga los datos en el PostgreSQL cuya URL se define con la variable de entorno DATABASE_URL
```

## Ejecutar la aplicación

Instalamos los `node_modules`.

```bash
$ yarn install
```

Ejecutamos y accedemos a través del navegador web en el puerto definido por la variable de entorno PORT (por defecto 3000).

```bash
$ yarn start:dev # Usando sqlite
$ yarn start # usando PostgreSQL
```

## Testing

Para testear la aplicación se generará una base de datos local **sqlite** en la carpeta `database`. Los tests escritos hasta ahora son de integración.

```bash
$ yarn test
```
