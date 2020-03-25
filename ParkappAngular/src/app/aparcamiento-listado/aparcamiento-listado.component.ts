import { Component, OnInit, ViewChild } from '@angular/core';
import { AparcamientosService } from '../services/aparcamiento.service';
import { MatDialog, MatSnackBar, MatTableDataSource, MatPaginator } from '@angular/material';
import { AparcamientoResponse } from '../models/aparcamiento-response.interface';
import { BorrarAparcamientoDialogComponent } from '../borrar-aparcamiento-dialog/borrar-aparcamiento-dialog.component';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UploadAparcamientoComponent } from '../upload-aparcamiento/upload-aparcamiento.component';
import { NuevoAparcamientoDialogComponent } from '../nuevo-aparcamiento-dialog/nuevo-aparcamiento-dialog.component';
import { EditarAparcamientoDialogComponent } from '../editar-aparcamiento-dialog/editar-aparcamiento-dialog.component';

@Component({
  selector: 'app-aparcamiento-listado',
  templateUrl: './aparcamiento-listado.component.html',
  styleUrls: ['./aparcamiento-listado.component.css']
})
export class AparcamientoListadoComponent implements OnInit {

  aparcamientos: AparcamientoResponse[];
  dataSource = null;
  displayedColumns: string[] = ['nombre', 'idaparcamiento', 'dimension', 'borrar','editar']
  
  constructor(private aparcamientosService: AparcamientosService, public dialog: MatDialog, private snackBar: MatSnackBar, private authService: AuthService,private router: Router) { }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  ngOnInit() {
    this.cargarAparcamientos();
    this.dataSource = new MatTableDataSource<AparcamientoResponse>(this.aparcamientos);
    this.dataSource.paginator = this.paginator;
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

dialogCrearAparcamiento(){
  var dialogReference = this.dialog.open(NuevoAparcamientoDialogComponent, {width: '300px'});

  dialogReference.afterClosed().subscribe(resp => {
    if(resp != null){
      if(resp){
      this.snackBar.open("Aparcamiento creado con éxito ✔️");
      }else{
        this.snackBar.open("Error al crear el aparcamiento ❌");
      }
    }
  })
}
dialogEditarAparcamiento(aparcamientoResponse: AparcamientoResponse){
  var dialogReference = this.dialog.open(EditarAparcamientoDialogComponent, {width: '300px',data: { aparcamientoResponse: aparcamientoResponse}});

  dialogReference.afterClosed().subscribe(resp => {
    if(resp != null){
      if(resp){
      this.snackBar.open("Aparcamiento editado con éxito ✔️");
      }else{
        this.snackBar.open("Error al editar el aparcamiento ❌");
      }
    }
  })
}


}
