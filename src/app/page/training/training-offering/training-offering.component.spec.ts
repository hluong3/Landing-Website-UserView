import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TrainingOfferingComponent } from "./training-offering.component";

describe("TrainingOfferingComponent", () => {
  let component: TrainingOfferingComponent;
  let fixture: ComponentFixture<TrainingOfferingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrainingOfferingComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingOfferingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
