import { Component, OnInit, Inject } from '@angular/core';
import { UsuarioDto } from '../models/usuario.dto';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { PeticionesService } from '../services/peticiones.service';
import { UsuariosService } from '../services/usuarios.service';
import { UsuarioResponse } from '../models/usuario.response';

interface Roles {
  value: string;
  viewValue: string;
}
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
  roles: Roles[] = [
    {value: 'ADMIN', viewValue: 'ADMIN'},
    {value: 'USER', viewValue: 'USER'},
  ];

  constructor(public dialogRef: MatDialogRef<EditarUsuarioDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DatosEntradaDialog,
    private http: HttpClient, public snackBar:MatSnackBar,
    private usuarioService:UsuariosService) {

     }

  ngOnInit() {
    this.usuarioResponse = this.data.usuarioResponse;
    this.usuarioDto = new UsuarioDto(undefined,this.usuarioResponse.fullname,this.usuarioResponse.username,this.usuarioResponse.email,this.usuarioResponse.password,this.usuarioResponse.created_date.toString(),this.usuarioResponse.rol);
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
    this.usuarioService.editarUsuario(this.usuarioResponse._id,this.usuarioDto).subscribe(resp => {
      this.dialogRef.close(true);
    });
  }
  close(){
    this.dialogRef.close(null);
  }
  onSubmit() {
    const formData = new FormData();
    formData.append('avatar', this.images);
    formData.append('fullname', this.usuarioDto.fullname);
    formData.append('username', this.usuarioDto.username);
    formData.append('email', this.usuarioDto.email);
    formData.append('password', this.usuarioDto.password);
    formData.append('created_date', this.usuarioDto.created_date);

    this.http.put<any>('https://parkappsalesianos.herokuapp.com/parkapp/user/', formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
    this.dialogRef.close(true);
  }

}
