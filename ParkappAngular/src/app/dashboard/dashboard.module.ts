import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatProgressBarModule,
  MatTableModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule,
  MatCheckboxModule,
  MatSnackBarModule,
  MatChipsModule,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MAT_CHIPS_DEFAULT_OPTIONS,
} from '@angular/material';

import { ChartsModule } from 'ng2-charts';
import { CommonModule, DatePipe } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutes } from './dashboard.routing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AuthService } from '../services/auth.service';
import { FotocopiaListadoComponent } from './fotocopia-listado/fotocopia-listado.component';
import { UsersService } from '../services/users.service';
import { FotocopiaNewDialogComponent } from './fotocopia-new-dialog/fotocopia-new-dialog.component';
import { FotocopiaService } from '../services/fotocopia.service';
import {MatSelectModule} from '@angular/material/select';
import { CursoService } from '../services/curso.service';
import { FotocopiaEditDialogComponent } from './fotocopia-edit-dialog/fotocopia-edit-dialog.component';
import { AdminListadoFotocopiaComponent } from './admin-listado-fotocopia/admin-listado-fotocopia.component';
import { AdminListadoTodasFotocopiaComponent } from './admin-listado-todas-fotocopia/admin-listado-todas-fotocopia.component';
import { SecretarioListadoFotocopiaComponent } from './secretario-listado-fotocopia/secretario-listado-fotocopia.component';
import { SecretarioListadoRealizadoFotocopiaComponent } from './secretario-listado-realizado-fotocopia/secretario-listado-realizado-fotocopia.component';
import { PdfGeneratorComponent } from './pdf-generator/pdf-generator.component';
import { AdminListadoCursoComponent } from './admin-listado-curso/admin-listado-curso.component';
import { AdminNewDialogCursoComponent } from './admin-new-dialog-curso/admin-new-dialog-curso.component';
import { UsersListadoComponent } from './users-listado/users-listado.component';
import { UsersNewDialogComponent } from './users-new-dialog/users-new-dialog.component';
import { BrowserModule } from '@angular/platform-browser';
import { SigninComponent } from '../session/signin/signin.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DashboardRoutes),
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatProgressBarModule,
    MatMenuModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatChipsModule,
    MatSelectModule,
    ChartsModule,
    FormsModule,
    NgxDatatableModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  declarations: [DashboardComponent, FotocopiaListadoComponent, FotocopiaNewDialogComponent, FotocopiaEditDialogComponent,
     AdminListadoFotocopiaComponent, AdminListadoTodasFotocopiaComponent, SecretarioListadoFotocopiaComponent,
      SecretarioListadoRealizadoFotocopiaComponent, PdfGeneratorComponent, AdminListadoCursoComponent,
       AdminNewDialogCursoComponent, UsersListadoComponent, UsersNewDialogComponent, SigninComponent],
  entryComponents: [FotocopiaNewDialogComponent, FotocopiaEditDialogComponent, UsersNewDialogComponent],
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2000}},
    AuthService,
    UsersService,
    FotocopiaService,
    CursoService,
    DatePipe
  ]
})
export class DashboardModule {}
