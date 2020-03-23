import { Component, OnInit } from '@angular/core';
import { AparcamientosService } from '../services/aparcamiento.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AparcamientoResponse } from '../models/aparcamiento-response.interface';

@Component({
  selector: 'app-aparcamiento-listado',
  templateUrl: './aparcamiento-listado.component.html',
  styleUrls: ['./aparcamiento-listado.component.css']
})
export class AparcamientoListadoComponent implements OnInit {

  aparcamientos:AparcamientoResponse[];
  displayedColumns: string[] = ['nombre', 'idaparcamiento', 'dimension', 'acciones']
  
  constructor(private aparcamientosService: AparcamientosService, public dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.cargarAparcamientos();
  }

  cargarAparcamientos(){
    this.aparcamientosService.getAparcamientos().subscribe(resp => {
      this.aparcamientos = resp;
    });

  }

}
