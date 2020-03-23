import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrarUsuarioDialogComponent } from './borrar-usuario-dialog.component';

describe('BorrarUsuarioDialogComponent', () => {
  let component: BorrarUsuarioDialogComponent;
  let fixture: ComponentFixture<BorrarUsuarioDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorrarUsuarioDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrarUsuarioDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
