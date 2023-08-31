import { NgModule } from "@angular/core";
import { OfferingComponent } from "./offering.component";
import { RouterModule } from "@angular/router";
import { NgxLoadingModule } from "ngx-loading";
import { PresentationComponent } from "./presentation/presentation.component";
import { DocumentViewComponent } from "./document-view/document-view.component";
import { VideoOfferingPlayComponent } from "./video-offering-play/video-offering-play.component";
import { VideoPlayerModule } from "src/app/video-player/video-player.module";
const routes = [
  {
    path: ":id",
    component: OfferingComponent,
  },
  {
    path: ":id/:listId",
    component: PresentationComponent,
  },
  {
    path: ":id/:listId/file",
    component: VideoOfferingPlayComponent,
  },
  {
    path: ":id/:listId/document",
    component: DocumentViewComponent,
  },
];

@NgModule({
  imports: [
    VideoPlayerModule,
    RouterModule.forChild(routes),
    NgxLoadingModule.forRoot({}),
  ],
  exports: [RouterModule, NgxLoadingModule],
  declarations: [DocumentViewComponent, VideoOfferingPlayComponent],
})
export class OfferingModule {}
