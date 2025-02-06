import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeradorBoletimComponent } from './gerador-boletim.component';

describe('GeradorBoletimComponent', () => {
  let component: GeradorBoletimComponent;
  let fixture: ComponentFixture<GeradorBoletimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GeradorBoletimComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeradorBoletimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
