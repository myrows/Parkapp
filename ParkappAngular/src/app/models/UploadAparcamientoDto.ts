import { HistorialResponse } from './historial-response.interface';

export class UploadAparcamientoDto{
    constructor(public puntuacion:Number,
        public historial: HistorialResponse[],
        public _id: string,
        public dimension: string,
        public longitud: number,
        public latitud: number,
        public avatar: File,
        public nombre:string,
        public userId:string,
        public zonaId:string){
        }
}
