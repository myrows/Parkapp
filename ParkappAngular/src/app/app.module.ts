import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER,NgModule } from '@angular/core';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule} from '@angular/forms';
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
import { SuperAdminComponent } from './super-admin/super-admin.component';
import {MatSelectModule} from '@angular/material/select';
import { ColegioComponent } from './colegio/colegio.component';
import { PeticionesService } from './services/peticiones.service';
import { AnyoEscolarComponent } from './anyo-escolar/anyo-escolar.component';
import { AuthService } from './services/auth.service';
import { AnyosEscolaresService } from './services/anyos-escolares.service';
import { AdminComponent } from './admin/admin.component';
import { EtapaComponent } from './etapa/etapa.component';
import { ListadoUsuariosSaComponent } from './listado-usuarios-sa/listado-usuarios-sa.component';
import { CursoComponent } from './curso/curso.component';

import { UploadEstructuraCentroComponent } from './upload-estructura-centro/upload-estructura-centro.component';

import { CrearAnyoEscolarDialogComponent } from './crear-anyo-escolar-dialog/crear-anyo-escolar-dialog.component';
import { UnidadComponent } from './unidad/unidad.component';
import { EstructuraCentroComponent } from './estructura-centro/estructura-centro.component';
import {MatMenuModule} from '@angular/material/menu';
import { BorrarAnyoEscolarDialogComponent } from './borrar-anyo-escolar-dialog/borrar-anyo-escolar-dialog.component';
import { EditarAnyoEscolarDialogComponent } from './editar-anyo-escolar-dialog/editar-anyo-escolar-dialog.component';

import { BorrarUsuarioDialogComponent } from './borrar-usuario-dialog/borrar-usuario-dialog.component';
import { EditUsuarioDialogComponent } from './edit-usuario-dialog/edit-usuario-dialog.component';
import { UploadPsmComponent } from './upload-psm/upload-psm.component';




export function tokenGetter() {
  return localStorage.getItem("token");
}

const routes: Routes = [ 
  { path: 'login', component: LoginComponent },
  { path: 'usuarios', component: ListadoUsuariosSaComponent},
  { path: 'createAdmin', component: SuperAdminComponent },
  { path: 'colegio', component: ColegioComponent },
  { path: 'anyosEscolares', component: AnyoEscolarComponent },
  { path: 'createUser', component: AdminComponent },
  { path: 'createEtapa', component:  EtapaComponent},
  { path: 'createCurso', component:  CursoComponent},
  { path: 'createUnidad', component:  UnidadComponent},
  { path: 'estructuraCentro', component:  EstructuraCentroComponent},
  { path: 'upload/estructuraCentro', component:  UploadEstructuraCentroComponent},
  { path: 'upload/psm', component:  UploadPsmComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    UsuarioComponent,
    SuperAdminComponent,
    ColegioComponent,
    AnyoEscolarComponent,
    AdminComponent,
    EtapaComponent,
    CursoComponent,
    UploadEstructuraCentroComponent,
    CrearAnyoEscolarDialogComponent,
    ListadoUsuariosSaComponent,
    UnidadComponent,
    EstructuraCentroComponent,
    BorrarAnyoEscolarDialogComponent,
    EditarAnyoEscolarDialogComponent,
    BorrarUsuarioDialogComponent,
    EditUsuarioDialogComponent,
    UploadPsmComponent

  ],
  entryComponents: [
    CrearAnyoEscolarDialogComponent,
    ListadoUsuariosSaComponent,
    CursoComponent,
    BorrarAnyoEscolarDialogComponent,
    EditarAnyoEscolarDialogComponent,
    BorrarUsuarioDialogComponent,
    EditUsuarioDialogComponent
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
    FormsModule,
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
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 5000 } },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
