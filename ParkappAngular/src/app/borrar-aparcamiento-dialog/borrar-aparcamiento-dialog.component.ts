import { Component, OnInit, Inject } from '@angular/core';
import { AparcamientoResponse } from '../models/aparcamiento-response.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AparcamientosService } from '../services/aparcamiento.service';

export interface DatosEntradaDialog {
  aparcamientoResponse: AparcamientoResponse;
}
@Component({
  selector: 'app-borrar-aparcamiento-dialog',
  templateUrl: './borrar-aparcamiento-dialog.component.html',
  styleUrls: ['./borrar-aparcamiento-dialog.component.css']
})
export class BorrarAparcamientoDialogComponent implements OnInit {
  aparcamientoResponse :AparcamientoResponse;

  constructor(
    public dialogRef: MatDialogRef<BorrarAparcamientoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DatosEntradaDialog,
    private aparcamientosService: AparcamientosService
  ) { }

  ngOnInit() {
    this.aparcamientoResponse = this.data.aparcamientoResponse;
  }

  confirmarBorrado() {
    this.aparcamientosService.deleteAparcamiento(this.aparcamientoResponse._id).subscribe(resp => {
    });
    this.dialogRef.close();
    location.reload();
  }

  cerrarDialog() {
    this.dialogRef.close();
  }

}
