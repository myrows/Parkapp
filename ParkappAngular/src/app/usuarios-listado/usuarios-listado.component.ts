import { Component, OnInit } from '@angular/core';
import { UsuarioResponse } from '../models/usuario-response.interface';
import { UsuariosService } from '../services/usuarios.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { BorrarUsuarioDialogComponent } from '../borrar-usuario-dialog/borrar-usuario-dialog.component';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuarios-listado',
  templateUrl: './usuarios-listado.component.html',
  styleUrls: ['./usuarios-listado.component.css']
})
export class UsuariosListadoComponent implements OnInit {

  usuarios:UsuarioResponse[];
  displayedColumns: string[] = ['fullname', 'idusuario', 'email', 'acciones']
  
  constructor(private usuariosService: UsuariosService, public dialog: MatDialog, private snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios(){
    this.usuariosService.getUsuarios().subscribe(resp => {
      this.usuarios = resp;
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

}
