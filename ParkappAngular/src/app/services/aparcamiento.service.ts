
import { AparcamientoDto } from '../models/aparcamiento.dto';
import { Observable } from 'rxjs';
import { AparcamientoResponse } from '../models/aparcamiento-response.interface';
import { HttpClient, HttpHeaders, HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HistorialResponse } from '../models/historial-response.interface';




/*const URL_ALLAPARCAMIENTOS = 'https://parkappsalesianos.herokuapp.com/parkapp/aparcamiento/';
const URL_NUEVOAPARCAMIENTO = 'https://parkappsalesianos.herokuapp.com/parkapp/aparcamiento/';
const URL_DELETEAPARCAMIENTO = 'https://parkappsalesianos.herokuapp.com/parkapp/aparcamiento/';*/

const URL_ALLAPARCAMIENTOS = 'http://localhost:3000/parkapp/aparcamiento';
const URL_NUEVOAPARCAMIENTO = 'http://localhost:3000/parkapp/aparcamiento';
const URL_DELETEAPARCAMIENTO = 'http://localhost:3000/parkapp/aparcamiento';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};
const httpOptionsWithUpload = {
  headers: new HttpHeaders({
    'Content-Type': 'multipart/form-data'
    //'Authorization': 'Bearer ' + localStorage.getItem('token')
  })
};


@Injectable({
  providedIn: 'root'
})
export class AparcamientosService {

  constructor(private http: HttpClient) { }


  uploadAparcamiento(filename : string, puntuacion: string, dimension: string, longitud: string, latitud: string, avatar: File, nombre:string, userId:string, zonaId:string):Observable<Object> {
    const form = new FormData();
    /*let headers = new HttpHeaders();
    headers.append("Content-Type", "multipart/form-data");
    headers.append("Access-Control-Allow-Origin", "*");
    headers.append("Access-Control-Allow-Credentials", "true");
    headers.append("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    headers.append("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");*/

    form.append('puntuacion', '3');
    form.append('dimension', '23');
    form.append('longitud', '-35.324');
    form.append('latitud', '-35.4535');
    form.append('avatar', avatar);
    form.append('nombre', 'B3');
    form.append('userId', '5e6a3b7fd7d7b6073496dca6');
    form.append('zonaId', '5e6e070536dd1732649c1cf1');
    return this.http.post<Object>(
      URL_NUEVOAPARCAMIENTO,
      form, httpOptionsWithUpload);
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
