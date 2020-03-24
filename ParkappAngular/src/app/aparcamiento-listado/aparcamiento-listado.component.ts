import { Component, OnInit } from '@angular/core';
import { AparcamientosService } from '../services/aparcamiento.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AparcamientoResponse } from '../models/aparcamiento-response.interface';
import { BorrarAparcamientoDialogComponent } from '../borrar-aparcamiento-dialog/borrar-aparcamiento-dialog.component';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aparcamiento-listado',
  templateUrl: './aparcamiento-listado.component.html',
  styleUrls: ['./aparcamiento-listado.component.css']
})
export class AparcamientoListadoComponent implements OnInit {

  aparcamientos:AparcamientoResponse[];
  displayedColumns: string[] = ['nombre', 'idaparcamiento', 'dimension', 'acciones']
  
  constructor(private aparcamientosService: AparcamientosService, public dialog: MatDialog, private snackBar: MatSnackBar, private authService: AuthService,private router: Router) { }

  ngOnInit() {
    this.cargarAparcamientos();
  }

  cargarAparcamientos(){
    this.aparcamientosService.getAparcamientos().subscribe(resp => {
      this.aparcamientos = resp;
    });

  }
  openDeleteDialog(aparcamientoResponse: AparcamientoResponse) {
    this.dialog.open(BorrarAparcamientoDialogComponent, {
     data: { aparcamientoResponse: aparcamientoResponse }
   });
 }

 logout() {
  this.authService.clearToken();
  this.router.navigate(['/login']);
  this.snackBar.open('Has cerrado sesión');
}

}
