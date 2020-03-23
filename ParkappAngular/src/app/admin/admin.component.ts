import { Component, OnInit } from '@angular/core';
import { PeticionesService } from '../services/peticiones.service';
import { ColegioResponse } from '../models/colegio-response.interface';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  listaColegios: ColegioResponse[];

  constructor(private peticionesService: PeticionesService) { 
  }

  ngOnInit() {
    this.listarColegio();
  }

  listarColegio(){
    this.peticionesService.loadColegio().subscribe(resp =>{
      this.listaColegios = resp;
    })
  }

}
