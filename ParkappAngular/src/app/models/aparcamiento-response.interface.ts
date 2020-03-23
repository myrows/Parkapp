import { HistorialResponse } from './historial-response.interface';


export interface AparcamientoResponse{

    puntuacion:Number;
    historial: HistorialResponse[];
    _id: string;
    dimension: string;
    longitud: number;
    latitud: number;
    avatar: string;
    nombre:string;
    userId:string;
    zonaId:string;
}