import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerLivre } from './creer-livre';

describe('CreerLivre', () => {
  let component: CreerLivre;
  let fixture: ComponentFixture<CreerLivre>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreerLivre],
    }).compileComponents();

    fixture = TestBed.createComponent(CreerLivre);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
