import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserDto } from '../models/user.dto';

const collectionName = 'users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private db: AngularFirestore) { }


//CRUD

//[Create] un user

createUser(){

  var idUser = localStorage.getItem('uid');

  this.db.collection(collectionName).doc(idUser).set({
    nombre: localStorage.getItem('nombre'),
    email: localStorage.getItem('email'),
    uid: localStorage.getItem('uid'),
    photo: localStorage.getItem('photo'),
    rol: "PROFESOR"
  })
}

//[Read] un user

getUsuario(){

  return this.db.collection(collectionName, ref => ref.where('rol', '==', 'PROFESOR')).snapshotChanges();
}

createUsuario(usuarioDto: UserDto){

  const coleccion = this.db.collection(collectionName);
  
  return coleccion.add(usuarioDto.transformarDto());
}

deleteUser(idUser: string){

  this.db.collection(collectionName).doc(idUser).delete();
}

updateId(idUser: string){
  return this.db.doc(`${collectionName}/${idUser}`).update({
    uid: idUser,
  })
}

}
