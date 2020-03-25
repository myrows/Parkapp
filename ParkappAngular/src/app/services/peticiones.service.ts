import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CrearAdminResponse } from '../models/crearAdmin-response.interface';
import { ColegioDto } from '../dto/colegio.dto';
import { ColegioResponse } from '../models/colegio-response.interface';
import { EtapaDto } from '../dto/etapa.dto';
import { EtapaResponse } from '../models/etapa-response.interface';
import { EtapaPadreResponse } from '../models/etapaPadre-response.interface';

import { UploadCsvEstructuraCentroDto } from '../dto/uploadCsv-estrucuraCentro.dto';
import { EstructuraCentroResponse } from '../models/uploadCsv-estructuraCentro-response.interface';

import { UsuarioResponse } from '../models/usuario-response.interface';
import { CursoDto } from '../dto/curso.dto';
import { CursoResponse } from '../models/curso-response.interface';
import { EtapaListResponse } from '../models/listaEtapa-response.interface';
import { UnidadDto } from '../dto/unidad.dto';
import { UnidadResponse } from '../models/unidad-response.interface';
import { CursoListResponse } from '../models/listCurso-response.interface';
import { UnidadListResponse } from '../models/listUnidad-response.interface';
import { PsmResponse } from '../models/psm-response.interface';
import { ZonaDto } from '../dto/zona.dto';
import { ZonaResponse } from '../models/zona-response.interface';
import { ResenaDto } from '../dto/resena.dto';
import { ResenaResponse } from '../models/resena-response.interface';
import { UsuarioDto } from '../models/usuario.dto';

const apiZona = 'https://parkappsalesianos.herokuapp.com/parkapp/zona/';
const apiResena = 'https://parkappsalesianos.herokuapp.com/parkapp/resena/';

/*const apiZona = 'http://localhost:3000/parkapp/zona/';
const apiResena = 'http://localhost:3000/parkapp/resena/';*/


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    //'Authorization': 'Bearer ' + localStorage.getItem('token')
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
      httpOptions
    );
  }

  loadZona(): Observable<ZonaResponse[]> {
    return this.http.get<ZonaResponse[]>(
      apiZona,
      httpOptions
    );
  }

  createResena(resenaDto: ResenaDto): Observable<ResenaResponse> {
    return this.http.post<ResenaResponse>(
      apiResena,
      resenaDto,
      httpOptions
    );
  }

  loadResena(): Observable<ResenaResponse[]> {
    return this.http.get<ResenaResponse[]>(
      apiResena,
      httpOptions
    );
  }

  uploadCsvEstructuraCentro(file: File, idAnyoEscolar: string, idColegio: string): Observable<EstructuraCentroResponse> {
    let formData = new FormData();
    formData.append("file", file);
    formData.append("idAnyoEscolar", idAnyoEscolar);
    formData.append("idColegio", idColegio);

    
    return this.http.post<EstructuraCentroResponse>(
      'http://localhost:9000/uploadEstructure',
      formData,
      httpOptionsWithUpload
    )
  }

  uploadCsvPsm(file: File, idAnyoEscolar: string, idColegio: string, evaluacion: string, idPuntoControl: string): Observable<PsmResponse> {
    let formData = new FormData();
    formData.append("file", file);
    formData.append("idAnyoEscolar", idAnyoEscolar);
    formData.append("idColegio", idColegio);
    formData.append("evaluacion", evaluacion);
    formData.append("idPuntoControl", idPuntoControl);

    
    return this.http.post<PsmResponse>(
      'http://localhost:9000/uploadPsm',
      formData,
      httpOptionsWithUpload
    )
  }

  public deleteZona(idZona: string): Observable<ZonaResponse> {
    return this.http.delete<ZonaResponse>(
      apiZona + idZona,
      httpOptions
    )
  }

  public deleteResena(idResena: string): Observable<ResenaResponse> {
    return this.http.delete<ResenaResponse>(
      apiResena + idResena,
      httpOptions
    )
  }


}
