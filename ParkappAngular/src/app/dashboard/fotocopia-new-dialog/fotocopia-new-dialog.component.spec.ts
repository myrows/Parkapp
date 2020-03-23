import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FotocopiaNewDialogComponent } from './fotocopia-new-dialog.component';

describe('FotocopiaNewDialogComponent', () => {
  let component: FotocopiaNewDialogComponent;
  let fixture: ComponentFixture<FotocopiaNewDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FotocopiaNewDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FotocopiaNewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
