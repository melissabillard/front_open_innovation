import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoVacheComponent } from './info-vache.component';

describe('InfoVacheComponent', () => {
  let component: InfoVacheComponent;
  let fixture: ComponentFixture<InfoVacheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoVacheComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoVacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
