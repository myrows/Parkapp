import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminDto } from '../dto/admin.dto';
import { ColegioResponse } from '../models/colegio-response.interface';
import { PeticionesService } from '../services/peticiones.service';
import { UsuarioResponse } from '../models/usuario-response.interface';

export interface DatosEntradaDialog {
  usuario: UsuarioResponse;
}

@Component({
  selector: 'app-edit-usuario-dialog',
  templateUrl: './edit-usuario-dialog.component.html',
  styleUrls: ['./edit-usuario-dialog.component.css']
})

export class EditUsuarioDialogComponent implements OnInit {

  usuario: UsuarioResponse;
  usuarioDto: AdminDto;
  listaColegios: ColegioResponse[];
  listaRoles = ['USER', 'ADMIN'];
  id :number;

  constructor(
    private peticionesService: PeticionesService,
    public dialogRef: MatDialogRef<EditUsuarioDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DatosEntradaDialog,
    ) {
    this.usuarioDto = new AdminDto('', '', '', '')
    this.usuario = this.data.usuario;
    this.usuarioDto.email = this.usuario.email;
    this.usuarioDto.roles = this.usuario.roles;
    }

  ngOnInit() {
  this.listarColegio();
  }

  listarColegio(){
    this.peticionesService.loadColegio().subscribe(resp =>{
      this.listaColegios = resp;
    })
  }

  confirmarEditado() {
    this.id = this.usuario.id;
    this.peticionesService.editCursoAcademico(this.id.toString(), this.usuarioDto).subscribe(resp => {
    });
    this.dialogRef.close();
    location.reload();
  }

  cerrarDialog() {
    this.dialogRef.close();
    location.reload();
  }

}
