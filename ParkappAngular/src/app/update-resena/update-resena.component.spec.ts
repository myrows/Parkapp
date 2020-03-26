import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateResenaComponent } from './update-resena.component';

describe('UpdateResenaComponent', () => {
  let component: UpdateResenaComponent;
  let fixture: ComponentFixture<UpdateResenaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateResenaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateResenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
