import { Component, OnInit } from '@angular/core';
import { PeticionesService } from '../services/peticiones.service';
import { EtapaPadreResponse } from '../models/etapaPadre-response.interface';
import { EtapaResponse } from '../models/etapa-response.interface';
import { CursoListResponse } from '../models/listCurso-response.interface';
import { UnidadResponse } from '../models/unidad-response.interface';
import { UnidadListResponse } from '../models/listUnidad-response.interface';

@Component({
  selector: 'app-estructura-centro',
  templateUrl: './estructura-centro.component.html',
  styleUrls: ['./estructura-centro.component.css']
})
export class EstructuraCentroComponent implements OnInit {

  etapaPadres: EtapaPadreResponse[];
  listaEtapas: EtapaResponse[];
  listaCursos: CursoListResponse[];
  listaUnidades: UnidadListResponse[];
  public etapaSeleccionada: number;
  public cursoSeleccionada: number;
  public etapaPadreSeleccionada: number;

  constructor(private peticionesService: PeticionesService) { }

  ngOnInit() {
    this.loadUnidades();
  }

  loadEtapasPadre(){
    this.peticionesService.loadEtapaPadre().subscribe(resp => {
      this.etapaPadres = resp;
      console.log(resp);
    })
  }

  loadEtapas(){
    this.peticionesService.loadEtapas().subscribe(resp => {
      this.listaEtapas = resp;
      this.loadEtapasPadre();
    })
  }

  loadCursos(){
    this.peticionesService.loadCursos().subscribe(resp => {
      this.listaCursos = resp;
      this.loadEtapas();
    })
  }

  loadUnidades(){
    this.peticionesService.loadUnidades().subscribe(resp =>{
      this.listaUnidades = resp;
      this.loadCursos();
    })
  }

  seleccionarEtapa(etapa: EtapaResponse) {
    this.etapaSeleccionada = etapa.id;
  }

  seleccionarCurso(curso: CursoListResponse) {
    this.cursoSeleccionada = curso.id;
  }

  seleccionarEtapaPadre(etapaPadre: EtapaPadreResponse) {
    this.etapaPadreSeleccionada = etapaPadre.id;
  }

}
