import { Component, OnInit } from '@angular/core';
import { PeticionesService } from '../services/peticiones.service';
import { UsuarioResponse } from '../models/usuario-response.interface';
import { MatDialog } from '@angular/material/dialog';
import { BorrarUsuarioDialogComponent } from '../borrar-usuario-dialog/borrar-usuario-dialog.component';
import { EditUsuarioDialogComponent } from '../edit-usuario-dialog/edit-usuario-dialog.component';

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
    this.listarUsuarios();
  }

  listarUsuarios(){
    this.peticionesService.loadAllUsuarios().subscribe(resp =>{
      this.listaUsuarios = resp;
    })
  }

  openDeleteDialog(usuarioResponse: UsuarioResponse) {
    this.dialog.open(BorrarUsuarioDialogComponent, {
     data: { usuarioResponse: usuarioResponse }
   });
 }

 openEditDialog(usuario: UsuarioResponse) {
  this.dialog.open(EditUsuarioDialogComponent, {
   data: { usuario: usuario }
 });
}

}
