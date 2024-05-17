import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WheyProteinsComponent } from './whey-proteins.component';

describe('WheyProteinsComponent', () => {
  let component: WheyProteinsComponent;
  let fixture: ComponentFixture<WheyProteinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WheyProteinsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WheyProteinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
