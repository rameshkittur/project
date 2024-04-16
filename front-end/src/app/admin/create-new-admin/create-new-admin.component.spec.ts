import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewAdminComponent } from './create-new-admin.component';

describe('CreateNewAdminComponent', () => {
  let component: CreateNewAdminComponent;
  let fixture: ComponentFixture<CreateNewAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateNewAdminComponent]
    });
    fixture = TestBed.createComponent(CreateNewAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
