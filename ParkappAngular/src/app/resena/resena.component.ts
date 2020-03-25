import { Component, OnInit } from '@angular/core';
import { PeticionesService } from '../services/peticiones.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ResenaDto } from '../dto/resena.dto';
import { ResenaResponse } from '../models/resena-response.interface';
import { BorrarResenaDialogComponent } from '../borrar-resena-dialog/borrar-resena-dialog.component';
import { CreateResenaComponent } from '../create-resena/create-resena.component';

@Component({
  selector: 'app-resena',
  templateUrl: './resena.component.html',
  styleUrls: ['./resena.component.css']
})
export class ResenaComponent implements OnInit {

  resenaDto: ResenaDto;
  listadoResena: ResenaResponse[];
  displayedColumns: string[] = ['id','title','body', 'rate', 'acciones'];

  constructor(private peticionesService: PeticionesService, private dialog : MatDialog, private authService: AuthService,
    private router: Router,
    private snackBar : MatSnackBar) { }

  ngOnInit() {
    this.loadResena();
  }

  createResena(){
    this.peticionesService.createResena(this.resenaDto).subscribe(resp => {
    })
  }

  loadResena(){
    this.peticionesService.loadResena().subscribe(resp =>{
      this.listadoResena = resp;
      console.log(resp);
    })
  }

  dialogCrearResena(){
    var dialogReference = this.dialog.open(CreateResenaComponent, {width: '300px'});

    dialogReference.afterClosed().subscribe(resp => {
      if(resp != null){
        if(resp){
        this.snackBar.open("Reseña creada con éxito ✔️");
        }else{
          this.snackBar.open("Error al crear la reseña ❌");
        }
      }
    })
  }

  dialogDeleteResena(resenaResponse: ResenaResponse) {
    this.dialog.open(BorrarResenaDialogComponent, {
     data: { resenaResponse: resenaResponse }
   });
 }

  logout() {
    this.authService.clearToken();
    this.router.navigate(['/login']);
    this.snackBar.open('Has cerrado sesión');
  }

}
