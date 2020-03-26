import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PeticionesService } from '../services/peticiones.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ResenaResponse } from '../models/resena-response.interface';
import { ResenaDto } from '../dto/resena.dto';
import { AparcamientosService } from '../services/aparcamiento.service';
import { ZonaResponse } from '../models/zona-response.interface';

export interface DatosEntradaDialog {
  resena: ResenaResponse;
}

@Component({
  selector: 'app-update-resena',
  templateUrl: './update-resena.component.html',
  styleUrls: ['./update-resena.component.css']
})
export class UpdateResenaComponent implements OnInit {

  listaZona: ZonaResponse[];
  resenaResponse: ResenaResponse;
  resenaDto: ResenaDto;
  id: string;

  constructor(private http: HttpClient, private peticionesService: PeticionesService,
    public dialogRef: MatDialogRef<UpdateResenaComponent>, @Inject(MAT_DIALOG_DATA) public data: DatosEntradaDialog,
    private aparcamiento: AparcamientosService) { }

  ngOnInit() {
    this.loadZonas();
    this.resenaDto = new ResenaDto('', '', 0, localStorage.getItem('avatarUser'), '');
    this.resenaResponse = this.data.resena;
    this.resenaDto.title = this.resenaResponse.title;
    this.resenaDto.body = this.resenaResponse.body;
    this.resenaDto.rate = this.resenaResponse.rate;
    this.resenaDto.zonaId = this.resenaResponse.zonaId;
  }

  loadZonas() {
    this.peticionesService.loadZona().subscribe(resp => {
      this.listaZona = resp;
      console.log(this.listaZona);
    });
  }

  editResena() {
    this.id = this.resenaResponse._id;
    this.peticionesService.editResena(this.id, this.resenaDto).subscribe(resp => {
      this.dialogRef.close(true);
    });
  }

  close() {
    this.dialogRef.close(null);
  }

}
