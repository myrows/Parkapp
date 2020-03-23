import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListadoCursoComponent } from './admin-listado-curso.component';

describe('AdminListadoCursoComponent', () => {
  let component: AdminListadoCursoComponent;
  let fixture: ComponentFixture<AdminListadoCursoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminListadoCursoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminListadoCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
