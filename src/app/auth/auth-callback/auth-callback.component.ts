import { Component, OnInit } from "@angular/core";
import { OktaAuthService } from "src/app/services/app.service";

@Component({
  selector: "app-auth-callback",
  templateUrl: "./auth-callback.component.html",
  styleUrls: ["./auth-callback.component.scss"],
})
export class AuthCallbackComponent implements OnInit {
  constructor(private okta: OktaAuthService) {}

  ngOnInit(): void {
    console.log("AuthCallbackComponent");
    // Handles the response from Okta and parses tokens
    this.okta.handleAuthentication();
  }
}
