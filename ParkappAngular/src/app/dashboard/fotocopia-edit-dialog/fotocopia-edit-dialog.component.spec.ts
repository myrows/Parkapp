import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FotocopiaEditDialogComponent } from './fotocopia-edit-dialog.component';

describe('FotocopiaEditDialogComponent', () => {
  let component: FotocopiaEditDialogComponent;
  let fixture: ComponentFixture<FotocopiaEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FotocopiaEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FotocopiaEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
