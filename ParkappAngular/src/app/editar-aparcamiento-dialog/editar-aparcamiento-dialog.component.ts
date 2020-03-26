import { Component, OnInit, Inject } from '@angular/core';
import { AparcamientoResponse } from '../models/aparcamiento-response.interface';
import { AparcamientosService } from '../services/aparcamiento.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { AparcamientoDto } from '../models/aparcamiento.dto';
import { HttpClient } from '@angular/common/http';
import { ZonaResponse } from '../models/zona-response.interface';
import { PeticionesService } from '../services/peticiones.service';

export interface DatosEntradaDialog {
  aparcamientoResponse: AparcamientoResponse;
}
@Component({
  selector: 'app-editar-aparcamiento-dialog',
  templateUrl: './editar-aparcamiento-dialog.component.html',
  styleUrls: ['./editar-aparcamiento-dialog.component.css']
})
export class EditarAparcamientoDialogComponent implements OnInit {

  aparcamientoResponse :AparcamientoResponse;
  aparcamientoDto: AparcamientoDto;
  listaZona: ZonaResponse[];
  images;
  id:string;

  constructor(public dialogRef: MatDialogRef<EditarAparcamientoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DatosEntradaDialog,
    private aparcamientosService: AparcamientosService,
    private http: HttpClient, public snackBar:MatSnackBar,
    private peticionesSevice:PeticionesService) {

     }

  ngOnInit() {
    this.loadZonas();
    this.aparcamientoDto = new AparcamientoDto('', '', '', undefined,'', '','','');
    this.aparcamientoResponse = this.data.aparcamientoResponse;
    this.aparcamientoDto.puntuacion = this.aparcamientoResponse.puntuacion
    this.aparcamientoDto.dimension = this.aparcamientoResponse.dimension;
    this.aparcamientoDto.longitud = this.aparcamientoResponse.longitud
    this.aparcamientoDto.latitud = this.aparcamientoResponse.latitud
    this.aparcamientoDto.nombre = this.aparcamientoResponse.nombre;
    this.aparcamientoDto.userId = this.aparcamientoResponse.userId;
    this.aparcamientoDto.zonaId= this.aparcamientoResponse.zonaId;
    
  }

  cerrarDialog() {
    this.dialogRef.close();
  }

  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
    }
  }

  editarAparcamiento() {
    this.aparcamientosService.editarAparcamiento(this.aparcamientoResponse._id,this.aparcamientoDto).subscribe(resp => {
      this.dialogRef.close(true);
    });
  }
  loadZonas() {
    this.peticionesSevice.loadZona().subscribe(resp => {
      this.listaZona = resp;
      console.log(this.listaZona);
    });
  }

  onSubmit() {
    this.id = this.aparcamientoResponse._id;
    const formData = new FormData();
    formData.append('avatar', this.images);
    formData.append('puntuacion', this.aparcamientoDto.puntuacion);
    formData.append('longitud', this.aparcamientoDto.longitud);
    formData.append('latitud', this.aparcamientoDto.latitud);
    formData.append('userId', this.aparcamientoDto.userId);
    formData.append('zonaId', this.aparcamientoDto.zonaId);
    formData.append('nombre', this.aparcamientoDto.nombre);

    this.http.put<any>('https://parkappsalesianos.herokuapp.com/parkapp/aparcamiento/photo/'+this.id, formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
    this.dialogRef.close(true);
  }

}
