import { Component, OnInit } from '@angular/core';
import { AparcamientosService } from '../services/aparcamiento.service';
import { ZonaResponse } from '../models/zona-response.interface';
import { AparcamientoDto } from '../models/aparcamiento.dto';
import { PeticionesService } from '../services/peticiones.service';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-nuevo-aparcamiento-dialog',
  templateUrl: './nuevo-aparcamiento-dialog.component.html',
  styleUrls: ['./nuevo-aparcamiento-dialog.component.css']
})
export class NuevoAparcamientoDialogComponent implements OnInit {

  aparcamientoDto: AparcamientoDto;
  listaZona: ZonaResponse[];

  constructor(private aparcamientoService: AparcamientosService, private peticionesService: PeticionesService,
     private dialogRef: MatDialogRef<NuevoAparcamientoDialogComponent>, private http: HttpClient, public snackBar:MatSnackBar) { }

  ngOnInit() {
    this.aparcamientoDto = new AparcamientoDto(0,'',0,undefined,0,'','','');
    this.loadZonas();
  }

  loadZonas() {
    this.peticionesService.loadZona().subscribe(resp => {
      this.listaZona = resp;
      console.log(this.listaZona);
    });
  }

  close(){
    this.dialogRef.close(null);
  }

  createAparcamiento() {
    this.aparcamientoService.nuevoAparcamiento(this.aparcamientoDto).subscribe(resp => {
      this.dialogRef.close(true);
    });
  }
}
