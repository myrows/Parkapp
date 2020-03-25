import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoUsuarioDialogComponent } from './nuevo-usuario-dialog.component';

describe('NuevoUsuarioDialogComponent', () => {
  let component: NuevoUsuarioDialogComponent;
  let fixture: ComponentFixture<NuevoUsuarioDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoUsuarioDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoUsuarioDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
