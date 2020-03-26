import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CrearAdminResponse } from '../models/crearAdmin-response.interface';
import { ZonaDto } from '../dto/zona.dto';
import { ZonaResponse } from '../models/zona-response.interface';
import { ResenaDto } from '../dto/resena.dto';
import { ResenaResponse } from '../models/resena-response.interface';
import { UsuarioDto } from '../models/usuario.dto';
import { HistorialResponse } from '../models/historial-response.interface';
import { HistorialDto } from '../dto/historial.dto';

const apiZona = 'https://parkappsalesianos.herokuapp.com/parkapp/angular/zona/';
const apiResena = 'https://parkappsalesianos.herokuapp.com/parkapp/angular/resena/';
const apiHistorial = 'https://parkappsalesianos.herokuapp.com/parkapp/angular/historial/';

/*const apiZona = 'http://localhost:3000/parkapp/zona/';
const apiResena = 'http://localhost:3000/parkapp/resena/';*/


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    //'Authorization': 'Bearer ' + localStorage.getItem('token')
  })
};

const httpOptionsAdmin = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  })
};

const httpOptionsWithUpload = {
  headers: new HttpHeaders({
    //'Content-Type':  'multipart/form-data',
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class PeticionesService {

  constructor(private http: HttpClient) { }

  createZona(zonaDto: ZonaDto): Observable<CrearAdminResponse> {
    return this.http.post<CrearAdminResponse>(
      apiZona,
      zonaDto,
      httpOptionsAdmin
    );
  }

  loadZona(): Observable<ZonaResponse[]> {
    return this.http.get<ZonaResponse[]>(
      apiZona,
      httpOptionsAdmin
    );
  }

  createResena(resenaDto: ResenaDto): Observable<ResenaResponse> {
    return this.http.post<ResenaResponse>(
      apiResena,
      resenaDto,
      httpOptionsAdmin
    );
  }

  loadResena(): Observable<ResenaResponse[]> {
    return this.http.get<ResenaResponse[]>(
      apiResena,
      httpOptionsAdmin
    );
  }

  editResena(resenaId: string, resenaDto: ResenaDto): Observable<ResenaResponse> {
    return this.http.put<ResenaResponse>(
      apiResena + resenaId,
      resenaDto,
      httpOptionsAdmin
    );
  }

  createHistorial(historialDto: HistorialDto): Observable<HistorialResponse> {
    return this.http.post<HistorialResponse>(
      apiHistorial,
      historialDto,
      httpOptionsAdmin
    );
  }

  loadHistorial(): Observable<HistorialResponse[]> {
    return this.http.get<HistorialResponse[]>(
      apiHistorial,
      httpOptionsAdmin
    );
  }

  editHistorial(historialId: string, historialDto: HistorialDto): Observable<HistorialResponse> {
    return this.http.put<HistorialResponse>(
      apiHistorial + historialId,
      historialDto,
      httpOptionsAdmin
    );
  }

  public deleteZona(idZona: string): Observable<ZonaResponse> {
    return this.http.delete<ZonaResponse>(
      apiZona + idZona,
      httpOptionsAdmin
    );
  }

  public deleteResena(idResena: string): Observable<ResenaResponse> {
    return this.http.delete<ResenaResponse>(
      apiResena + idResena,
      httpOptionsAdmin
    );
  }

  public deleteHistorial(idHistorial: string): Observable<HistorialResponse> {
    return this.http.delete<HistorialResponse>(
      apiHistorial + idHistorial,
      httpOptionsAdmin
    );
  }


}
