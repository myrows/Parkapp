import { Injectable } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class MenuService {

  constructor(public translate: TranslateService) {}

  getAll() {
    return [
      {
        link: '/',
        label: this.translate.instant('HOME'),
        icon: 'home'
      },
      {
        link: 'fotocopias',
        label: this.translate.instant('Personal - Fotocopias'),
        externalRedirect: true,
        icon: 'person'
      },
      {
        link: 'secretario/fotocopias',
        label: this.translate.instant('Secretario - Fotocopias'),
        externalRedirect: true,
        icon: 'accessibility_new'
      },
      {
        link: 'secretario/fotocopias/realizadas',
        label: this.translate.instant('Secretario - Realizadas'),
        externalRedirect: true,
        icon: 'accessibility_new'
      },
      {
        link: 'admin/fotocopias/inProcess',
        label: this.translate.instant('Admin - Pendientes'),
        externalRedirect: true,
        icon: 'perm_identity'
      },
      {
        link: 'admin/fotocopias',
        label: this.translate.instant('Admin - Fotocopias'),
        externalRedirect: true,
        icon: 'perm_identity'
      },
      {
        link: 'admin/usuarios',
        label: this.translate.instant('Admin - Usuarios'),
        externalRedirect: true,
        icon: 'perm_identity'
      },
      {
        link: 'admin/cursos',
        label: this.translate.instant('Admin - Cursos'),
        externalRedirect: true,
        icon: 'view_comfy'
      },
      {
        link: 'pdf',
        label: this.translate.instant('PDF'),
        externalRedirect: true,
        icon: 'picture_as_pdf'
      },
      {
        link: 'login',
        label: this.translate.instant('Log in'),
        externalRedirect: true,
        icon: 'picture_as_pdf'
      }

      

      

    ];
  }
}
