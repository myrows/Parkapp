import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AparcamientoListadoComponent } from './aparcamiento-listado.component';

describe('AparcamientoListadoComponent', () => {
  let component: AparcamientoListadoComponent;
  let fixture: ComponentFixture<AparcamientoListadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AparcamientoListadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AparcamientoListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
