import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TrainingEventTableComponent } from "./training-event-table.component";

describe("TrainingEventTableComponent", () => {
  let component: TrainingEventTableComponent;
  let fixture: ComponentFixture<TrainingEventTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrainingEventTableComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingEventTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
