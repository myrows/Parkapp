import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersListadoComponent } from './users-listado.component';

describe('UsersListadoComponent', () => {
  let component: UsersListadoComponent;
  let fixture: ComponentFixture<UsersListadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersListadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
