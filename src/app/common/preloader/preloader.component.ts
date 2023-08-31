import { AfterViewInit, Component, OnInit } from "@angular/core";

@Component({
  selector: "app-preloader",
  templateUrl: "./preloader.component.html",
  styleUrls: ["./preloader.component.scss"],
})
export class PreloaderComponent implements OnInit {
  showPreloader = true;

  constructor() {}

  ngOnInit(): void {
    setTimeout(() => {
      this.showPreloader = false;
    }, 500);
  }
}
