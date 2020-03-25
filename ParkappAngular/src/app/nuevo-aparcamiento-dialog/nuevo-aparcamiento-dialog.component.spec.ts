import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoAparcamientoDialogComponent } from './nuevo-aparcamiento-dialog.component';

describe('NuevoAparcamientoDialogComponent', () => {
  let component: NuevoAparcamientoDialogComponent;
  let fixture: ComponentFixture<NuevoAparcamientoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoAparcamientoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoAparcamientoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
