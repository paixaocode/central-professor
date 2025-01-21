import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormIaComponent } from './form-ia.component';

describe('FormIaComponent', () => {
  let component: FormIaComponent;
  let fixture: ComponentFixture<FormIaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormIaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormIaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
