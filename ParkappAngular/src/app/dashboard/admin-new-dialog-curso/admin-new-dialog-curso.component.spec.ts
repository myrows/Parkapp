import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNewDialogCursoComponent } from './admin-new-dialog-curso.component';

describe('AdminNewDialogCursoComponent', () => {
  let component: AdminNewDialogCursoComponent;
  let fixture: ComponentFixture<AdminNewDialogCursoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminNewDialogCursoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNewDialogCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
