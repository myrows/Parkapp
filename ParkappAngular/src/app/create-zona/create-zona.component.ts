import { Component, OnInit } from '@angular/core';
import { PeticionesService } from '../services/peticiones.service';
import { MatDialogRef } from '@angular/material';
import { ZonaDto } from '../dto/zona.dto';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptionsAdmin = {
  headers: new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  })
};

@Component({
  selector: 'app-create-zona',
  templateUrl: './create-zona.component.html',
  styleUrls: ['./create-zona.component.css']
})

export class CreateZonaComponent implements OnInit {

  zonaDto: ZonaDto;
  images;


  constructor(private http: HttpClient, private peticionesService: PeticionesService,
              public dialogRef: MatDialogRef<CreateZonaComponent>) { }

  ngOnInit() {
    this.zonaDto = new ZonaDto('', '', '', '', undefined, '');
  }

  createZona() {
    this.peticionesService.createZona(this.zonaDto).subscribe(resp => {
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
    formData.append('nombre', this.zonaDto.nombre);
    formData.append('ubicacion', this.zonaDto.ubicacion);
    formData.append('longitud', this.zonaDto.longitud);
    formData.append('latitud', this.zonaDto.latitud);
    formData.append('avatar', this.images);
    formData.append('distancia', this.zonaDto.distancia);

    this.http.post<any>('https://parkappsalesianos.herokuapp.com/parkapp/angular/zona/', formData, httpOptionsAdmin).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
    this.dialogRef.close(true);
  }

  close() {
    this.dialogRef.close(null);
  }

}
