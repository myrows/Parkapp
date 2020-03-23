import { Authority } from './authority.interface';

export interface CrearAdminResponse {
    id: number;
    email: string;
    roles: string[];
    colegio?: any;
    enabled: boolean;
    username: string;
    authorities: Authority[];
    credentialsNonExpired: boolean;
    accountNonExpired: boolean;
    accountNonLocked: boolean;
}