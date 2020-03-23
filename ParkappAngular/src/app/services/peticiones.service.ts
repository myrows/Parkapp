import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CrearAdminResponse } from '../models/crearAdmin-response.interface';
import { AdminDto } from '../dto/admin.dto';
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

const apiURL = 'http://localhost:9000/colegio/usuarios/';
const apiURLEdit = 'http://localhost:9000/colegio/usuario/edit/';

const httpOptions = {
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

  createAdmin(adminDto: AdminDto): Observable<CrearAdminResponse> {
    return this.http.post<CrearAdminResponse>(
      'http://localhost:9000/colegio/createAdmin',
      adminDto,
      httpOptions
    );
  }

  createColegio(colegioDto: ColegioDto): Observable<ColegioResponse> {
    return this.http.post<ColegioResponse>(
      'http://localhost:9000/colegio/createColegio',
      colegioDto,
      httpOptions
    )
  }

  createEtapa(etapaDto: EtapaDto): Observable<EtapaResponse> {
    return this.http.post<EtapaResponse>(
      'http://localhost:9000/colegio/createEtapa',
      etapaDto,
      httpOptions
    )
  }

  createCurso(cursoDto: CursoDto): Observable<CursoResponse> {
    return this.http.post<CursoResponse>(
      'http://localhost:9000/colegio/createCurso',
      cursoDto,
      httpOptions

    )
  }

  createUnidad(unidadDto: UnidadDto): Observable<UnidadResponse> {
    return this.http.post<UnidadResponse>(
      'http://localhost:9000/colegio/createUnidad',
      unidadDto,
      httpOptions

    )
  }

  loadColegio(): Observable<ColegioResponse[]> {
    return this.http.get<ColegioResponse[]>(
      'http://localhost:9000/colegio/',
      httpOptions

    )
  }

  loadEtapaPadre(): Observable<EtapaPadreResponse[]> {
    return this.http.get<EtapaPadreResponse[]>(
      'http://localhost:9000/colegio/etapasPadre',
      httpOptions
    )
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

  loadAllUsuarios(): Observable<UsuarioResponse[]> {
    return this.http.get<UsuarioResponse[]>(
      'http://localhost:9000/colegio/usuarios',
      httpOptions
    )
  }

  loadEtapas(): Observable<EtapaResponse[]> {
    return this.http.get<EtapaResponse[]>(
      'http://localhost:9000/colegio/etapas',
      httpOptions
    )
  }

  loadCursos(): Observable<CursoListResponse[]> {
    return this.http.get<CursoListResponse[]>(
      'http://localhost:9000/colegio/cursos',
      httpOptions

    )
  }

  loadUnidades(): Observable<UnidadListResponse[]>{
    return this.http.get<UnidadListResponse[]>(
      'http://localhost:9000/colegio/unidades',
      httpOptions
    )
  }

  public deleteUsuario(idCursoAcademico:number): Observable<UsuarioResponse> {
    return this.http.delete<UsuarioResponse>(
      apiURL + idCursoAcademico,
      httpOptions
    )
  }

  public editCursoAcademico(id:string,usuarioDto: AdminDto): Observable<UsuarioResponse> {
    return this.http.put<UsuarioResponse>(
      apiURLEdit + id,
      usuarioDto,
      httpOptions
    )
    }

}
