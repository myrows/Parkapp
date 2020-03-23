import { Component, OnInit } from '@angular/core';
import { PeticionesService } from '../services/peticiones.service';
import { AdminDto } from '../dto/admin.dto';
import { ColegioResponse } from '../models/colegio-response.interface';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  usuario: AdminDto;
  listaColegios: ColegioResponse[];

  constructor(private peticionesService: PeticionesService) { 
    this.usuario = new AdminDto('', '', 'USER', '')
  }

  ngOnInit() {
    this.listarColegio();
  }

  doCreateAdmin(){
    this.peticionesService.createAdmin(this.usuario).subscribe(resp =>{
      
      alert("Se ha creado correctamente")
    })
  }

  listarColegio(){
    this.peticionesService.loadColegio().subscribe(resp =>{
      this.listaColegios = resp;
    })
  }

}
