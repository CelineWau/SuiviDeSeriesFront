import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerSerie } from './creer-serie';

describe('CreerSerie', () => {
  let component: CreerSerie;
  let fixture: ComponentFixture<CreerSerie>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreerSerie],
    }).compileComponents();

    fixture = TestBed.createComponent(CreerSerie);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
