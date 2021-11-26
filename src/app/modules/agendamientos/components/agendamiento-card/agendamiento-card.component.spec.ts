import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendamientoCardComponent } from './agendamiento-card.component';

describe('AgendamientoCardComponent', () => {
  let component: AgendamientoCardComponent;
  let fixture: ComponentFixture<AgendamientoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgendamientoCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendamientoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
