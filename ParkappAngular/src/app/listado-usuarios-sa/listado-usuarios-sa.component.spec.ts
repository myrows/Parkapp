import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoUsuariosSaComponent } from './listado-usuarios-sa.component';

describe('ListadoUsuariosSaComponent', () => {
  let component: ListadoUsuariosSaComponent;
  let fixture: ComponentFixture<ListadoUsuariosSaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoUsuariosSaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoUsuariosSaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
