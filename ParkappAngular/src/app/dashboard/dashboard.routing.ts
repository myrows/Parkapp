import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { FotocopiaListadoComponent } from './fotocopia-listado/fotocopia-listado.component';
import { AdminListadoFotocopiaComponent } from './admin-listado-fotocopia/admin-listado-fotocopia.component';
import { AdminListadoTodasFotocopiaComponent } from './admin-listado-todas-fotocopia/admin-listado-todas-fotocopia.component';
import { SecretarioListadoFotocopiaComponent } from './secretario-listado-fotocopia/secretario-listado-fotocopia.component';
import { SecretarioListadoRealizadoFotocopiaComponent } from './secretario-listado-realizado-fotocopia/secretario-listado-realizado-fotocopia.component';
import { PdfGeneratorComponent } from './pdf-generator/pdf-generator.component';
import { AdminListadoCursoComponent } from './admin-listado-curso/admin-listado-curso.component';
import { UsersListadoComponent } from './users-listado/users-listado.component';
import { SigninComponent } from '../session/signin/signin.component';

export const DashboardRoutes: Routes = [
  { path: '', component: DashboardComponent},
  { path: 'fotocopias', component: FotocopiaListadoComponent},
  { path: 'secretario/fotocopias', component: SecretarioListadoFotocopiaComponent},
  { path: 'secretario/fotocopias/realizadas', component: SecretarioListadoRealizadoFotocopiaComponent},
  { path: 'admin/fotocopias', component: AdminListadoTodasFotocopiaComponent},
  { path: 'admin/fotocopias/inProcess', component: AdminListadoFotocopiaComponent},
  { path: 'admin/cursos', component: AdminListadoCursoComponent},
  { path: 'admin/usuarios', component: UsersListadoComponent},
  { path: 'pdf', component: PdfGeneratorComponent},
  { path: 'login', component: SigninComponent}
  
  
];
