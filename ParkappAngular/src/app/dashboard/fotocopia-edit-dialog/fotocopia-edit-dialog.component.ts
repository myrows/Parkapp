import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FotocopiaService } from 'src/app/services/fotocopia.service';
import { FotocopiaResponse } from 'src/app/models/fotocopias.interface';
import { FirestoreDocumento } from 'src/app/models/firebase.interface';
import { CursoResponse } from 'src/app/models/cursos.interface';
import { UserResponse } from 'src/app/models/users.interface';
import { CursoService } from 'src/app/services/curso.service';
import { UsersService } from 'src/app/services/users.service';

export interface DialogEditEntrada{

  id: string;
  fotocopia: FotocopiaResponse;
}

@Component({
  selector: 'app-fotocopia-edit-dialog',
  templateUrl: './fotocopia-edit-dialog.component.html',
  styleUrls: ['./fotocopia-edit-dialog.component.scss']
})
export class FotocopiaEditDialogComponent implements OnInit {

  id: string;
  fotocopia: FotocopiaResponse;
  listaCursos: FirestoreDocumento<CursoResponse>[];

  constructor(public dialogRef: MatDialogRef<FotocopiaEditDialogComponent>,
    private fotocopiaService: FotocopiaService,
    @Inject(MAT_DIALOG_DATA) public data: DialogEditEntrada,
    private cursoService: CursoService,
     private userService: UsersService) { }

  ngOnInit() {
    this.id = this.data.id;
    this.fotocopia = this.data.fotocopia;
    this.loadCursos();
  }

  loadCursos(){
    this.cursoService.getCursos().subscribe(resp => {

      this.listaCursos = [];

      resp.forEach((respCurso: any)=> {
        this.listaCursos.push({
          id: respCurso.payload.doc.id,
          data: respCurso.payload.doc.data() as CursoResponse
        })
      })
    })
  }

  editFotocopia(){
    this.fotocopiaService.update(this.id, this.fotocopia).then(resp => {
      this.dialogRef.close(true);
    }).catch(respError => {
      this.dialogRef.close(false);
    });
  }

  close(){
    this.dialogRef.close(null);
  }

}
