import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrarHistorialComponent } from './borrar-historial.component';

describe('BorrarHistorialComponent', () => {
  let component: BorrarHistorialComponent;
  let fixture: ComponentFixture<BorrarHistorialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorrarHistorialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrarHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
