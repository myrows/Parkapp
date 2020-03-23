import { Component, OnInit } from '@angular/core';
import { FotocopiaService } from 'src/app/services/fotocopia.service';
import { FirestoreDocumento } from 'src/app/models/firebase.interface';
import { FotocopiaResponse } from 'src/app/models/fotocopias.interface';

@Component({
  selector: 'app-secretario-listado-realizado-fotocopia',
  templateUrl: './secretario-listado-realizado-fotocopia.component.html',
  styleUrls: ['./secretario-listado-realizado-fotocopia.component.scss']
})
export class SecretarioListadoRealizadoFotocopiaComponent implements OnInit {

  listadoFotocopias: FirestoreDocumento<FotocopiaResponse>[];
  displayedColumns: string[] = ['num_fotocopias','curso','profesor','estado'];

  constructor(private fotocopiaService: FotocopiaService) { }

  ngOnInit() {
    this.loadFotocopias();
  }

  loadFotocopias(){
    this.fotocopiaService.getFotocopiasRealizadas().subscribe(resp => {

      this.listadoFotocopias = [];

      resp.forEach((fotocopia: any)=> {
        this.listadoFotocopias.push({
          id: fotocopia.payload.doc.id,
          data: fotocopia.payload.doc.data() as FotocopiaResponse
        })
      })
    })
  }

}
