import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrarResenaDialogComponent } from './borrar-resena-dialog.component';

describe('BorrarResenaDialogComponent', () => {
  let component: BorrarResenaDialogComponent;
  let fixture: ComponentFixture<BorrarResenaDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorrarResenaDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrarResenaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
