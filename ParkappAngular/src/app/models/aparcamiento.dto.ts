export class AparcamientoDto{
    constructor(public puntuacion:number,
        public dimension: String,
        public longitud: number,
        public avatar: File,
        public latitud: number,
        public nombre: string,
        public userId: string,
        public zonaId: string){

    }
}