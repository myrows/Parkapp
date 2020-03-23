import { Padre } from './padre.interface';

export interface EtapaResponse {
    id: number;
    nombre: string;
    peso: number;
    padre: Padre;
}