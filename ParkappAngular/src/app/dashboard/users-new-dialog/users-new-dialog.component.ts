import { Component, OnInit } from '@angular/core';
import { UserDto } from 'src/app/models/user.dto';
import { UsersService } from 'src/app/services/users.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-users-new-dialog',
  templateUrl: './users-new-dialog.component.html',
  styleUrls: ['./users-new-dialog.component.scss']
})
export class UsersNewDialogComponent implements OnInit {

  constructor(private userService: UsersService, public dialogRef: MatDialogRef<UsersNewDialogComponent>) { }

  usuarioDto: UserDto
  listaRoles: string[] = ['ADMIN', 'PROFESOR', 'SECRETARIO']
  usuarioId: string;

  ngOnInit() {
    this.usuarioDto = new UserDto('', '', '', '', '');
    localStorage.setItem('rol', this.usuarioDto.rol);
  }

  createUser(){
    this.userService.createUsuario(this.usuarioDto).then(resp => {
      this.dialogRef.close(true);
      localStorage.setItem('usuarioId', resp.id);
      this.userService.updateId(localStorage.getItem('usuarioId'))
    }).catch(error => {
      this.dialogRef.close(false);
    })

  }

  close(){
    this.dialogRef.close(null);
  }

}
