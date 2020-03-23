import { Component, OnInit } from '@angular/core';
import { PeticionesService } from '../services/peticiones.service';
import { ColegioResponse } from '../models/colegio-response.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.css']
})
export class SuperAdminComponent implements OnInit {

  listaColegios: ColegioResponse[];
  listaRoles = ['USER', 'ADMIN'];

  constructor(
    private peticionesService: PeticionesService,
    private router: Router) {
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
