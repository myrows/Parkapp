import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CursoDto } from '../models/curso.dto';

const collectionName = 'cursos'

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  constructor(private db: AngularFirestore) { }


  getCursos(){
    return this.db.collection(collectionName).snapshotChanges();
  }

  createCurso(cursoDto: CursoDto){
    const coleccion = this.db.collection(collectionName);

    return coleccion.add(cursoDto.transformarDto());
  }

  deleteCurso(idCurso: string){
    return this.db.collection(collectionName).doc(idCurso).delete();
  }
}
