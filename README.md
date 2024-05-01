respecto a la prueba y sus dificultades:

segun lo conversado se creo una app pequena para la conexion de AUTH0, luego de ingresar a la pagina de auth0 confirmar una cuenta y configurar los detalles de desarrollo, se procedio a descargar la app que te permiten en la pagina como ejemplo. a partir de esta aplicacion se modifico y se creo una nueva ruta, de ingreso (starwar) ruta que se modifico para realizar una consulta a una app externa gratuita mediante axios, estas rutas pueden ser modificadas para la realizacion de las acciones que se realizaran van desde el renderizado de una pagina, el envio un archivo sendFile, un json, o un query en la base de datos pueden ser post, get, put, delete...

posteriormente se configuro typescript con express, para ello se creo y modifico el archivo tsconfig y package.json aunque posteriormente se utilizaron los tipos de express, para demostrar la posibilidad en el uso de tipescript se creo una interface ErrorWithStatus que se encuentra en src/shared/model el cual es llamado en una ruta especifica, ademas de eso en el archivo types.d.ts se declaro el modulo dotenv que arrojaba error al hacerlo por npm (npm --save-dev @types/dotenv)

se modificaron los archivos header.ejs para la anexion del logo de la compania y se creo una nueva pagina vista startwar.ejs el cual muestra de manera sencilla el name obtenido por la consulta. 

por ultimo se configuro la cuenta github (contrasena shh) se realizaron 3 commit y se subio el repositorio como publico para su evaluacion

-- uso de aplicacion:

npm install
* opcional npm run build("tsc")
npm run start

-preguntas posibles:

* morgan es un logger que se encarga de enviar mensajes para cada solicitud http facilitando sus tipos debe ser configurada, hay varios tipos uno de estos es dev, sin embargo existen otros como common.

* el ejs es un formato ampliamente utilizado en express combina html con javascript <%%> todo lo que se encuentre entre esos simbolos significa que estamos introducion codigo javascript.

* http-errors nos permite modificar la definicion de error de manera sencilla, aunque podriamos haber obtado por un class ErrorWithStatus extends Error se prefirio esta forma por su facilidad.

* los detalles en server se encuentran brevemente comentados el proceso es basicamente el siguiente se definen las carpetas public, las vistas(con que trabajan) el modelo de respuesta(json) se carga el archivo .env, se configura el logger(morgan) se define las rutas principales(archivo aparte), se define el comportamiento en caso de error.

* dentro de las rutas se define si utlizaran el midleware, o no requeriran autentificacion.
