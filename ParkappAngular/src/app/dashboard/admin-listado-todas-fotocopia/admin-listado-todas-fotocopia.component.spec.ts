import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListadoTodasFotocopiaComponent } from './admin-listado-todas-fotocopia.component';

describe('AdminListadoTodasFotocopiaComponent', () => {
  let component: AdminListadoTodasFotocopiaComponent;
  let fixture: ComponentFixture<AdminListadoTodasFotocopiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminListadoTodasFotocopiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminListadoTodasFotocopiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
