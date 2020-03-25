import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER,NgModule } from '@angular/core';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatFormFieldModule, MatPaginatorModule } from '@angular/material';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import {MatCardModule} from '@angular/material/card';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import { ConfigService, configServiceInitializerFactory } from './services/config.service';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule,  MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import { UsuarioComponent } from './usuario/usuario.component';
import {MatSelectModule} from '@angular/material/select';
import { PeticionesService } from './services/peticiones.service';
import { AuthService } from './services/auth.service';
import { AnyosEscolaresService } from './services/anyos-escolares.service';
import { ListadoUsuariosSaComponent } from './listado-usuarios-sa/listado-usuarios-sa.component';
import {MatMenuModule} from '@angular/material/menu';
import { BorrarUsuarioDialogComponent } from './borrar-usuario-dialog/borrar-usuario-dialog.component';
import { EditUsuarioDialogComponent } from './edit-usuario-dialog/edit-usuario-dialog.component';
import { AparcamientoListadoComponent } from './aparcamiento-listado/aparcamiento-listado.component';
import { AparcamientosService } from './services/aparcamiento.service';
import { BorrarAparcamientoDialogComponent } from './borrar-aparcamiento-dialog/borrar-aparcamiento-dialog.component';
import { UsuariosListadoComponent } from './usuarios-listado/usuarios-listado.component';
import { UsuariosService } from './services/usuarios.service';
import { BorrarZonaDialogComponent } from './borrar-zona-dialog/borrar-zona-dialog.component';
import { ZonaComponent } from './zona/zona.component';
import { UploadAparcamientoComponent } from './upload-aparcamiento/upload-aparcamiento.component';
import { ResenaComponent } from './resena/resena.component';
import { BorrarResenaDialogComponent } from './borrar-resena-dialog/borrar-resena-dialog.component';
import { FileSelectDirective } from 'ng2-file-upload';
import { CreateResenaComponent } from './create-resena/create-resena.component';
import {MatInputModule} from '@angular/material';
import { CreateZonaComponent } from './create-zona/create-zona.component';
import { HistoriaListadoComponent } from './historia-listado/historia-listado.component';
import { BorrarHistorialComponent } from './borrar-historial/borrar-historial.component';
import { CreateHistorialComponent } from './create-historial/create-historial.component';

var route: string;
const token = localStorage.getItem('token');

if (token != null) {
  route = '/zonas';
} else {
  route = '/login';
}


export function tokenGetter() {
  return localStorage.getItem("token");
}

const routes: Routes = [ 
  { path: '', redirectTo : '/login' , pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'zonas', component: ZonaComponent },
  { path: 'usuarios', component: UsuariosListadoComponent},
  { path: 'aparcamientos',component:AparcamientoListadoComponent},
  {path: 'uploadAparcamiento',component:UploadAparcamientoComponent},
  { path: 'resenas',component: ResenaComponent},
  { path: 'historial',component: HistoriaListadoComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    UsuarioComponent,
    ListadoUsuariosSaComponent,
    BorrarUsuarioDialogComponent,
    EditUsuarioDialogComponent,
    AparcamientoListadoComponent,
    BorrarAparcamientoDialogComponent,
    UsuariosListadoComponent,
    ZonaComponent,
    FileSelectDirective,
    BorrarZonaDialogComponent,
    UploadAparcamientoComponent,
    ResenaComponent,
    BorrarResenaDialogComponent,
    CreateResenaComponent,
    CreateZonaComponent,
    HistoriaListadoComponent,
    BorrarHistorialComponent,
    CreateHistorialComponent

  ],
  entryComponents: [
    ListadoUsuariosSaComponent,
    BorrarUsuarioDialogComponent,
    EditUsuarioDialogComponent,
    BorrarAparcamientoDialogComponent,
    BorrarZonaDialogComponent,
    BorrarResenaDialogComponent,
    UploadAparcamientoComponent,
    CreateResenaComponent,
    CreateZonaComponent,
    BorrarHistorialComponent,
    CreateHistorialComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatTableModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatPaginatorModule,
    MatDialogModule,
    MatCardModule,
    MatMenuModule,
    MatSidenavModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ["example.com"],
        blacklistedRoutes: ["example.com/examplebadroute/"]
      }
    }),
    RouterModule.forRoot(
      routes
    ),
  ],
  providers: [
    PeticionesService,
    AuthService,
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}},
    AnyosEscolaresService,
    ConfigService, {
      provide: APP_INITIALIZER,
      useFactory: configServiceInitializerFactory,
      deps: [ConfigService],
      multi: true
    },
    JwtHelperService,
    AparcamientosService,
    UsuariosService,
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 5000 } },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
