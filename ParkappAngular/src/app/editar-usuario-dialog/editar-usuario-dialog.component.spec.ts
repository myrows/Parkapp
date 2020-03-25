import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarUsuarioDialogComponent } from './editar-usuario-dialog.component';

describe('EditarUsuarioDialogComponent', () => {
  let component: EditarUsuarioDialogComponent;
  let fixture: ComponentFixture<EditarUsuarioDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarUsuarioDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarUsuarioDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
