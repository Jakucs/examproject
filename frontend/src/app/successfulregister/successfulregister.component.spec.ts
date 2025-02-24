import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessfulregisterComponent } from './successfulregister.component';

describe('SuccessfulregisterComponent', () => {
  let component: SuccessfulregisterComponent;
  let fixture: ComponentFixture<SuccessfulregisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuccessfulregisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessfulregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
