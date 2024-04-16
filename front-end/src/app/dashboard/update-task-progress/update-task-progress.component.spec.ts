import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTaskProgressComponent } from './update-task-progress.component';

describe('UpdateTaskProgressComponent', () => {
  let component: UpdateTaskProgressComponent;
  let fixture: ComponentFixture<UpdateTaskProgressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateTaskProgressComponent]
    });
    fixture = TestBed.createComponent(UpdateTaskProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
