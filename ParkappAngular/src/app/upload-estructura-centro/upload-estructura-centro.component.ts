import { Component, OnInit } from '@angular/core';
import { PeticionesService } from '../services/peticiones.service';
import { UploadCsvEstructuraCentroDto } from '../dto/uploadCsv-estrucuraCentro.dto';
import { ColegioComponent } from '../colegio/colegio.component';
import { ColegioResponse } from '../models/colegio-response.interface';
import { AnyoEscolar } from '../models/anyoEscolar-response.interface';
import { AnyosEscolaresService } from '../services/anyos-escolares.service';

@Component({
  selector: 'app-upload-estructura-centro',
  templateUrl: './upload-estructura-centro.component.html',
  styleUrls: ['./upload-estructura-centro.component.css']
})
export class UploadEstructuraCentroComponent implements OnInit {

  estructuraCentro : UploadCsvEstructuraCentroDto;
  listaColegios: ColegioResponse[];
  listaAnyos: AnyoEscolar[];
  constructor(private peticionesService: PeticionesService, private anyosService: AnyosEscolaresService) { 
    this.estructuraCentro = new UploadCsvEstructuraCentroDto(null, '', '');
  }

  ngOnInit() {
    this.listarColegio();
    this.listarAnyoEscolar();
  }

  listarColegio(){
    this.peticionesService.loadColegio().subscribe(resp =>{
      this.listaColegios = resp;
    })
  }

  listarAnyoEscolar(){
    this.anyosService.getLista().subscribe(resp =>{
      this.listaAnyos = resp;
    })
  }

  doUploadEstructuraCentro(){
    console.log(this.estructuraCentro.file)
    this.peticionesService.uploadCsvEstructuraCentro(this.estructuraCentro.file, this.estructuraCentro.idAnyoEscolar, this.estructuraCentro.idColegio).subscribe(resp =>{
      alert("Estructura de centro subida")
    });
  }

  ficheroSeleccionado(fileInput: any) {
    this.estructuraCentro.file = <File>fileInput.target.files[0];
  }

}
