import { EtapaResponse } from './etapa-response.interface';

export interface CursoResponse {
    id: number;
    nombre: string;
    peso: number;
    etapa: EtapaResponse;
    unidades?: any;
}