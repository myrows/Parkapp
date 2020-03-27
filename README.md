# ¿Qué es Parkapp? :red_car:
ParkApp es una aplicación que gestiona los aparcamientos disponibles, disponible tanto en versión móvil como en versión web.

# ¿Cómo se estructura Parkapp? :question:
ParkApp es una aplicación que gestiona los aparcamientos disponibles, disponible tanto en versión móvil como en versión web.ParkApp es una aplicación que consta de tres partes:

1-Una aplicación web, desarrollada en Angular. en la cual, el administrador de la aplicación puede realizar funciones para con la gestión de los usuarios de la aplicación(consulta de los datos de los usuarios, eliminación de usuarios, edición de los mismos o el registro de uno), además, podrá gestionar los aparcamientos que se encuentran disponibles(añadiendo un aparcamiento, consultando un listado de aparcamientos, pudiendo así editar o eliminar los aparcamientos que considere oportunos. 

Además de todo esto podrá hacer la misma gestión sobre los historiales de los aparcamientos, sobre las reseñas de las zonas y sobre las zonas en si mismas.

2-Una aplicación Android, en la cual un usuario de la aplicación, después de haber sido registrado(por su cuenta o mediante un administrador) o bien haya iniciado sesión con su cuenta ya creada podrá ver un listado de aparcamientos seleccionando un filtrado por aparcamientos más valorados o accediendo a los aparcamientos de una zona en concreto, además, podrá ver un mapa en el cual se le muestran los aparcamientos libres que existen y haciendo click en ellos podrá dirigirse a ellos, mostrando su ubicación exacta, además se le proporcionará al usuario información acerca de cuándo suele estar ese aparcamiento disponible, por otra parte, cuando el usuario aparque su vehículo en un aparcamiento disponible, podrá cambiar el estado del mismo a ocupado. Todos los aparcamientos están regidos por zonas y cada aparcamiento pertenece a una, una zona además delimita hasta donde se deben de mostrar los aparcamientos de esa zona en concreto. 

Por otra parte, cada zona tiene reseñas en las cual se ven las opiniones de los usuarios sobre esa zona, cada aparcamiento posee un historial de entradas y salidas de ese aparcamiento en concreto a partir del cual se elaboran estadísticas acerca de la zona en la que se encuentran esos aparcamientos, las zonas se pueden consultar detalladamente o mediante un listado tal y como se haría con los aparcamientos.

3-Un API, desarrollada en NodeJs y con el apoyo de las tecnologías Mongoose y el respaldo en base de datos de MongoDB, de esta API consumen los recursos sendas aplicaciones, tanto la aplicación Web Angular como la aplicación Android.


# ¿Cómo iniciar la aplicación? :computer: :iphone:
Para iniciar la aplicación Android necesitara un dispositivo movil el cual este conectado al pc y ejecutar la aplicacion mmediante la plataforma de 
Android Studio, aunque, para una conexion mas adecuada y una mejor experiencia recomendamos el uso del dispositivo virtual que puede usar u obtener
dentro de Android Studio debido a que bajo las condiciones del Covid-19 la conexion a Internet puede ser mas limitada, una vez en Android Studio inicie la aplicacion mediante el boton Play que se encuentra en la barra superior.

Usuario de prueba Android-> nombre: user, pass: 12345678

Para iniciar la aplicacion web le recomendamos que abra visual studio code y desde el terminal escriba lo siguiente:



1-Npm install

2-Ng serve

Usuariod de prueba Angular-> nombre:user, pass: 12345678

Por último la aplicación estara corriendo en el puerto 4200 de su ordenador y ya podra hacer uso y disfrute de ella.


# Tecnologias :wrench:

Tecnologías usadas : Node.js, Express.js, Mongoose, Passport, Firebase, Android, Angular
APIs externas usadas: Maps SDK for Android, Places API, Directions API, Road API

# Desarrolladores :beginner:

Developers : {Mejías Dorado, Ricardo}, {Troncoso Rubio, Daniel}


