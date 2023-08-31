import { IVideoItem } from "./../models/video-item";
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild,
} from "@angular/core";
import { VideoJsOptions } from "src/app/models/videojs-options";
import CustomVideoJsComponent from "./custom-video-js-components";
import "./seek-plugin";
import "./notes-plugin";
import "./sprites-plugin";
import { videoJs } from "./videojs";
import videoJsOptions from "./basic-video-play-option";

@Component({
  selector: "app-video-player",
  templateUrl: "./video-player.component.html",
  styleUrls: ["./video-player.component.scss"],
})
export class VideoPlayerComponent implements OnDestroy, AfterViewInit {
  @ViewChild("target", { static: true })
  target!: ElementRef;
  @Input() options: VideoJsOptions = videoJsOptions;
  @Input() video: IVideoItem = null;
  player: any;

  constructor() {
    console.log(this.options);
  }

  ngAfterViewInit(): void {
    CustomVideoJsComponent.registerTitleComponent();
    CustomVideoJsComponent.registerCustomButton();
    this.player = videoJs(
      this.target.nativeElement,
      this.options,
      this.onPlayerReady.bind(this)
    );
    this.player.customSeekButtons({
      forward: 20,
      backward: 15,
      fwdBtnPosition: 1,
      bwdBtnPosition: 1,
      fwdBtnTooltip: `Seek 20 seconds forward`,
      bwdBtnTooltip: `Seek 15 seconds backward`,
    });
    this.player.notesButton({});
    // this.player.sprites({
    //   spritesUrl: 'https://storage.googleapis.com/hubert-raymond-webpage/The_Hustler(1961)-sprites-256x144.png'
    // });
  }

  onPlayerReady() {
    console.log("Player is ready.");
    this.player.addChild("TitleBar", { text: this.video.name });
    this.player.addChild("CustomButton");
  }

  ngOnDestroy(): void {
    if (this.player) {
      this.player.dispose();
    }
  }
}
