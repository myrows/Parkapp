import { Authority } from './authority.interface';
import { ColegioResponse } from './colegio-response.interface';

export interface UsuarioResponse {
    _id: string;
    fullname: string;
    username: string;
    email: string;
    password: string;
    created_date: string;

}