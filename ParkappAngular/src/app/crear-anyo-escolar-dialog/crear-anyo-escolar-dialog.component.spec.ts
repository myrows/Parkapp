import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearAnyoEscolarDialogComponent } from './crear-anyo-escolar-dialog.component';

describe('CrearAnyoEscolarDialogComponent', () => {
  let component: CrearAnyoEscolarDialogComponent;
  let fixture: ComponentFixture<CrearAnyoEscolarDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearAnyoEscolarDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearAnyoEscolarDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
