import { HistorialResponse } from './historial-response.interface';

export class AparcamientoDto{
    constructor(public puntuacion:string,
        public dimension: string,
        public longitud: string,
        public latitud: string,
        public avatar: File,
        public nombre:string,
        public userId:string,
        public zonaId:string){

    }

    transformarDto(){
        return {
            puntuacion: this.puntuacion,
            dimension: this.dimension,
            longitud: this.longitud,
            latitud: this.latitud,
            avatar: this.avatar,
            nombre: this.nombre,
            userId: this.userId,
            zonaId: this.zonaId
        }
    }
}