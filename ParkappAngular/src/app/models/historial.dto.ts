export class HistorialDto{
    constructor(public idHistorial:string,
        public fechaEntrada:string,
        public fechaSalida:string,
        public dia:string,
        public aparcamientoId:string){

    }

    transformarDto(){
        return {
            idHistorial: this.idHistorial,
            fechaEntrada: this.fechaEntrada,
            fechaSalida: this.fechaSalida,
            dia: this.dia,
            aparcamientoId: this.aparcamientoId
        }
    }

}