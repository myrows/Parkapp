import { Component, OnInit } from '@angular/core';
import { PeticionesService } from '../services/peticiones.service';
import { MatDialog } from '@angular/material/dialog';
import { BorrarUsuarioDialogComponent } from '../borrar-usuario-dialog/borrar-usuario-dialog.component';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { UsuarioResponse } from '../models/usuario.response';

@Component({
  selector: 'app-listado-usuarios-sa',
  templateUrl: './listado-usuarios-sa.component.html',
  styleUrls: ['./listado-usuarios-sa.component.css']
})
export class ListadoUsuariosSaComponent implements OnInit {
  listaUsuarios: UsuarioResponse[];
  columnsToDisplay: string [] = ['id', 'email', 'roles', 'colegio', 'editar', 'borrar'];
  constructor(
    public dialog: MatDialog,
    private peticionesService: PeticionesService
    ) { }

  ngOnInit() {
  }

  openDeleteDialog(usuarioResponse: UsuarioResponse) {
    this.dialog.open(BorrarUsuarioDialogComponent, {
     data: { usuarioResponse: usuarioResponse }
   });
 }

}