import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationMesssagesComponent } from './validation-messsages.component';

describe('ValidationMesssagesComponent', () => {
  let component: ValidationMesssagesComponent;
  let fixture: ComponentFixture<ValidationMesssagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ValidationMesssagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ValidationMesssagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
