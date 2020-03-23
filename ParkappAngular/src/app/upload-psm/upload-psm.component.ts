import { Component, OnInit } from '@angular/core';
import { UploadCsvDto } from '../dto/uploadCsv-psm.dto';
import { PeticionesService } from '../services/peticiones.service';
import { AnyosEscolaresService } from '../services/anyos-escolares.service';
import { ColegioResponse } from '../models/colegio-response.interface';
import { AnyoEscolar } from '../models/anyoEscolar-response.interface';

@Component({
  selector: 'app-upload-psm',
  templateUrl: './upload-psm.component.html',
  styleUrls: ['./upload-psm.component.css']
})
export class UploadPsmComponent implements OnInit {

  psm: UploadCsvDto;
  listaColegios: ColegioResponse[]
  listaAnyos: AnyoEscolar[]

  constructor(private peticionesService: PeticionesService, private anyoService: AnyosEscolaresService) {
    this.psm = new UploadCsvDto(null, null, null, null, null);
  }



  ngOnInit() {
    this.getAnyosEscolar();
    this.getColegios();
  }

  doUploadPsm() {
    this.peticionesService.uploadCsvPsm(this.psm.file, this.psm.idAnyoEscolar, this.psm.idColegio, this.psm.evaluacion, this.psm.idPuntoControl).subscribe(resp => {
      alert("Psm Subido")
    });
  }
  getAnyosEscolar() {
    this.anyoService.getLista().subscribe(r =>{
      this.listaAnyos = r
    })
  }
  getColegios() {
    this.peticionesService.loadColegio().subscribe(r => {
      this.listaColegios = r
    })
  }
  getPuntosControl() {
    //
  }

  ficheroSeleccionado(fileInput: any) {
    this.psm.file = <File>fileInput.target.files[0];
  }

}
