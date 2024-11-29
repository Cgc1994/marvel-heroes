import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpansionFormComponent } from './expansion-form.component';

describe('ExpansionFormComponent', () => {
  let component: ExpansionFormComponent;
  let fixture: ComponentFixture<ExpansionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpansionFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpansionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
