import { Authority } from './authority.interface';
import { ColegioResponse } from './colegio-response.interface';

export interface UsuarioResponse {
    id: number;
    email: string;
    roles: string;
    colegio: string;
}