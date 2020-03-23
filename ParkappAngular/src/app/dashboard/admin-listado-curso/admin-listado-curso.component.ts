import { Component, OnInit } from '@angular/core';
import { FirestoreDocumento } from 'src/app/models/firebase.interface';
import { CursoResponse } from 'src/app/models/cursos.interface';
import { CursoService } from 'src/app/services/curso.service';

@Component({
  selector: 'app-admin-listado-curso',
  templateUrl: './admin-listado-curso.component.html',
  styleUrls: ['./admin-listado-curso.component.scss']
})
export class AdminListadoCursoComponent implements OnInit {

  listadoCurso: FirestoreDocumento<CursoResponse>[];
  displayedColumns: string[] = ['curso', 'acciones'];

  constructor(private cursoService: CursoService) { }

  ngOnInit() {
    this.loadCurso();
  }

  loadCurso(){
    this.cursoService.getCursos().subscribe(resp => {

      this.listadoCurso = [];

      resp.forEach((curso: any)=> {
        this.listadoCurso.push({
          id: curso.payload.doc.id,
          data: curso.payload.doc.data() as CursoResponse
        })
      })
    })
  }

  deleteCurso(idCurso: string){

    this.cursoService.deleteCurso(idCurso);

  }

}
