import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MestreAcaoComponent } from './mestre-acao.component';

describe('MestreAcaoComponent', () => {
  let component: MestreAcaoComponent;
  let fixture: ComponentFixture<MestreAcaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MestreAcaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MestreAcaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
