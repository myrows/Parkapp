import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { FirestoreDocumento } from 'src/app/models/firebase.interface';
import { UserResponse } from 'src/app/models/users.interface';
import { MatDialog, MatSnackBar } from '@angular/material';
import { UsersNewDialogComponent } from '../users-new-dialog/users-new-dialog.component';

@Component({
  selector: 'app-users-listado',
  templateUrl: './users-listado.component.html',
  styleUrls: ['./users-listado.component.scss']
})
export class UsersListadoComponent implements OnInit {

  listadoUsuarios: FirestoreDocumento<UserResponse>[];
  displayedColumns: string[] = ['nombre', 'email', 'rol', 'uid', 'acciones']

  constructor(private userService: UsersService, public dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loadUsuarios();
  }

  loadUsuarios(){
    this.userService.getUsuario().subscribe(resp => {

      this.listadoUsuarios = [];

      resp.forEach((user: any) => {
        this.listadoUsuarios.push({
          id: user.payload.doc.id,
          data: user.payload.doc.data() as UserResponse
        })
      })
    })
  }

  dialogCrearUser(){
    var dialogReference = this.dialog.open(UsersNewDialogComponent, {width: '300px'});

    dialogReference.afterClosed().subscribe(resp => {
      if(resp != null){
        if(resp){
        this.snackBar.open("Usuario creado con éxito ✔️");
        }else{
          this.snackBar.open("Error al crear usuario ❌");
        }
      }
    })
  }

  deleteUser(idUser: string){
    this.userService.deleteUser(idUser);
  }



}
