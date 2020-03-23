import { Component, OnInit } from '@angular/core';
import { FotocopiaService } from 'src/app/services/fotocopia.service';
import { FirestoreDocumento } from 'src/app/models/firebase.interface';
import { FotocopiaResponse } from 'src/app/models/fotocopias.interface';

@Component({
  selector: 'app-admin-listado-todas-fotocopia',
  templateUrl: './admin-listado-todas-fotocopia.component.html',
  styleUrls: ['./admin-listado-todas-fotocopia.component.scss']
})
export class AdminListadoTodasFotocopiaComponent implements OnInit {

  listadoFotocopias: FirestoreDocumento<FotocopiaResponse>[];
  displayedColumns: string[] = ['num_fotocopias','curso','profesor','estado', 'acciones'];

  constructor(private fotocopiaService: FotocopiaService) { }

  ngOnInit() {
    this.loadFotocopias();
  }

  loadFotocopias(){
    this.fotocopiaService.getFotocopiasMenosEnProceso().subscribe(resp => {

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

}
