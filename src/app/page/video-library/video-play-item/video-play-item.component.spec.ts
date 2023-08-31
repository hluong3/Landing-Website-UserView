import { ComponentFixture, TestBed } from "@angular/core/testing";

import { VideoPlayItemComponent } from "./video-play-item.component";

describe("VideoPlayItemComponent", () => {
  let component: VideoPlayItemComponent;
  let fixture: ComponentFixture<VideoPlayItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VideoPlayItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoPlayItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
