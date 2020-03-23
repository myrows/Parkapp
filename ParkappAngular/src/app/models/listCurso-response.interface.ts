import { UnidadResponse } from './unidad-response.interface';

export interface CursoListResponse {
    id: number;
    nombre: string;
    peso: number;
    idEtapa: number;
}

/*export interface CursoListResponse {
    id: number;
    nombre: string;
    peso: number;
    unidades: UnidadResponse[];
}*/