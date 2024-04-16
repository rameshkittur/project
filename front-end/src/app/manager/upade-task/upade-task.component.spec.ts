import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpadeTaskComponent } from './upade-task.component';

describe('UpadeTaskComponent', () => {
  let component: UpadeTaskComponent;
  let fixture: ComponentFixture<UpadeTaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpadeTaskComponent]
    });
    fixture = TestBed.createComponent(UpadeTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
