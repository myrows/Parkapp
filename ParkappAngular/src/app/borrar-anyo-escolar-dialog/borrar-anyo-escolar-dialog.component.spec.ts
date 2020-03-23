import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrarAnyoEscolarDialogComponent } from './borrar-anyo-escolar-dialog.component';

describe('BorrarAnyoEscolarDialogComponent', () => {
  let component: BorrarAnyoEscolarDialogComponent;
  let fixture: ComponentFixture<BorrarAnyoEscolarDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorrarAnyoEscolarDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrarAnyoEscolarDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
