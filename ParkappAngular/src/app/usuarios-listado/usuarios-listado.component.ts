import { Component, OnInit, ViewChild } from '@angular/core';

import { UsuariosService } from '../services/usuarios.service';
import { MatDialog, MatSnackBar, MatTableDataSource, MatPaginator } from '@angular/material';
import { BorrarUsuarioDialogComponent } from '../borrar-usuario-dialog/borrar-usuario-dialog.component';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NuevoUsuarioDialogComponent } from '../nuevo-usuario-dialog/nuevo-usuario-dialog.component';
import { EditarUsuarioDialogComponent } from '../editar-usuario-dialog/editar-usuario-dialog.component';
import { UsuarioResponse } from '../models/usuario.response';

@Component({
  selector: 'app-usuarios-listado',
  templateUrl: './usuarios-listado.component.html',
  styleUrls: ['./usuarios-listado.component.css']
})
export class UsuariosListadoComponent implements OnInit {

  usuarios:UsuarioResponse[];
  displayedColumns: string[] = ['fullname', 'idusuario', 'email', 'borrar','editar']
  dataSource = null;
  constructor(private usuariosService: UsuariosService, public dialog: MatDialog, private snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router
    ) { }
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios(){
    this.usuariosService.getUsuarios().subscribe(resp => {
      this.usuarios = resp;
      
      this.dataSource = new MatTableDataSource<UsuarioResponse>(this.usuarios);
      this.dataSource.data = resp;
      this.dataSource.paginator = this.paginator;
    });

  }
  openDeleteDialog(usuarioResponse: UsuarioResponse) {
    this.dialog.open(BorrarUsuarioDialogComponent, {
     data: { usuarioResponse: usuarioResponse }
   });
 }

 logout() {
  this.authService.clearToken();
  this.router.navigate(['/login']);
  this.snackBar.open('Has cerrado sesión');
}

dialogCrearUsuario(){
  var dialogReference = this.dialog.open(NuevoUsuarioDialogComponent, {width: '300px'});

  dialogReference.afterClosed().subscribe(resp => {
    if(resp != null){
      if(resp){
      this.snackBar.open("Usuario creado con éxito ✔️");
      }else{
        this.snackBar.open("Error al crear el usuario ❌");
      }
    }
  })
}

dialogEditarUsuario(usuarioResponse: UsuarioResponse){
  var dialogReference = this.dialog.open(EditarUsuarioDialogComponent, {width: '300px',data: { usuarioResponse: usuarioResponse}});

  dialogReference.afterClosed().subscribe(resp => {
    if(resp != null){
      if(resp){
      this.snackBar.open("Usuario editado con éxito ✔️");
      }else{
        this.snackBar.open("Error al editar el usuario ❌");
      }
    }
  })
}

}
