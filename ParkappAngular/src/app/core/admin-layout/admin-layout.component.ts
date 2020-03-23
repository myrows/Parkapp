import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';
import {
  Component,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import {
  PerfectScrollbarConfigInterface,
  PerfectScrollbarDirective
} from 'ngx-perfect-scrollbar';
import { filter, map } from 'rxjs/operators';

const SMALL_WIDTH_BREAKPOINT = 960;

@Component({
  selector: 'app-layout',
  template: '<app-layout-inner [isScreenSmall]="(isScreenSmall | async)"></app-layout-inner>',
  encapsulation: ViewEncapsulation.None
})
export class AdminLayoutComponent  {
  isScreenSmall: Observable<boolean>;

  constructor(
    public breakpoints: BreakpointObserver
  ) {
    this.isScreenSmall = breakpoints.observe(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`).pipe(map(breakpoint => breakpoint.matches));
  }
}


@Component({
  selector: 'app-layout-inner',
  templateUrl: './admin-layout.component.html'
})
export class LayoutComponent implements OnInit, OnDestroy {
  private layoutRouter: Subscription;
  @Input() isScreenSmall: boolean;

  url: string;
  sidePanelOpened;
  options = {
    collapsed: false,
    boxed: false,
    dark: false,
    dir: 'ltr'
  };

  @ViewChild('sidemenu', {static: false}) sidemenu;
  @ViewChild(PerfectScrollbarDirective, {static: false}) directiveScroll: PerfectScrollbarDirective;

  public config: PerfectScrollbarConfigInterface = {};

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
    this.url = this.router.url;

    this.layoutRouter = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        document.querySelector(
          '.app-inner > .mat-drawer-content > div'
        ).scrollTop = 0;
        this.url = event.url;
        this.runOnRouteChange();
      });
  }

  ngOnDestroy(): void {
    this.layoutRouter.unsubscribe();
  }

  runOnRouteChange(): void {
    if (this.isOver()) {
      this.sidemenu.close();
    }

    this.updatePS();
  }

  receiveOptions($event): void {
    this.options = $event;
  }

  isOver(): boolean {
    if (
      this.url === '/apps/messages' ||
      this.url === '/apps/calendar' ||
      this.url === '/apps/media' ||
      this.url === '/maps/leaflet' ||
      this.url === '/taskboard'
    ) {
      return true;
    } else {
      return this.isScreenSmall;
    }
  }

  menuMouseOver(): void {
    if (this.isScreenSmall && this.options.collapsed) {
      this.sidemenu.mode = 'over';
    }
  }

  menuMouseOut(): void {
    if (this.isScreenSmall && this.options.collapsed) {
      this.sidemenu.mode = 'side';
    }
  }

  updatePS(): void {
    if (!this.isScreenSmall) {
      setTimeout(() => {
        this.directiveScroll.update();
      }, 350);
    }
  }
}
