import { VideoLibraryService } from "src/app/services/video-library.service";
import { Component, OnInit } from "@angular/core";
import { IVideoItem } from "src/app/models/video-item";
import { ActivatedRoute } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";
import { environment } from "src/environments/environment";
import { MatDialog } from "@angular/material/dialog";
import { ShareVideoComponent } from "src/app/shared/share-video/share-video.component";
import { Location } from "@angular/common";
@Component({
  selector: "app-video-list",
  templateUrl: "./video-list.component.html",
  styleUrls: ["./video-list.component.scss"],
})
export class VideoListComponent implements OnInit {
  videos: IVideoItem[] = [];
  filter = "";
  id = "";
  API_URL = environment.API_URL;
  constructor(
    private _videoLibraryService: VideoLibraryService,
    private _route: ActivatedRoute,
    private _sanitizer: DomSanitizer,
    private _matDialog: MatDialog,
    private _location: Location
  ) {
    this._route.queryParamMap.subscribe((params) => {
      this.filter = params.get("filter");
      this.id = params.get("id");
    });
  }

  ngOnInit(): void {
    if (this.filter === "mw") {
      this._videoLibraryService.getVideosList(this.id).subscribe((data) => {
        this.videos = data;
      });
    } else {
      this._videoLibraryService
        .getOfferingVideoList(this.id)
        .subscribe((data) => {
          this.videos = data;
        });
    }
  }
  trustImage(thumbnail: string) {
    return this._sanitizer.bypassSecurityTrustResourceUrl(
      thumbnail ? this.API_URL + "/attachment?filename=" + thumbnail : ""
    );
  }
  trustDownload(video: any) {
    try {
      const filename = this.filter === "mw" ? video.videoFile : video.link;
      const name = filename.split("=")[1];
      return this._sanitizer.bypassSecurityTrustResourceUrl(
        this.API_URL + "/attachment/download?filename=" + name
      );
    } catch (error) {
      console.log(error);
    }
  }
  handleShareWithVideo(video: IVideoItem) {
    let linkVideo = "";
    if (video.offeringId || video.fileStorageType === "Internal File") {
      linkVideo =
        window.location.protocol +
        "//" +
        window.location.host +
        this._location.path().split("?")[0] +
        `/video-play?link=${encodeURIComponent(video.link || video.videoFile)}`;
    } else {
      linkVideo = video.link || video.videoFile;
    }
    this._matDialog.open(ShareVideoComponent, {
      data: {
        name: video.name,
        link: linkVideo,
      },
    });
  }
}
