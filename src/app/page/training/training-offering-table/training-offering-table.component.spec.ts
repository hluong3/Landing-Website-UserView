import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TrainingOfferingTableComponent } from "./training-offering-table.component";

describe("TrainingOfferingTableComponent", () => {
  let component: TrainingOfferingTableComponent;
  let fixture: ComponentFixture<TrainingOfferingTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrainingOfferingTableComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingOfferingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
