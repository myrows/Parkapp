import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FotocopiaResponse } from '../models/fotocopias.interface';
import { FotocopiaDto } from '../models/fotocopia.dto';
import { id } from '@swimlane/ngx-datatable';

const collectionName = 'fotocopias';

@Injectable({
  providedIn: 'root'
})
export class FotocopiaService {

  constructor(private db: AngularFirestore) { }



//CRUD

//[CREATE] una fotocopia

createFotocopia(fotocopiaDto: FotocopiaDto){
  const coleccion = this.db.collection(collectionName);
  
  return coleccion.add(fotocopiaDto.transformarDto());
}

//[READ] una fotocopia

//Filtra todas las copias que tienen de estado autorizado, rechazado o realizado
getFotocopiasMenosEnProceso(){

  return this.db.collection<FotocopiaResponse>(collectionName, ref => ref.where('estado', 'in', ['Autorizado',  'Rechazado',  'Realizada'])).snapshotChanges();
}

//Filtra por aquellos profesores con el nombre igual al nombre de la session
getFotocopiasUser(){

  var nombreUsuario = localStorage.getItem('nombre');

  return this.db.collection<FotocopiaResponse>(collectionName, ref => ref.where('profesor', '==', nombreUsuario)).snapshotChanges();
}

//Filtra por todas las copias que están de estado en proceso
getFotocopiasEnProceso(){

  return this.db.collection<FotocopiaResponse>(collectionName, ref => ref.where('estado', '==', 'Pendiente de autorización')).snapshotChanges();
}

//Filtra por todas las copias que están autorizadas para realizar
getFotocopiasPorRealizar(){

  return this.db.collection<FotocopiaResponse>(collectionName, ref => ref.where('estado', '==', 'Autorizado')).snapshotChanges();
}

//Filtra por todas las copias realizadas
getFotocopiasRealizadas(){

  return this.db.collection<FotocopiaResponse>(collectionName, ref => ref.where('estado', '==', 'Realizada')).snapshotChanges();
}

//Filtra por todas las copias realizadas
getFotocopiasPorAnyo(){

  const yearCopiaCreated = localStorage.getItem('year');

  return this.db.collection<FotocopiaResponse>(collectionName, ref => ref.where('year', '==', yearCopiaCreated)).valueChanges();
}

//[UPDATE] una fotocopia

public update(idFotocopia: string, fotocopia: FotocopiaResponse){

  return this.db.doc(`${collectionName}/${idFotocopia}`).update(fotocopia);
}


//[DELETE] una fotocopia

deleteFotocopia(idFotocopia: string){

  this.db.collection(collectionName).doc(idFotocopia).delete();

}

authorize(idFotocopia: string){
  return this.db.doc(`${collectionName}/${idFotocopia}`).update({
    estado: 'Autorizado' 
  })
}

denied(idFotocopia: string){
  return this.db.doc(`${collectionName}/${idFotocopia}`).update({
    estado: 'Rechazado' 
  })

}

done(idFotocopia: string, frealizado: string){
  return this.db.doc(`${collectionName}/${idFotocopia}`).update({
    estado: 'Realizada',
    fecha_realizado: frealizado
  })
}

}
