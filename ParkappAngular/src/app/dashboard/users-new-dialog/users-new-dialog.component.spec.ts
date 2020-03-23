import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersNewDialogComponent } from './users-new-dialog.component';

describe('UsersNewDialogComponent', () => {
  let component: UsersNewDialogComponent;
  let fixture: ComponentFixture<UsersNewDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersNewDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersNewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
