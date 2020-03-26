import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PeticionesService } from '../services/peticiones.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ZonaDto } from '../dto/zona.dto';
import { ZonaResponse } from '../models/zona-response.interface';

export interface DatosEntradaDialog {
  zona: ZonaResponse;
}

const httpOptionsAdmin = {
  headers: new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  })
};

@Component({
  selector: 'app-update-zona',
  templateUrl: './update-zona.component.html',
  styleUrls: ['./update-zona.component.css']
})
export class UpdateZonaComponent implements OnInit {

  zonaRespone: ZonaResponse;
  zonaDto: ZonaDto;
  images;
  id: string;

  constructor(private http: HttpClient, private peticionesService: PeticionesService,
              public dialogRef: MatDialogRef<UpdateZonaComponent>, @Inject(MAT_DIALOG_DATA) public data: DatosEntradaDialog) { }

  ngOnInit() {
    this.zonaDto = new ZonaDto('', '', '', '', undefined, '');
    this.zonaRespone = this.data.zona;
    this.zonaDto.nombre = this.zonaRespone.nombre;
    this.zonaDto.ubicacion = this.zonaRespone.ubicacion;
    this.zonaDto.longitud = this.zonaRespone.longitud;
    this.zonaDto.latitud = this.zonaRespone.latitud;
    this.zonaDto.distancia = this.zonaRespone.distancia;
  }

  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
    }
  }

  onSubmit() {
    this.id = this.zonaRespone._id;
    const formData = new FormData();
    formData.append('nombre', this.zonaDto.nombre);
    formData.append('ubicacion', this.zonaDto.ubicacion);
    formData.append('longitud', this.zonaDto.longitud);
    formData.append('latitud', this.zonaDto.latitud);
    formData.append('avatar', this.images);
    formData.append('distancia', this.zonaDto.distancia);

    this.http.put<any>('https://parkappsalesianos.herokuapp.com/parkapp/angular/zona/' + this.id, formData, httpOptionsAdmin).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
    this.dialogRef.close(true);
  }

  close() {
    this.dialogRef.close(null);
  }

}
