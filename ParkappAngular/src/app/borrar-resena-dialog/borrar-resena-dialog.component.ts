import { Component, OnInit, Inject } from '@angular/core';
import { ResenaResponse } from '../models/resena-response.interface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PeticionesService } from '../services/peticiones.service';

export interface DatosEntradaDialog {
  resenaResponse: ResenaResponse;
}

@Component({
  selector: 'app-borrar-resena-dialog',
  templateUrl: './borrar-resena-dialog.component.html',
  styleUrls: ['./borrar-resena-dialog.component.css']
})
export class BorrarResenaDialogComponent implements OnInit {
  resenaResponse: ResenaResponse;

  constructor(public dialogRef : MatDialogRef<BorrarResenaDialogComponent>, @Inject(MAT_DIALOG_DATA) public data : DatosEntradaDialog,
  private peticionesService : PeticionesService) { }

  ngOnInit() {
    this.resenaResponse = this.data.resenaResponse;
  }

  confirmarBorrado() {
    this.peticionesService.deleteResena(this.resenaResponse._id).subscribe(resp => {
    });
    this.dialogRef.close();
    location.reload();
  }

  cerrarDialog() {
    this.dialogRef.close();
  }

}
