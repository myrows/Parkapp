export class UserDto{
    constructor(public nombre: string, public email: string, public uid: string, public photo: string, public rol: string){

    }

    transformarDto(){
        return {
            nombre: this.nombre,
            email: this.email,
            uid: this.uid,
            photo: this.photo,
            rol: this.rol
        }
    }

}