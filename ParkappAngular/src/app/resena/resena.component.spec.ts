import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResenaComponent } from './resena.component';

describe('ResenaComponent', () => {
  let component: ResenaComponent;
  let fixture: ComponentFixture<ResenaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResenaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
