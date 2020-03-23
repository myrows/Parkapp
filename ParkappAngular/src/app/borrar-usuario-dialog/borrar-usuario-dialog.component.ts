import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuarioResponse } from '../models/usuario-response.interface';
import { PeticionesService } from '../services/peticiones.service';

export interface DatosEntradaDialog {
  usuarioResponse: UsuarioResponse;
}

@Component({
  selector: 'app-borrar-usuario-dialog',
  templateUrl: './borrar-usuario-dialog.component.html',
  styleUrls: ['./borrar-usuario-dialog.component.css']
})
export class BorrarUsuarioDialogComponent implements OnInit {
  usuarioResponse :UsuarioResponse;

  constructor(
    public dialogRef: MatDialogRef<BorrarUsuarioDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DatosEntradaDialog,
    private peticionesService: PeticionesService
  ) { }

  ngOnInit() {
    this.usuarioResponse = this.data.usuarioResponse;
  }

  confirmarBorrado() {
    this.peticionesService.deleteUsuario(this.usuarioResponse.id).subscribe(resp => {
    });
    this.dialogRef.close();
    location.reload();
  }

  cerrarDialog() {
    this.dialogRef.close();
  }

}
