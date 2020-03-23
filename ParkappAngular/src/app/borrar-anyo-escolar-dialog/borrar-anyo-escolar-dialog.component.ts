import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AnyoEscolar } from '../models/anyoEscolar-response.interface';
import { AnyosEscolaresService } from '../services/anyos-escolares.service';

export interface DatosEntradaDialog {
  anyoEscolar: AnyoEscolar;
}

@Component({
  selector: 'app-borrar-anyo-escolar-dialog',
  templateUrl: './borrar-anyo-escolar-dialog.component.html',
  styleUrls: ['./borrar-anyo-escolar-dialog.component.css']
})
export class BorrarAnyoEscolarDialogComponent implements OnInit {

  anyoEscolar: AnyoEscolar;

  constructor(
    public dialogRef: MatDialogRef<BorrarAnyoEscolarDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DatosEntradaDialog,
    private anyosService: AnyosEscolaresService
  ) { }

  ngOnInit() {
    this.anyoEscolar = this.data.anyoEscolar;
  }

  confirmarBorrado() {
    this.anyosService.deleteCursoAcademico(this.anyoEscolar.id).subscribe(resp => {
    });
    this.dialogRef.close();
    location.reload()
  }

  cerrarDialog() {
    this.dialogRef.close();
  }

}
