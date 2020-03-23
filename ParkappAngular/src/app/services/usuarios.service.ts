
import { AparcamientoDto } from '../models/aparcamiento.dto';
import { Observable } from 'rxjs';
import { AparcamientoResponse } from '../models/aparcamiento-response.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HistorialResponse } from '../models/historial-response.interface';
import { UsuarioDto } from '../models/usuario.dto';
import { UsuarioResponse } from '../models/usuario-response.interface';




const URL_ALLUSUARIOS = 'https://parkappsalesianos.herokuapp.com/parkapp/users';
const URL_NUEVOUSUARIO = 'https://parkappsalesianos.herokuapp.com/parkapp/register?';
const URL_DELETEUSUARIO = 'https://parkappsalesianos.herokuapp.com/parkapp/user/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }


  nuevoUsuario (nuevoUsuario: UsuarioDto): Observable<UsuarioResponse> {
    return this.http.post<UsuarioResponse>(
      URL_NUEVOUSUARIO,
      nuevoUsuario,
      httpOptions
      );
    }

    getUsuarios(): Observable<UsuarioResponse[]>{
      return this.http.get<UsuarioResponse[]>(
        URL_ALLUSUARIOS,
        httpOptions
      );
    }

    deleteUsuario(usuarioId: string):Observable<UsuarioResponse>{
      return this.http.delete<UsuarioResponse>(
        URL_DELETEUSUARIO+usuarioId,
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
