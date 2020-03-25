import { Component, OnInit, ViewChild } from '@angular/core';
import { PeticionesService } from '../services/peticiones.service';
import { MatDialog, MatSnackBar, MatPaginator, MatTableDataSource } from '@angular/material';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { HistorialResponse } from '../models/historial-response.interface';
import { BorrarHistorialComponent } from '../borrar-historial/borrar-historial.component';
import { CreateHistorialComponent } from '../create-historial/create-historial.component';

@Component({
  selector: 'app-historia-listado',
  templateUrl: './historia-listado.component.html',
  styleUrls: ['./historia-listado.component.css']
})
export class HistoriaListadoComponent implements OnInit {

  listadoHistorial: HistorialResponse[];
  displayedColumns: string[] = ['id', 'fechaEntrada', 'fechaSalida', 'acciones'];
  dataSource;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private peticionesService: PeticionesService, private dialog: MatDialog, private authService: AuthService,
              private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loadHistorial();
  }

  loadHistorial() {
    this.peticionesService.loadHistorial().subscribe(resp => {
      this.listadoHistorial = resp;

      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.data = resp;
  
      this.dataSource.paginator = this.paginator;
    });
  }

  dialogCrearHistorial(){
    var dialogReference = this.dialog.open(CreateHistorialComponent, {width: '300px'});

    dialogReference.afterClosed().subscribe(resp => {
      if(resp != null){
        if(resp){
        this.snackBar.open("Historial creado con éxito ✔️");
        }else{
          this.snackBar.open("Error al crear el historial ❌");
        }
      }
    })
  }

  dialogDeleteHistorial(historialResponse: HistorialResponse) {
    this.dialog.open(BorrarHistorialComponent, {
     data: { historialResponse: historialResponse }
   });
 }

  logout() {
    this.authService.clearToken();
    this.router.navigate(['/login']);
    this.snackBar.open('Has cerrado sesión');
  }

}
