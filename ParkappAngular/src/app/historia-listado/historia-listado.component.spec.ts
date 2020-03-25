import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriaListadoComponent } from './historia-listado.component';

describe('HistoriaListadoComponent', () => {
  let component: HistoriaListadoComponent;
  let fixture: ComponentFixture<HistoriaListadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoriaListadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriaListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
