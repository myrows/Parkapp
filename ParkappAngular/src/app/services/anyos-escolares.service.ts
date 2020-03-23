import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AnyoEscolar } from '../models/anyoEscolar-response.interface';
import { Observable } from 'rxjs';
import { AnyoEscolarDto } from '../dto/anyoEscolarDto.interface';

const apiURL = 'http://localhost:9000/anyo/';
const apiURLaddAnyo = 'http://localhost:9000/anyo/add/';
const apiURLEdit = 'http://localhost:9000/anyo/edit/';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class AnyosEscolaresService {

  constructor(private http: HttpClient) { }

  public getLista(): Observable<AnyoEscolar[]> {
    return this.http.get<AnyoEscolar[]>(
      apiURL,
      httpOptions
    );
  }

  public crearAnyoEscolar(anyoEscolarDto: AnyoEscolarDto): Observable<AnyoEscolar> {
    return this.http.post<AnyoEscolar>(
      apiURLaddAnyo,
      anyoEscolarDto,
      httpOptions
    );
  }

  public deleteCursoAcademico(idCursoAcademico:number): Observable<AnyoEscolar> {
    return this.http.delete<AnyoEscolar>(
      apiURL + idCursoAcademico,
      httpOptions
    )
  }

  public editCursoAcademico(id:string,anyoEscolaDto:AnyoEscolarDto): Observable<AnyoEscolar> {
    return this.http.put<AnyoEscolar>(
      apiURLEdit + id,
      anyoEscolaDto,
      httpOptions
    )
  }

}
