import { ComponentFixture, TestBed } from "@angular/core/testing";

import { VideoOfferingPlayComponent } from "./video-offering-play.component";

describe("VideoOfferingPlayComponent", () => {
  let component: VideoOfferingPlayComponent;
  let fixture: ComponentFixture<VideoOfferingPlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VideoOfferingPlayComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoOfferingPlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
