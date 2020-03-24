import { Component, OnInit } from '@angular/core';
import { AparcamientoDto } from '../models/aparcamiento.dto';
import { ZonaResponse } from '../models/zona-response.interface';
import { AparcamientosService } from '../services/aparcamiento.service';
import { PeticionesService } from '../services/peticiones.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-upload-aparcamiento',
  templateUrl: './upload-aparcamiento.component.html',
  styleUrls: ['./upload-aparcamiento.component.css']
})
export class UploadAparcamientoComponent implements OnInit {

  aparcamiento: AparcamientoDto;
  listaZona: ZonaResponse[];
  

  constructor(private aparcamientoService: AparcamientosService, private peticionesService: PeticionesService, private dialogRef: MatDialogRef<UploadAparcamientoComponent>) {
    this.aparcamiento = new AparcamientoDto('','','','', null , '', '', '');
  }



  ngOnInit() {
    this.loadZonas();
  }

  doUploadAparcamiento() {
    this.aparcamientoService.uploadAparcamiento(this.aparcamiento.avatar, this.aparcamiento.dimension, this.aparcamiento.puntuacion, 
      this.aparcamiento.longitud, this.aparcamiento.latitud,this.aparcamiento.nombre, this.aparcamiento.userId,this.aparcamiento.zonaId).subscribe(resp => {
      alert("Aparcamiento Subido")
      this.dialogRef.close(true);
    });
  }

  loadZonas() {
    this.peticionesService.loadZona().subscribe(resp => {
      this.listaZona = resp;
      console.log(this.listaZona);
    });
  }

  ficheroSeleccionado(fileInput: any) {
    this.aparcamiento.avatar = <File>fileInput.target.files[0];
  }

  close(){
    this.dialogRef.close(null);
  }

}
