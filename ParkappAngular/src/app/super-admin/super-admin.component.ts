import { Component, OnInit } from '@angular/core';
import { PeticionesService } from '../services/peticiones.service';
import { AdminDto } from '../dto/admin.dto';
import { ColegioResponse } from '../models/colegio-response.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.css']
})
export class SuperAdminComponent implements OnInit {

  usuario: AdminDto;
  listaColegios: ColegioResponse[];
  listaRoles = ['USER', 'ADMIN'];

  constructor(
    private peticionesService: PeticionesService,
    private router: Router) {
    this.usuario = new AdminDto('', '', '', '')
   }

  ngOnInit() {
    this.listarColegio();
  }

  doCreateAdmin(){
    this.peticionesService.createAdmin(this.usuario).subscribe(resp =>{
      
      alert("Se ha creado correctamente")
    })
    this.router.navigate(['/usuarios']);
  }

  listarColegio(){
    this.peticionesService.loadColegio().subscribe(resp =>{
      this.listaColegios = resp;
    })
  }

}
