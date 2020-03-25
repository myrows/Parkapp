export class AparcamientoDto{
    constructor(public puntuacion:string,
        public dimension: String,
        public longitud: string,
        public avatar: File,
        public latitud: string,
        public nombre: string,
        public userId: string,
        public zonaId: string){

    }
}