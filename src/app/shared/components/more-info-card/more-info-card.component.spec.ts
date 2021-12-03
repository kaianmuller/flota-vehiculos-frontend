import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreInfoCardComponent } from './more-info-card.component';

describe('MoreInfoCardComponent', () => {
  let component: MoreInfoCardComponent;
  let fixture: ComponentFixture<MoreInfoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoreInfoCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
