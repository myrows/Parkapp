import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

import { MenuService } from './menu.service';
import { Subscription } from 'rxjs';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-menu',
  template: `<ng-material-multilevel-menu [configuration]='config' [items]='menuItems' class='navigation'></ng-material-multilevel-menu>`,
  providers: [MenuService]
})
export class MenuComponent implements OnChanges, OnInit, OnDestroy {
  @Input() direction: string;

  private langChangeSubscription!: Subscription;
  currentLang = 'en';
  menuItems = [];

  config = {
    paddingAtStart: false,
    interfaceWithRoute: true,
    collapseOnSelect: true,
    highlightOnSelect: true,
    rtlLayout: this.direction === 'rtl' ? true : false,
    selectedListFontColor: '#3f51b5',
  };

  constructor(
    public translate: TranslateService,
    public menuService: MenuService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    this.config = {...this.config, rtlLayout: this.direction === 'rtl' ? true : false};
  }

  ngOnInit() {
    const menu =  this.menuService.getAll();
    this.menuItems = menu;

    this.langChangeSubscription = this.translate.onLangChange.subscribe( () => {
      const updatedMenu = this.menuService.getAll();
      this.menuItems = updatedMenu;
    });
  }

  ngOnDestroy() {
    this.langChangeSubscription.unsubscribe();
  }
}
