export class FotocopiaDto{
    constructor(public num_fotocopias: string, public curso: string, public profesor: string, 
        public estado: string, public fecha_creado: string, public fecha_realizado: string, public year: string){

    }

    transformarDto(){
        return {
            num_fotocopias: this.num_fotocopias,
            curso: this.curso,
            profesor: this.profesor,
            estado: this.estado,
            fecha_creado: this.fecha_creado,
            fecha_realizado: this.fecha_realizado,
            year: this.year
        }
    }
}