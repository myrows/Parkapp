
import { AparcamientoDto } from '../models/aparcamiento.dto';
import { Observable } from 'rxjs';
import { AparcamientoResponse } from '../models/aparcamiento-response.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';




const URL_ALLAPARCAMIENTOS = 'https://parkappsalesianos.herokuapp.com/parkapp/aparcamiento/';
const URL_NUEVOAPARCAMIENTO = 'https://parkappsalesianos.herokuapp.com/parkapp/aparcamiento/';
const URL_DELETEAPARCAMIENTO = 'https://parkappsalesianos.herokuapp.com/parkapp/aparcamiento/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class AparcamientosService {

  constructor(private http: HttpClient) { }


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

    deleteAparcamiento(aparcamientoId: number):Observable<AparcamientoResponse>{
      return this.http.delete<AparcamientoResponse>(
          URL_DELETEAPARCAMIENTO+aparcamientoId,
          httpOptions
        );
      }  
}
