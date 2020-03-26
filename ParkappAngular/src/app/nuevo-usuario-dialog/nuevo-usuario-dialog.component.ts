import { Component, OnInit } from '@angular/core';
import { UsuarioDto } from '../models/usuario.dto';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuariosService } from '../services/usuarios.service';

interface Roles {
  value: string;
  viewValue: string;
}

const httpOptionsAdmin = {
  headers: new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  })
};
@Component({
  selector: 'app-nuevo-usuario-dialog',
  templateUrl: './nuevo-usuario-dialog.component.html',
  styleUrls: ['./nuevo-usuario-dialog.component.css']
})
export class NuevoUsuarioDialogComponent implements OnInit {

  usuarioDto: UsuarioDto;
  roles: Roles[] = [
    {value: 'ADMIN', viewValue: 'ADMIN'},
    {value: 'USER', viewValue: 'USER'},
  ];
  images;


  constructor(private usuarioService: UsuariosService,
     private dialogRef: MatDialogRef<NuevoUsuarioDialogComponent>, private http: HttpClient, public snackBar:MatSnackBar) { }

  ngOnInit() {
    this.usuarioDto = new UsuarioDto(undefined,'','','','','');
  }

  
  close(){
    this.dialogRef.close(null);
  }

  createAparcamiento() {
    this.usuarioService.nuevoUsuario(this.usuarioDto).subscribe(resp => {
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
    formData.append('fullname', this.usuarioDto.fullname);
    formData.append('username', this.usuarioDto.username);
    formData.append('email', this.usuarioDto.email);
    formData.append('password', this.usuarioDto.password);
    formData.append('rol', this.usuarioDto.rol);

    this.http.post<any>('https://parkappsalesianos.herokuapp.com/parkapp/angular/register/', formData, httpOptionsAdmin).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
    this.dialogRef.close(true);
  }

}
