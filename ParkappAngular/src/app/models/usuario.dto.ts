export class UsuarioDto{
    constructor( public _id: string,
        public fullname: string,
        public username: string,
        public email: string,
        public password: string,
        public created_date: string){

    }

    transformarDto(){
        return {
            fullname: this.fullname,
            username: this.username,
            _id: this._id,
            email: this.email,
            password: this.password,
            created_date: this.created_date
        }
    }
}