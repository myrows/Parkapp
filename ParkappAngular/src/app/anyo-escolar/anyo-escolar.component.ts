import { Component, OnInit } from '@angular/core';
import { AnyoEscolar } from '../models/anyoEscolar-response.interface';
import { MatDialog } from '@angular/material/dialog';
import { AnyosEscolaresService } from '../services/anyos-escolares.service';
import { CrearAnyoEscolarDialogComponent } from '../crear-anyo-escolar-dialog/crear-anyo-escolar-dialog.component';
import { AnyoEscolarDto } from '../dto/anyoEscolarDto.interface';
import { BorrarAnyoEscolarDialogComponent } from '../borrar-anyo-escolar-dialog/borrar-anyo-escolar-dialog.component';
import { EditarAnyoEscolarDialogComponent } from '../editar-anyo-escolar-dialog/editar-anyo-escolar-dialog.component';


@Component({
  selector: 'app-anyo-escolar',
  templateUrl: './anyo-escolar.component.html',
  styleUrls: ['./anyo-escolar.component.css']
})
export class AnyoEscolarComponent implements OnInit {

  anyo: AnyoEscolarDto;
  anyos: AnyoEscolar[];
  columnsToDisplay = ['nombreAnyoEscolar', 'editar', 'eliminar'];

  constructor(
    public dialog: MatDialog,
    private anyosService: AnyosEscolaresService
  ) { }

  ngOnInit() {
    this.getListaCursos();
  }

  getListaCursos() {
    this.anyosService.getLista().subscribe(resp => {
      this.anyos = resp;
    });
  }

  openCrearAnyoEscolarDialog() {
    const dialogRef = this.dialog.open(CrearAnyoEscolarDialogComponent);

    dialogRef.afterClosed().subscribe(resp => {
      this.anyosService.crearAnyoEscolar(resp).subscribe(resF => {
        alert("Se ha creado un año escolar correctamente");
        location.reload();
      });


    });
  }

  openDeleteDialog(anyoEscolar: AnyoEscolar) {
     this.dialog.open(BorrarAnyoEscolarDialogComponent, {
      data: { anyoEscolar: anyoEscolar }
    });
  }

  openEditDialog(anyoEscolar: AnyoEscolar) {
    this.dialog.open(EditarAnyoEscolarDialogComponent, {
     data: { anyoEscolar: anyoEscolar }
   });
 }

}
