import { ComponentFixture, TestBed } from "@angular/core/testing";

import { VideoDownloadSnackbarComponent } from "./video-download-snackbar.component";

describe("VideoDownloadSnackbarComponent", () => {
  let component: VideoDownloadSnackbarComponent;
  let fixture: ComponentFixture<VideoDownloadSnackbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VideoDownloadSnackbarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoDownloadSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
