import { HistorialResponse } from './historial-response.interface';

export class AparcamientoDto{
    constructor(public puntuacion:Number,
        public dimension: String,
        public longitud: Number,
        public latitud: Number,
        public avatar: File,
        public nombre: String,
        public userId: String,
        public zonaId: String){

    }
}