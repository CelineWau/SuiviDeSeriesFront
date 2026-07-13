import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SerieItem } from './serie-item';

describe('SerieItem', () => {
  let component: SerieItem;
  let fixture: ComponentFixture<SerieItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SerieItem],
    }).compileComponents();

    fixture = TestBed.createComponent(SerieItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
