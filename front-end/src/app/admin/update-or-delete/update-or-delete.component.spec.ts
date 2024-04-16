import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateOrDeleteComponent } from './update-or-delete.component';

describe('UpdateOrDeleteComponent', () => {
  let component: UpdateOrDeleteComponent;
  let fixture: ComponentFixture<UpdateOrDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateOrDeleteComponent]
    });
    fixture = TestBed.createComponent(UpdateOrDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
