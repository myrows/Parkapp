import { Component, OnInit } from '@angular/core';
import { PeticionesService } from '../services/peticiones.service';
import { UnidadDto } from '../dto/unidad.dto';
import { CursoListResponse } from '../models/listCurso-response.interface';

@Component({
  selector: 'app-unidad',
  templateUrl: './unidad.component.html',
  styleUrls: ['./unidad.component.css']
})
export class UnidadComponent implements OnInit {

  unidad: UnidadDto;
  listaCursos: CursoListResponse[];

  constructor(private peticionesService: PeticionesService) {
    this.unidad = new UnidadDto('', '')

   }

  ngOnInit() {
    this.loadCursos();
  }

  doCreateUnidad(){
    this.peticionesService.createUnidad(this.unidad).subscribe(resp =>{
      alert("Se ha creado correctamente Unidad")
    })
  }

  loadCursos(){
    this.peticionesService.loadCursos().subscribe(resp => {
      this.listaCursos = resp;
    })
  }

}
