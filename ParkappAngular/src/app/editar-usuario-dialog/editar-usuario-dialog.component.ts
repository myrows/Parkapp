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
  id:string;

  constructor(public dialogRef: MatDialogRef<EditarUsuarioDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DatosEntradaDialog,
    private http: HttpClient, public snackBar:MatSnackBar,
    private usuarioService:UsuariosService) {

     }

  ngOnInit() {
    this.usuarioDto = new UsuarioDto(undefined, '', '', '','', '');
    this.usuarioResponse = this.data.usuarioResponse;
    this.usuarioDto.username = this.usuarioResponse.username
    this.usuarioDto.fullname = this.usuarioResponse.fullname;
    this.usuarioDto.email = this.usuarioResponse.email
    this.usuarioDto.password = this.usuarioResponse.password
    this.usuarioDto.rol = this.usuarioResponse.rol;
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
    this.id = this.usuarioResponse._id;
    const formData = new FormData();
    formData.append('avatar', this.images);
    formData.append('fullname', this.usuarioDto.fullname);
    formData.append('username', this.usuarioDto.username);
    formData.append('email', this.usuarioDto.email);
    formData.append('password', this.usuarioDto.password);
    formData.append('rol', this.usuarioDto.rol);

    this.http.put<any>('https://parkappsalesianos.herokuapp.com/parkapp/user/'+this.id, formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
    this.dialogRef.close(true);
  }

}
