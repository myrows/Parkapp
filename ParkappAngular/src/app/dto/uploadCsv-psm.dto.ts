export class UploadCsvDto {
    constructor(public file: File, 
        public idAnyoEscolar: string, 
        public idColegio: string, 
        public evaluacion: string, 
        public idPuntoControl: string) {

    }
}