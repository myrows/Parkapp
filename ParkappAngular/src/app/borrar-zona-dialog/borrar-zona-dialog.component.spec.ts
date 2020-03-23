import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrarZonaDialogComponent } from './borrar-zona-dialog.component';

describe('BorrarZonaDialogComponent', () => {
  let component: BorrarZonaDialogComponent;
  let fixture: ComponentFixture<BorrarZonaDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorrarZonaDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrarZonaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
