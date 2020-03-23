import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretarioListadoRealizadoFotocopiaComponent } from './secretario-listado-realizado-fotocopia.component';

describe('SecretarioListadoRealizadoFotocopiaComponent', () => {
  let component: SecretarioListadoRealizadoFotocopiaComponent;
  let fixture: ComponentFixture<SecretarioListadoRealizadoFotocopiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecretarioListadoRealizadoFotocopiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecretarioListadoRealizadoFotocopiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
