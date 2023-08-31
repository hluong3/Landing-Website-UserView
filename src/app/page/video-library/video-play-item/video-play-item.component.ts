import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { VideoLibraryItem } from "../video-library.component";

@Component({
  selector: "app-video-play-item",
  templateUrl: "./video-play-item.component.html",
  styleUrls: ["./video-play-item.component.scss"],
})
export class VideoPlayItemComponent implements OnInit {
  @Input() video: VideoLibraryItem;
  @Output() clickMoreIcon: EventEmitter<any> = new EventEmitter();
  constructor(private _sanitizer: DomSanitizer) {}

  ngOnInit(): void {}
  emitClickMoreIcon() {
    this.clickMoreIcon.emit();
  }

  handlePlay(event: any) {}

  handleDownload(event: any) {
    console.log(event);
  }

  handleShare(event: any) {
    console.log(event);
  }
  closeModal() {}
  safeUrl(url: string) {
    return this._sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
