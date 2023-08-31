import { Component, OnInit } from "@angular/core";
import {
  Router,
  NavigationStart,
  Event as NavigationEvent,
  ActivatedRoute,
  NavigationEnd,
} from "@angular/router";
import AOS from "aos";
import { OktaAuthService } from "./services/app.service";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  showBackToTop = false;
  event$;
  path = "";
  pre = "";
  constructor(
    private router: Router,
    private _route: ActivatedRoute,
    public oktaAuth: OktaAuthService
  ) {
    this.path = localStorage.getItem("path") || "";
    this.pre = localStorage.getItem("pre") || "";
    this.event$ = this.router.events.subscribe((event: NavigationEvent) => {
      if (event instanceof NavigationEnd) {
        localStorage.setItem("path", event.url);
        if (event.url !== "/login") localStorage.setItem("pre", event.url);
        this.path = event.url;
      }
    });
  }

  ngOnInit() {
    //Animation on scroll
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }

  onScrollChange(event: any) {
    // console.log(event);
    if (!this.showBackToTop && event == "ShowBackToTop") {
      this.showBackToTop = true;
    }
  }

  scrollToTop(event: any) {
    if (event == "ScrollToTop") {
      document
        .querySelector("#app-container")
        .scrollTo({ top: 0, behavior: "smooth" });
    }
  }
}
