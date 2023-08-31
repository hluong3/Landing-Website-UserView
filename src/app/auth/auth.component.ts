import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { OktaAuthService } from "../services/app.service";

@Component({
  selector: "app-root",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.scss"],
})
export class AuthComponent implements OnInit {
  isAuthenticated: boolean = false;
  constructor(public oktaAuth: OktaAuthService, private router: Router) {}

  ngOnInit(): void {
    this.oktaAuth.$isAuthenticated.subscribe((val) => {
      console.log("Login", val);
      this.isAuthenticated = val;
    });
  }
  ngAfterViewInit(): void {
    // if(this.isAuthenticated)  {
    //   const current = localStorage.getItem("pre");
    //   this.router.navigate([current !== "/login" ? current : "/home"]);
    // }
  }
}
