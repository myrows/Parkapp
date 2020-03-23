import { Component, OnInit } from '@angular/core';
import { PeticionesService } from '../services/peticiones.service';
import { EtapaDto } from '../dto/etapa.dto';
import { EtapaPadreResponse } from '../models/etapaPadre-response.interface';

@Component({
  selector: 'app-etapa',
  templateUrl: './etapa.component.html',
  styleUrls: ['./etapa.component.css']
})
export class EtapaComponent implements OnInit {

  etapa: EtapaDto;
  etapaPadres: EtapaPadreResponse[];

  constructor(private peticionesService: PeticionesService) {
    this.etapa = new EtapaDto('', '')
   }

  ngOnInit() {
    this.loadEtapa();
  }

  doCreateEtapa(){
    this.peticionesService.createEtapa(this.etapa).subscribe(resp =>{
      alert("Se ha creado correctamente la Etapa ")
    })
  }

  loadEtapa(){
    this.peticionesService.loadEtapaPadre().subscribe(resp =>{
      this.etapaPadres = resp;
    })
  }

}
