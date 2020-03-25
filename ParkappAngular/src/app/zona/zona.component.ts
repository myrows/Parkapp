import { Component, OnInit } from '@angular/core';
import { PeticionesService } from '../services/peticiones.service';
import { ZonaDto } from '../dto/zona.dto';
import { ZonaResponse } from '../models/zona-response.interface';
import { MatDialog, MatSnackBar } from '@angular/material';
import { BorrarAparcamientoDialogComponent } from '../borrar-aparcamiento-dialog/borrar-aparcamiento-dialog.component';
import { BorrarZonaDialogComponent } from '../borrar-zona-dialog/borrar-zona-dialog.component';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CreateZonaComponent } from '../create-zona/create-zona.component';

@Component({
  selector: 'app-zona',
  templateUrl: './zona.component.html',
  styleUrls: ['./zona.component.css']
})
export class ZonaComponent implements OnInit {

  zona: ZonaDto;
  listaZona: ZonaResponse[];
  displayedColumns: string[] = ['id','nombre','ubicacion', 'acciones'];

  constructor(private peticionesService: PeticionesService, private dialog : MatDialog, private authService: AuthService,private router: Router, private snackBar : MatSnackBar) {
    
   }

  ngOnInit() {
    this.loadZonas();
  }

  loadZonas(){
    this.peticionesService.loadZona().subscribe(resp => {
      this.listaZona = resp;
    })
  }

  dialogCrearZona(){
    var dialogReference = this.dialog.open(CreateZonaComponent, {width: '300px'});

    dialogReference.afterClosed().subscribe(resp => {
      if(resp != null){
        if(resp){
        this.snackBar.open("Zona creada con éxito ✔️");
        }else{
          this.snackBar.open("Error al crear la zona ❌");
        }
      }
    })
  }

  dialogDeleteZona(zonaResponse: ZonaResponse) {
    this.dialog.open(BorrarZonaDialogComponent, {
     data: { zonaResponse: zonaResponse }
   });
 }

 logout() {
  this.authService.clearToken();
  this.router.navigate(['/login']);
  this.snackBar.open('Has cerrado sesión');
}

}