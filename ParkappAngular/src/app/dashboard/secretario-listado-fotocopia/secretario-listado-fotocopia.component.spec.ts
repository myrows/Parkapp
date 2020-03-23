import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretarioListadoFotocopiaComponent } from './secretario-listado-fotocopia.component';

describe('SecretarioListadoFotocopiaComponent', () => {
  let component: SecretarioListadoFotocopiaComponent;
  let fixture: ComponentFixture<SecretarioListadoFotocopiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecretarioListadoFotocopiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecretarioListadoFotocopiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
