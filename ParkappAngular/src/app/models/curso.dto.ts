export class CursoDto{
    constructor(public nombre: string){

    }

    transformarDto(){

        return {
            nombre: this.nombre
        }
    }
}