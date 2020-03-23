import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AnyoEscolarDto } from '../dto/anyoEscolarDto.interface';


@Component({
  selector: 'app-crear-anyo-escolar-dialog',
  templateUrl: './crear-anyo-escolar-dialog.component.html',
  styleUrls: ['./crear-anyo-escolar-dialog.component.css']
})
export class CrearAnyoEscolarDialogComponent implements OnInit {

  anyoEscolar: AnyoEscolarDto;
  titulo: string;

  constructor(
    public dialogRef: MatDialogRef<CrearAnyoEscolarDialogComponent>
  ) { 
    this.anyoEscolar = new AnyoEscolarDto('')
  }

  ngOnInit() {
    this.titulo = 'Crear nuevo curso académico'
  }

  cerrarDialog() {
    this.dialogRef.close();
  }

}
