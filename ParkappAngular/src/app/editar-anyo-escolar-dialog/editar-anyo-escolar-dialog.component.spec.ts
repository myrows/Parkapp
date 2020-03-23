import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarAnyoEscolarDialogComponent } from './editar-anyo-escolar-dialog.component';

describe('EditarAnyoEscolarDialogComponent', () => {
  let component: EditarAnyoEscolarDialogComponent;
  let fixture: ComponentFixture<EditarAnyoEscolarDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarAnyoEscolarDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarAnyoEscolarDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
