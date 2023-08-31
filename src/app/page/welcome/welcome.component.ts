import { Component, OnInit, Inject } from "@angular/core";
// import { MsalService, MSAL_GUARD_CONFIG, MsalGuardConfiguration, MsalBroadcastService } from '@azure/msal-angular';
// import { AuthenticationResult, InteractionStatus, InteractionType, PopupRequest, RedirectRequest, EventMessage, EventType } from '@azure/msal-browser';
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { filter, takeUntil, map } from "rxjs/operators";
// import { AuthenticationParameters } from 'msal';

@Component({
  selector: "app-welcome",
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.scss"],
})
export class WelcomeComponent implements OnInit {
  loggedIn = false;

  constructor(
    // @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    // private authService: MsalService,
    // private msalBroadcastService: MsalBroadcastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.msalBroadcastService.msalSubject$
    //   .pipe(
    //     filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS),
    //   )
    //   .subscribe((result) => {
    //     const payload = result.payload as AuthenticationResult;
    //     this.authService.instance.setActiveAccount(payload.account);
    //   });
    // this.setLoginAndRedirect();
  }

  login() {
    const current = localStorage.getItem("pre");
    this.router.navigate([current !== "/login" ? current : "/home"]);

    // if (this.msalGuardConfig.interactionType === InteractionType.Popup) {
    //   if (this.msalGuardConfig.authRequest) {
    //     this.authService.loginPopup({ ...this.msalGuardConfig.authRequest } as PopupRequest)
    //       .subscribe((response: AuthenticationResult) => {
    //         this.authService.instance.setActiveAccount(response.account);
    //       });
    //   } else {
    //     this.authService.loginPopup()
    //       .subscribe((response: AuthenticationResult) => {
    //         this.authService.instance.setActiveAccount(response.account);
    //       });
    //   }
    // } else {
    //   if (this.msalGuardConfig.authRequest) {
    //     this.authService.loginRedirect({ ...this.msalGuardConfig.authRequest } as RedirectRequest);
    //   } else {
    //     this.authService.loginRedirect();
    //   }
    // }
  }

  setLoginAndRedirect() {
    // let interval = setInterval(()=>{
    //   this.loggedIn = this.authService.instance.getAllAccounts().length > 0;
    //   // console.log(this.authService.instance.getAllAccounts());
    //   if (this.loggedIn) {
    //     // console.log("Navigate offering");
    //     this.router.navigate(['home']);
    //     clearInterval(interval);
    //   }
    //   // else {
    //   //   this.router.navigate(['']);
    //   // }
    // },1000);
  }
}
