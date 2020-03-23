
import { Component, OnInit } from '@angular/core';
import { FotocopiaService } from 'src/app/services/fotocopia.service';
import { FotocopiaResponse } from 'src/app/models/fotocopias.interface';
import { FirestoreDocumento } from 'src/app/models/firebase.interface';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FotocopiaNewDialogComponent } from '../fotocopia-new-dialog/fotocopia-new-dialog.component';
import { FotocopiaEditDialogComponent } from '../fotocopia-edit-dialog/fotocopia-edit-dialog.component';

@Component({
  selector: 'app-fotocopia-listado',
  templateUrl: './fotocopia-listado.component.html',
  styleUrls: ['./fotocopia-listado.component.scss']
})
export class FotocopiaListadoComponent implements OnInit {

  listadoFotocopias: FirestoreDocumento<FotocopiaResponse>[];
  displayedColumns: string[] = ['num_fotocopias','curso','profesor', 'fecha_creado', 'fecha_realizado', 'estado', 'acciones'];

  constructor(private fotocopiaService: FotocopiaService, public dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loadFotocopias();
  }


  loadFotocopias(){
    this.fotocopiaService.getFotocopiasUser().subscribe(resp => {

      this.listadoFotocopias = [];

      resp.forEach((fotocopia: any)=> {
        this.listadoFotocopias.push({
          id: fotocopia.payload.doc.id,
          data: fotocopia.payload.doc.data() as FotocopiaResponse
        })
      })
    })
  }

  dialogCrearFotocopia(){
    var dialogReference = this.dialog.open(FotocopiaNewDialogComponent, {width: '300px'});

    dialogReference.afterClosed().subscribe(resp => {
      if(resp != null){
        if(resp){
        this.snackBar.open("Fotocopia creada con éxito ✔️");
        }else{
          this.snackBar.open("Error al crear la fotocopia ❌");
        }
      }
    })
  }

  dialogEditFotocopia(fotocopiaToEdit: FirestoreDocumento<FotocopiaResponse>) {
    let dialogRef = this.dialog.open(FotocopiaEditDialogComponent, {
      width: '300px',
      data: {id: fotocopiaToEdit.id, fotocopia: fotocopiaToEdit.data}
    });

    dialogRef.afterClosed().subscribe(resp => {
      if(resp != null){
        if(resp){
          this.snackBar.open("Fotocopia editada correctamente ✔️");
        }else{
          this.snackBar.open("Error al editar fotocopia ❌");
        }

        }
    });
  }

  deleteFotocopia(idFotocopia: string){
    this.fotocopiaService.deleteFotocopia(idFotocopia);
  }

}
