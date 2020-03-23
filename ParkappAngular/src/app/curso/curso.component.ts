import { Component, OnInit } from '@angular/core';
import { PeticionesService } from '../services/peticiones.service';
import { CursoDto } from '../dto/curso.dto';
import { EtapaResponse } from '../models/etapa-response.interface';
import { EtapaListResponse } from '../models/listaEtapa-response.interface';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {

  curso: CursoDto;
  listaEtapas: EtapaResponse[];

  constructor(private peticionesService: PeticionesService) {
    this.curso = new CursoDto('', '')

   }

  ngOnInit() {
    this.loadEtapas();
  }

  doCreateCurso(){
    this.peticionesService.createCurso(this.curso).subscribe(resp => {
      alert("Se ha creado correctamente el Curso")
    })
  }

  loadEtapas(){
    this.peticionesService.loadEtapas().subscribe(resp => {
      this.listaEtapas = resp;
    })
  }

}
