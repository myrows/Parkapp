import { Component, OnInit } from '@angular/core';
import { AparcamientosService } from '../services/aparcamiento.service';
import { ZonaResponse } from '../models/zona-response.interface';
import { AparcamientoDto } from '../models/aparcamiento.dto';
import { PeticionesService } from '../services/peticiones.service';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-nuevo-aparcamiento-dialog',
  templateUrl: './nuevo-aparcamiento-dialog.component.html',
  styleUrls: ['./nuevo-aparcamiento-dialog.component.css']
})
export class NuevoAparcamientoDialogComponent implements OnInit {

  aparcamientoDto: AparcamientoDto;
  listaZona: ZonaResponse[];
  images;

  constructor(private aparcamientoService: AparcamientosService, private peticionesService: PeticionesService,
     private dialogRef: MatDialogRef<NuevoAparcamientoDialogComponent>, private http: HttpClient, public snackBar:MatSnackBar) { }

  ngOnInit() {
    this.aparcamientoDto = new AparcamientoDto('','','',undefined,'','','','');
    this.loadZonas();
  }

  loadZonas() {
    this.peticionesService.loadZona().subscribe(resp => {
      this.listaZona = resp;
      console.log(this.listaZona);
    });
  }

  close(){
    this.dialogRef.close(null);
  }

  createAparcamiento() {
    this.aparcamientoService.nuevoAparcamiento(this.aparcamientoDto).subscribe(resp => {
      this.dialogRef.close(true);
    });
  }

  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('avatar', this.images);
    formData.append('puntuacion', this.aparcamientoDto.puntuacion);
    formData.append('longitud', this.aparcamientoDto.longitud);
    formData.append('latitud', this.aparcamientoDto.latitud);
    formData.append('userId', this.aparcamientoDto.userId);
    formData.append('zonaId', this.aparcamientoDto.zonaId);
    formData.append('nombre', this.aparcamientoDto.nombre);

    this.http.post<any>('https://parkappsalesianos.herokuapp.com/parkapp/aparcamiento/', formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
    this.dialogRef.close(true);
  }
}
