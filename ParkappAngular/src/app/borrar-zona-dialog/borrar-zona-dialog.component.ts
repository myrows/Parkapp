import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ZonaResponse } from '../models/zona-response.interface';
import { PeticionesService } from '../services/peticiones.service';

export interface DatosEntradaDialog {
  zonaResponse: ZonaResponse;
}

@Component({
  selector: 'app-borrar-zona-dialog',
  templateUrl: './borrar-zona-dialog.component.html',
  styleUrls: ['./borrar-zona-dialog.component.css']
})
export class BorrarZonaDialogComponent implements OnInit {
  zonaResponse : ZonaResponse;

  constructor(public dialogRef : MatDialogRef<BorrarZonaDialogComponent>, @Inject(MAT_DIALOG_DATA) public data : DatosEntradaDialog,
   private peticionesService : PeticionesService) { }

  ngOnInit() {
    this.zonaResponse = this.data.zonaResponse;
  }

  confirmarBorrado() {
    this.peticionesService.deleteZona(this.zonaResponse._id).subscribe(resp => {
    });
    this.dialogRef.close();
    location.reload();
  }

  cerrarDialog() {
    this.dialogRef.close();
  }

}
