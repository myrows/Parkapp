import { logging } from 'protractor';

export class ZonaDto {

    constructor(public nombre: string, public ubicacion: string, public longitud: string, public latitud: string, public avatar: File, public distancia: string) {

    }
}