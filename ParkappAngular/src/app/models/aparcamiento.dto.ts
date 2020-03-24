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
}