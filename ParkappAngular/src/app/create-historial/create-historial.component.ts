import { Component, OnInit } from '@angular/core';
import { PeticionesService } from '../services/peticiones.service';
import { MatDialogRef } from '@angular/material';
import { HistorialDto } from '../dto/historial.dto';
import { AparcamientoResponse } from '../models/aparcamiento-response.interface';
import { AparcamientosService } from '../services/aparcamiento.service';

@Component({
  selector: 'app-create-historial',
  templateUrl: './create-historial.component.html',
  styleUrls: ['./create-historial.component.css']
})
export class CreateHistorialComponent implements OnInit {

  historialDto: HistorialDto;
  historial: string;
  listaAparcamiento: AparcamientoResponse[];

  constructor(private peticionesService: PeticionesService, private aparcamiento: AparcamientosService,
              public dialogRef: MatDialogRef<CreateHistorialComponent>) { }

  ngOnInit() {
    this.historialDto = new HistorialDto('', '', '', '');
    this.loadAparcamiento();
  }

  loadAparcamiento() {
    this.aparcamiento.getAparcamientos().subscribe(resp => {
        this.listaAparcamiento = resp;
    });
  }

  createHistorial() {
    this.peticionesService.createHistorial(this.historialDto).subscribe(resp => {
      this.dialogRef.close(true);
    });
  }

  close() {
    this.dialogRef.close(null);
  }

}
