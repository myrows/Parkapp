import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FotocopiaListadoComponent } from './fotocopia-listado.component';

describe('FotocopiaListadoComponent', () => {
  let component: FotocopiaListadoComponent;
  let fixture: ComponentFixture<FotocopiaListadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FotocopiaListadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FotocopiaListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
