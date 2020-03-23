import { logging } from 'protractor';

export class ZonaDto{

    constructor(public nombre: string, public ubicacion: string, public longitud: number, latitud: number, avatar: File, distancia: number){

    }
}