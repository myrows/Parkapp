# ¿Qué es Parkapp? :red_car:
ParkApp es una aplicación que gestiona los aparcamientos disponibles, disponible tanto en versión móvil como en versión web.

# ¿Cómo se estructura Parkapp? :question:
ParkApp es una aplicación que consta de tres partes:

-Una aplicación web, desarrollada en Angular. en la cual, el administrador de la aplicación puede realizar funciones relaciones con la gestión de los usuarios de la aplicación(consulta de los datos de los usuarios, eliminación de usuarios, edición de los mismos o el registro de uno), además, podrá gestionar los aparcamientos que se encuentran disponibles(añadiendo un aparcamiento, consultando un listado de aparcamientos, pudiendo así editar o eliminar los aparcamientos que considere oportunos, además de una vista detalle del aparcamiento que desee consultar).

-Una aplicación Android, en la cual un usuario de la aplicación, después de haber sido registrado(por su cuenta o mediante un administrador) o bien haya iniciado sesión con su cuenta ya creada podrá ver un listado de aparcamientos seleccionando un filtrado por aparcamientos ocupados o no, además, podrá ver un mapa en el cual se le muestran los aparcamientos libres que existen y haciendo click en ellos podrá ver un detalle del mismo, mostrando su ubicación exacta, además se le proporcionará al usuario información acerca de cuándo suele estar ese aparcamiento disponible, por otra parte, cuando el usuario aparque su vehículo en un aparcamiento disponible, podrá cambiar el estado del mismo a ocupado.

-Un API, desarrollada en NodeJs y con el apoyo de las tecnologías Mongoose y el respaldo en base de datos de MongoDB, de esta API consumen los recursos sendas aplicaciones, tanto la aplicación Web Angular como la aplicación Android.


# Tecnologias :wrench:

Tecnologías usadas : Node.js, Express.js, Mongoose, Passport, Firebase, Android, Angular

# Desarrolladores :beginner:

Developers : {Mejías Dorado, Ricardo}, {Troncoso Rubio, Daniel}


