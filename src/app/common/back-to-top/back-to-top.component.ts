import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-back-to-top",
  templateUrl: "./back-to-top.component.html",
  styleUrls: ["./back-to-top.component.scss"],
})
export class BackToTopComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  clickToTop() {
    console.log("Click To Top");

    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}
