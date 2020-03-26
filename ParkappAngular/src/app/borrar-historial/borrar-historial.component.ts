import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HistorialResponse } from '../models/historial-response.interface';
import { PeticionesService } from '../services/peticiones.service';

export interface DatosEntradaDialog {
  historialResponse: HistorialResponse;
}

@Component({
  selector: 'app-borrar-historial',
  templateUrl: './borrar-historial.component.html',
  styleUrls: ['./borrar-historial.component.css']
})
export class BorrarHistorialComponent implements OnInit {

  historialResponse: HistorialResponse;

  constructor(public dialogRef: MatDialogRef<BorrarHistorialComponent>, @Inject(MAT_DIALOG_DATA) public data: DatosEntradaDialog,
              private peticionesService: PeticionesService) { }

  ngOnInit() {
    this.historialResponse = this.data.historialResponse;
  }

  confirmarBorrado() {
    this.peticionesService.deleteHistorial(this.historialResponse._id).subscribe(resp => {
    });
    this.dialogRef.close();
    location.reload();
  }

  cerrarDialog() {
    this.dialogRef.close();
  }

}
