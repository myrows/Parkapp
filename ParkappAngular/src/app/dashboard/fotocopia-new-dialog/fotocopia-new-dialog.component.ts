import { FirestoreDocumento } from 'src/app/models/firebase.interface';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FotocopiaService } from 'src/app/services/fotocopia.service';
import { FotocopiaDto } from 'src/app/models/fotocopia.dto';
import { CursoService } from 'src/app/services/curso.service';
import { CursoResponse } from 'src/app/models/cursos.interface';
import { UsersService } from 'src/app/services/users.service';
import { UserResponse } from 'src/app/models/users.interface';
import { formatDate, DatePipe } from '@angular/common';

@Component({
  selector: 'app-fotocopia-new-dialog',
  templateUrl: './fotocopia-new-dialog.component.html',
  styleUrls: ['./fotocopia-new-dialog.component.scss']
})
export class FotocopiaNewDialogComponent implements OnInit {

  fotocopiaDto: FotocopiaDto;
  listaCursos: FirestoreDocumento<CursoResponse>[];
  listaProfesores: FirestoreDocumento<UserResponse>[];
  usuario: string;
  date: Date;

  constructor(public dialogRef: MatDialogRef<FotocopiaNewDialogComponent>, private fotocopiaService: FotocopiaService,
     private cursoService: CursoService,
     private userService: UsersService,
     public datepipe: DatePipe) { }

  ngOnInit() {
    this.date = new Date();
    /*  */
    this.usuario = localStorage.getItem('nombre');
    this.fotocopiaDto = new FotocopiaDto('', '', this.usuario, 'Pendiente de autorización', this.date.toString(), 'N/A', this.datepipe.transform(this.date, 'yyyy'));
    localStorage.setItem('year', this.fotocopiaDto.year);
    this.loadCursos();
    this.loadProfesores();
  }

  createFotocopia(){
    this.fotocopiaService.createFotocopia(this.fotocopiaDto).then(resp => {
      this.dialogRef.close(true);
    }).catch(error => {
      this.dialogRef.close(false);
    })
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

  loadProfesores(){
    this.userService.getUsuario().subscribe(resp => {

      this.listaProfesores = [];

      resp.forEach((respProf: any)=> {
        this.listaProfesores.push({
          id: respProf.payload.doc.id,
          data: respProf.payload.doc.data() as UserResponse
        })
      })
    })
  }



  close(){
    this.dialogRef.close(null);
  }

}
