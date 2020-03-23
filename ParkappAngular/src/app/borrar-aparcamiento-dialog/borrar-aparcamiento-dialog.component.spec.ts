import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrarAparcamientoDialogComponent } from './borrar-aparcamiento-dialog.component';

describe('BorrarAparcamientoDialogComponent', () => {
  let component: BorrarAparcamientoDialogComponent;
  let fixture: ComponentFixture<BorrarAparcamientoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorrarAparcamientoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrarAparcamientoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
