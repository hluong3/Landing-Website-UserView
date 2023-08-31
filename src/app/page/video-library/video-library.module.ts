import { VideoPlayComponent } from "./video-play/video-play.component";
import { NgModule } from "@angular/core";
import { VideoLibraryComponent } from "./video-library.component";
import { RouterModule } from "@angular/router";
import { NgxLoadingModule } from "ngx-loading";
import { CommonModule } from "@angular/common";
import { VideoPlayerModule } from "src/app/video-player/video-player.module";
import { VideoListComponent } from "./video-list/video-list.component";
import { VideoPlayItemComponent } from "./video-play-item/video-play-item.component";
import { VideoDownloadSnackbarComponent } from "./video-download-snackbar/video-download-snackbar.component";
import { MaterialModule } from "src/app/material/material.module";
const routes = [
  {
    path: "",
    component: VideoLibraryComponent,
  },
  {
    path: "videos",
    component: VideoListComponent,
  },
  {
    path: "wm-videos",
    component: VideoListComponent,
  },
  {
    path: "videos/video-play",
    component: VideoPlayComponent,
  },
];
// video-library -> video-item -> video-list -> video-play-item -> video-play
@NgModule({
  declarations: [
    VideoLibraryComponent,
    VideoPlayComponent,
    VideoListComponent,
    VideoPlayItemComponent,
    VideoDownloadSnackbarComponent,
  ],
  imports: [
    CommonModule,
    VideoPlayerModule,
    MaterialModule,
    RouterModule.forChild(routes),
    NgxLoadingModule.forRoot({}),
  ],
  exports: [
    RouterModule,
    NgxLoadingModule,
    VideoLibraryComponent,
    VideoPlayComponent,
    VideoListComponent,
    VideoDownloadSnackbarComponent,
  ],
})
export class VideoLibraryModule {}
