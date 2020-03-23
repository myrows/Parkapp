import { HistorialResponse } from './historial-response.interface';

export class AparcamientoDto{
    constructor(public puntuacion:Number,
        public historial: HistorialResponse[],
        public _id: string,
        public dimension: string,
        public longitud: number,
        public latitud: number,
        public avatar: string,
        public nombre:string,
        public userId:string,
        public zonaId:string){

    }

    transformarDto(){
        return {
            puntuacion: this.puntuacion,
            historial: this.historial,
            _id: this._id,
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