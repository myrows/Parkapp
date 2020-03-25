import { Component, OnInit, Inject } from '@angular/core';
import { UsuarioResponse } from '../models/usuario-response.interface';
import { UsuarioDto } from '../models/usuario.dto';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { PeticionesService } from '../services/peticiones.service';


export interface DatosEntradaDialog {
  usuarioResponse: UsuarioResponse;
}
@Component({
  selector: 'app-editar-usuario-dialog',
  templateUrl: './editar-usuario-dialog.component.html',
  styleUrls: ['./editar-usuario-dialog.component.css']
})
export class EditarUsuarioDialogComponent implements OnInit {

  usuarioResponse :UsuarioResponse;
  usuarioDto: UsuarioDto;
  images;

  constructor(public dialogRef: MatDialogRef<EditarUsuarioDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DatosEntradaDialog,
    private http: HttpClient, public snackBar:MatSnackBar,
    private peticionesSevice:PeticionesService) {

     }

  ngOnInit() {
    //this.loadZonas();
    this.usuarioResponse = this.data.usuarioResponse;
    this.usuarioDto = new UsuarioDto(undefined,this.usuarioResponse.fullname,this.usuarioResponse.username,this.usuarioResponse.email,this.usuarioResponse.password,this.usuarioResponse.created_date,'');
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

  /*editarAparcamiento() {
    this.peticionesSevice.(this.aparcamientoResponse._id,this.aparcamientoDto).subscribe(resp => {
      this.dialogRef.close(true);
    });
  }*/
  /*loadZonas() {
    this.peticionesSevice.loadZona().subscribe(resp => {
      this.listaZona = resp;
      console.log(this.listaZona);
    });
  }*/

  /*onSubmit() {
    const formData = new FormData();
    formData.append('avatar', this.images);
    formData.append('puntuacion', this.aparcamientoDto.puntuacion);
    formData.append('longitud', this.aparcamientoDto.longitud);
    formData.append('latitud', this.aparcamientoDto.latitud);
    formData.append('userId', this.aparcamientoDto.userId);
    formData.append('zonaId', this.aparcamientoDto.zonaId);
    formData.append('nombre', this.aparcamientoDto.nombre);

    this.http.put<any>('https://parkappsalesianos.herokuapp.com/parkapp/aparcamiento/', formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
    this.dialogRef.close(true);
  }*/

}
