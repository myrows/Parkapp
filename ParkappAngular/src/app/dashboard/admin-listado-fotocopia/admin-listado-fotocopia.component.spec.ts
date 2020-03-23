import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListadoFotocopiaComponent } from './admin-listado-fotocopia.component';

describe('AdminListadoFotocopiaComponent', () => {
  let component: AdminListadoFotocopiaComponent;
  let fixture: ComponentFixture<AdminListadoFotocopiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminListadoFotocopiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminListadoFotocopiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
