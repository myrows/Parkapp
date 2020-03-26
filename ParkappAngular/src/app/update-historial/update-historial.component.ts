import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PeticionesService } from '../services/peticiones.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HistorialResponse } from '../models/historial-response.interface';
import { HistorialDto } from '../dto/historial.dto';
import { AparcamientosService } from '../services/aparcamiento.service';
import { AparcamientoResponse } from '../models/aparcamiento-response.interface';


export interface DatosEntradaDialog {
  historial: HistorialResponse;
}

@Component({
  selector: 'app-update-historial',
  templateUrl: './update-historial.component.html',
  styleUrls: ['./update-historial.component.css']
})
export class UpdateHistorialComponent implements OnInit {

  listaAparcamiento: AparcamientoResponse[];
  historialResponse: HistorialResponse;
  historialDto;
  id: string;

  constructor(private http: HttpClient, private peticionesService: PeticionesService,
    public dialogRef: MatDialogRef<UpdateHistorialComponent>, @Inject(MAT_DIALOG_DATA) public data: DatosEntradaDialog,
    private aparcamiento: AparcamientosService) { }

  ngOnInit() {
    this.loadAparcamiento();
    this.historialDto = new HistorialDto('', '', '', '');
    this.historialResponse = this.data.historial;
    this.historialDto.fechaEntrada = this.historialResponse.fechaEntrada;
    this.historialDto.fechaSalida = this.historialResponse.fechaSalida;
    this.historialDto.dia = this.historialResponse.dia;
    this.historialDto.aparcamientoId = this.historialResponse.aparcamientoId;
  }

  loadAparcamiento() {
    this.aparcamiento.getAparcamientos().subscribe(resp => {
        this.listaAparcamiento = resp;
    });
  }

  editHistorial() {
    this.id = this.historialResponse._id;
    this.peticionesService.editHistorial(this.id, this.historialDto).subscribe(resp => {
      this.dialogRef.close(true);
    });
  }

  close() {
    this.dialogRef.close(null);
  }

}
