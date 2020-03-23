import { Component, OnInit, Inject } from '@angular/core';
import { AnyoEscolar } from '../models/anyoEscolar-response.interface';
import { AnyosEscolaresService } from '../services/anyos-escolares.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AnyoEscolarDto } from '../dto/anyoEscolarDto.interface';

export interface DatosEntradaDialog {
  anyoEscolar: AnyoEscolar;
}

@Component({
  selector: 'app-editar-anyo-escolar-dialog',
  templateUrl: './editar-anyo-escolar-dialog.component.html',
  styleUrls: ['./editar-anyo-escolar-dialog.component.css']
})
export class EditarAnyoEscolarDialogComponent implements OnInit {

  anyoEscolar: AnyoEscolar;
  anyoEscolarDto : AnyoEscolarDto;
  id : number;

  constructor(
    public dialogRef: MatDialogRef<EditarAnyoEscolarDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DatosEntradaDialog,
    private anyosService: AnyosEscolaresService
  ) { 
    this.anyoEscolarDto = new AnyoEscolarDto(this.data.anyoEscolar.nombreAnyoEscolar)
  }

  ngOnInit() {
    this.anyoEscolar = this.data.anyoEscolar;
  }

  confirmarEditado() {
    this.id = this.anyoEscolar.id;
    this.anyosService.editCursoAcademico(this.id.toString(), this.anyoEscolarDto).subscribe(resp => {
    });
    this.dialogRef.close();
    location.reload();
  }

  cerrarDialog() {
    this.dialogRef.close();
    location.reload();
  }
}
