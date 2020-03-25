import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarAparcamientoDialogComponent } from './editar-aparcamiento-dialog.component';

describe('EditarAparcamientoDialogComponent', () => {
  let component: EditarAparcamientoDialogComponent;
  let fixture: ComponentFixture<EditarAparcamientoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarAparcamientoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarAparcamientoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
