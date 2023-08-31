import { VideoDownloadSnackbarComponent } from "./../../video-library/video-download-snackbar/video-download-snackbar.component";
import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { OfferingService } from "src/app/services/offering.service";
import { environment } from "src/environments/environment";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";
import { ShareVideoComponent } from "src/app/shared/share-video/share-video.component";
import { Location } from "@angular/common";
@Component({
  selector: "app-presentation",
  templateUrl: "./presentation.component.html",
  styleUrls: ["./presentation.component.scss"],
})
export class PresentationComponent implements OnInit {
  API_URL = environment.API_URL;
  id: string = "";
  preId: string = "";
  list: any;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _sanitizer: DomSanitizer,
    private _offeringservice: OfferingService,
    private _matDialog: MatDialog,
    private _location: Location
  ) {
    this.id = this._route.snapshot.paramMap.get("listId");
    this.preId = this._route.snapshot.paramMap.get("id");
    this._offeringservice.getOfferingMenuList(this.id).subscribe(
      (data) => {
        this.list = data;
      },
      (error) => console.log(error)
    );
  }

  ngOnInit(): void {}
  trustImage(thumbnail: string) {
    return this._sanitizer.bypassSecurityTrustResourceUrl(
      thumbnail ? this.API_URL + "/attachment?filename=" + thumbnail : ""
    );
  }
  trustLink(link: string) {
    return this._sanitizer.bypassSecurityTrustResourceUrl(link);
  }
  openMenu(item: any) {
    this.list.forEach((item) => (item.isSelected = false));
    item.isSelected = true;
  }
  trustDownload(item: any) {
    try {
      const filename = item.link;
      const name = filename.split("=")[1];
      return this._sanitizer.bypassSecurityTrustResourceUrl(
        this.API_URL + "/attachment/download?filename=" + name
      );
    } catch (error) {
      console.log(error);
    }
  }
  trustOpenNewTabLink(item: any) {
    try {
      if (item.type === "File") {
        const filename = item.link;
        const name = filename.split("=")[1];
        return this._sanitizer.bypassSecurityTrustResourceUrl(
          this.API_URL + "/attachment?filename=" + name
        );
      } else {
        return this._sanitizer.bypassSecurityTrustResourceUrl(item.link);
      }
    } catch (error) {
      console.log(error);
    }
  }
  handleOpenPresentation(item: any) {
    if (item.type === "Video") {
      this._router.navigate(["offering", this.preId, this.id, "file"], {
        queryParams: {
          link: item.link,
        },
      });
    } else if (item.type === "File") {
      this._router.navigate(["offering", this.preId, this.id, "document"], {
        queryParams: {
          filename: item.link.split("=")[1],
          type: item.ext,
        },
      });
    }
  }
  handleShareWithVideo(item: any) {
    let linkVideo = "";
    if (item.type === "Video") {
      linkVideo =
        window.location.protocol +
        "//" +
        window.location.host +
        this._location.path().split("?")[0] +
        `/file?link=${encodeURIComponent(item.link)}`;
    } else if (item.type === "File") {
      switch (item.ext) {
        case "pdf":
          linkVideo =
            this.API_URL + "/attachment?filename=" + item.link.split("=")[1];
          break;
        case "pptx":
          linkVideo =
            window.location.protocol +
            "//" +
            window.location.host +
            this._location.path().split("?")[0] +
            `/document?filename=${item.link.split("=")[1]}&type=${item.ext}`;
          break;
        default:
          linkVideo =
            this.API_URL +
            "/attachment/download?filename=" +
            item.link.split("=")[1];
          break;
      }
    } else {
      linkVideo = item.link;
    }
    this._matDialog.open(ShareVideoComponent, {
      data: {
        name: item.name,
        link: linkVideo,
      },
    });
  }
}
