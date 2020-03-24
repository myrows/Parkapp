import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  listaColegios: ColegioResponse[];
  listaRoles = ['USER', 'ADMIN'];
  id :number;

  constructor(
    private peticionesService: PeticionesService,
    public dialogRef: MatDialogRef<EditUsuarioDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DatosEntradaDialog,
    ){}

  ngOnInit() {
  }

  cerrarDialog() {
    this.dialogRef.close();
    location.reload();
  }

}
