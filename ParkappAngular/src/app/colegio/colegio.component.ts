import { Component, OnInit } from '@angular/core';
import { ColegioDto } from '../dto/colegio.dto';
import { PeticionesService } from '../services/peticiones.service';

@Component({
  selector: 'app-colegio',
  templateUrl: './colegio.component.html',
  styleUrls: ['./colegio.component.css']
})
export class ColegioComponent implements OnInit {

  colegio: ColegioDto;

  constructor(private peticionesService: PeticionesService) {
    this.colegio = new ColegioDto('');
   }

  ngOnInit() {
  }

  doCreateColegio(){
    this.peticionesService.createColegio(this.colegio).subscribe(resp => {
      
      alert("Se ha creado correctamente")

    })
  }

}
