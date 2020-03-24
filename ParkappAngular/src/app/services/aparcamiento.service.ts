
import { AparcamientoDto } from '../models/aparcamiento.dto';
import { Observable } from 'rxjs';
import { AparcamientoResponse } from '../models/aparcamiento-response.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HistorialResponse } from '../models/historial-response.interface';




const URL_ALLAPARCAMIENTOS = 'https://parkappsalesianos.herokuapp.com/parkapp/aparcamiento/';
const URL_NUEVOAPARCAMIENTO = 'https://parkappsalesianos.herokuapp.com/parkapp/aparcamiento/';
const URL_DELETEAPARCAMIENTO = 'https://parkappsalesianos.herokuapp.com/parkapp/aparcamiento/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};
const httpOptionsWithUpload = {
  headers: new HttpHeaders({
    'Content-Type':  'multipart/form-data',
    //'Authorization': 'Bearer ' + localStorage.getItem('token')
  })
};


@Injectable({
  providedIn: 'root'
})
export class AparcamientosService {

  constructor(private http: HttpClient) { }


  uploadAparcamiento(avatar: File, dimension: string, puntuacion: string, longitud: string, latitud: string,nombre:string,userId:string,zonaId:string): Observable<AparcamientoResponse> {
    let formData = new FormData();
    formData.append("avatar", avatar);
    formData.append("dimension", dimension);
    formData.append("puntuacion", puntuacion);
    formData.append("longitud", longitud);
    formData.append("latitud", latitud);
    formData.append("nombre", nombre);
    formData.append("userId", userId);
    formData.append("zonaId", zonaId);


    return this.http.post<AparcamientoResponse>(
      URL_NUEVOAPARCAMIENTO,
      formData,
      httpOptionsWithUpload
    )
  }

  nuevoAparcamiento (nuevoAparcamiento: AparcamientoDto): Observable<AparcamientoResponse> {
    return this.http.post<AparcamientoResponse>(
      URL_NUEVOAPARCAMIENTO,
      nuevoAparcamiento,
      httpOptions
      );
    }

    getAparcamientos(): Observable<AparcamientoResponse[]>{
      return this.http.get<AparcamientoResponse[]>(
        URL_ALLAPARCAMIENTOS,
        httpOptions
      );
    }

    deleteAparcamiento(aparcamientoId: string):Observable<AparcamientoResponse>{
      return this.http.delete<AparcamientoResponse>(
          URL_DELETEAPARCAMIENTO+aparcamientoId,
          httpOptions
        );
      }
    
     /* uploadAparcamiento(historial: HistorialResponse[],
        dimension: string,
        longitud: number,
        latitud: number,
        avatar: File,
        nombre:string,
        userId:string,
        zonaId:string): Observable<AparcamientoResponse> {
        let formData = new FormData();
        formData.append("avatar", avatar);
        formData.append("nombre", nombre);
        formData.append("userId", userId);
        formData.append("latitud", latitud.toString());
        formData.append("longitud", longitud.toString());
        formData.append("zonaId", zonaId);
        formData.append("zonaId", zonaId);
        formData.append("historial", historial);
    
        
        return this.http.post<PsmResponse>(
          'http://localhost:9000/uploadPsm',
          formData,
          httpOptionsWithUpload
        )
      }*/
}
