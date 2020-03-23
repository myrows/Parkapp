import { Component, OnInit } from '@angular/core';
import { FotocopiaService } from 'src/app/services/fotocopia.service';
import { FirestoreDocumento } from 'src/app/models/firebase.interface';
import { FotocopiaResponse } from 'src/app/models/fotocopias.interface';

@Component({
  selector: 'app-secretario-listado-fotocopia',
  templateUrl: './secretario-listado-fotocopia.component.html',
  styleUrls: ['./secretario-listado-fotocopia.component.scss']
})
export class SecretarioListadoFotocopiaComponent implements OnInit {
  
  listadoFotocopias: FirestoreDocumento<FotocopiaResponse>[];
  displayedColumns: string[] = ['num_fotocopias','curso','profesor','estado', 'realizar'];
  fechaActual: Date;

  constructor(private fotocopiaService: FotocopiaService) { }

  ngOnInit() {
    this.fechaActual = new Date();
    this.loadFotocopias();
  }

  loadFotocopias(){
    this.fotocopiaService.getFotocopiasPorRealizar().subscribe(resp => {

      this.listadoFotocopias = [];

      resp.forEach((fotocopia: any)=> {
        this.listadoFotocopias.push({
          id: fotocopia.payload.doc.id,
          data: fotocopia.payload.doc.data() as FotocopiaResponse
        })
      })
    })
  }

  deleteFotocopia(idFotocopia: string){
    this.fotocopiaService.deleteFotocopia(idFotocopia);
  }

  done(idFotocopia: string){
    this.fotocopiaService.done(idFotocopia, this.fechaActual.toDateString());

  }

}
