import { Component, OnInit } from '@angular/core';
import { FotocopiaService } from 'src/app/services/fotocopia.service';
import { FirestoreDocumento } from 'src/app/models/firebase.interface';
import { FotocopiaResponse } from 'src/app/models/fotocopias.interface';

@Component({
  selector: 'app-admin-listado-fotocopia',
  templateUrl: './admin-listado-fotocopia.component.html',
  styleUrls: ['./admin-listado-fotocopia.component.scss']
})
export class AdminListadoFotocopiaComponent implements OnInit {

  listadoFotocopias: FirestoreDocumento<FotocopiaResponse>[];
  displayedColumns: string[] = ['num_fotocopias','curso','profesor','estado', 'autorizar', 'acciones'];

  constructor(private fotocopiaService: FotocopiaService) { }

  ngOnInit() {
    this.loadFotocopias();
  }

  loadFotocopias(){
    this.fotocopiaService.getFotocopiasEnProceso().subscribe(resp => {

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

  authorize(idFotocopia: string){
    this.fotocopiaService.authorize(idFotocopia);

  }

  denied(idFotocopia: string){
    this.fotocopiaService.denied(idFotocopia);

  }

}
