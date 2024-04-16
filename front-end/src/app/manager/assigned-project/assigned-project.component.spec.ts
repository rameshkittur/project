import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedProjectComponent } from './assigned-project.component';

describe('AssignedProjectComponent', () => {
  let component: AssignedProjectComponent;
  let fixture: ComponentFixture<AssignedProjectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignedProjectComponent]
    });
    fixture = TestBed.createComponent(AssignedProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
