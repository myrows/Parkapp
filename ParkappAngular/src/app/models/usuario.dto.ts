export class UsuarioDto{
    constructor( public avatar: File,
        public fullname: string,
        public username: string,
        public email: string,
        public password: string,
        public created_date: string,
        public rol: string){

    }
}