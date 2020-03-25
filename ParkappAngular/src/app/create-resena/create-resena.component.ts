import { Component, OnInit } from '@angular/core';
import { ResenaDto } from '../dto/resena.dto';
import { PeticionesService } from '../services/peticiones.service';
import { MatDialogRef } from '@angular/material';
import { ZonaResponse } from '../models/zona-response.interface';

@Component({
  selector: 'app-create-resena',
  templateUrl: './create-resena.component.html',
  styleUrls: ['./create-resena.component.css']
})
export class CreateResenaComponent implements OnInit {

  resenaDto: ResenaDto;
  listaZona: ZonaResponse[];

  constructor(private peticionesService: PeticionesService, public dialogRef: MatDialogRef<CreateResenaComponent>) { }

  ngOnInit() {
    this.resenaDto = new ResenaDto('', '', 0, localStorage.getItem('avatarUser'), '');
    this.loadZonas();
  }

  createResena() {
    this.peticionesService.createResena(this.resenaDto).subscribe(resp => {
      this.dialogRef.close(true);
    });
  }

  loadZonas() {
    this.peticionesService.loadZona().subscribe(resp => {
      this.listaZona = resp;
      console.log(this.listaZona);
    });
  }

  close() {
    this.dialogRef.close(null);
  }

}
