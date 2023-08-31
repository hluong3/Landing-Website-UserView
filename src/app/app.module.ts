import { PresentationComponent } from "./page/offering/presentation/presentation.component";
import { VideoLibraryModule } from "./page/video-library/video-library.module";
import { TrainingComponent } from "./page/training/training.component";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./common/header/header.component";
import { FooterComponent } from "./common/footer/footer.component";
import { HeroComponent } from "./page/home/section/hero/hero.component";
import { TeamComponent } from "./page/home/section/team/team.component";
import { ClientsComponent } from "./page/home/section/clients/clients.component";
import { HomeComponent } from "./page/home/home.component";
import { PreloaderComponent } from "./common/preloader/preloader.component";
import { ScrollSpyDirective } from "./directive/scroll-spy.directive";
import { BackToTopComponent } from "./common/back-to-top/back-to-top.component";
import { DocumentComponent } from "./page/document/document.component";
import { OfferingComponent } from "./page/offering/offering.component";
import { PageNotFoundComponent } from "./page/page-not-found/page-not-found.component";
import { HttpClientModule } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { VideoPlayerModule } from "./video-player/video-player.module";
import { MaterialModule } from "./material/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { WelcomeComponent } from "./page/welcome/welcome.component";
export class Setting {
  clientId!: string;
  tenantId!: string;
}

//dynamic setting
export function getSetting() {
  var request = new XMLHttpRequest();
  request.open("GET", "assets/setting/setting.json", false); // request application settings synchronous
  request.send(null);
  const response = JSON.parse(request.responseText);

  //overwrite environment value by Setting
  if (response["API_URL"] != "" || response["API_URL"] != undefined) {
    environment.API_URL = response["API_URL"];
  }
  if (response["API_SCOPE"] != "" || response["API_SCOPE"] != undefined) {
    environment.API_SCOPE = response["API_SCOPE"];
  }
  if (
    response["Ocp_Apim_Subscription_Key"] != "" ||
    response["Ocp_Apim_Subscription_Key"] != undefined
  ) {
    environment.Ocp_Apim_Subscription_Key =
      response["Ocp_Apim_Subscription_Key"];
  }
  if (response["CLIENT_ID"] != "" || response["CLIENT_ID"] != undefined) {
    environment.CLIENT_ID = response["CLIENT_ID"];
  }

  if (response["ISSUER"] != "" || response["ISSUER"] != undefined) {
    environment.ISSUER = response["ISSUER"];
  }

  if (
    response["LOGIN_REDIRECT_URI"] != "" ||
    response["LOGIN_REDIRECT_URI"] != undefined
  ) {
    environment.LOGIN_REDIRECT_URI = response["LOGIN_REDIRECT_URI"];
  }

  if (
    response["LOGOUT_REDIRECT_URI"] != "" ||
    response["LOGOUT_REDIRECT_URI"] != undefined
  ) {
    environment.LOGOUT_REDIRECT_URI = response["LOGOUT_REDIRECT_URI"];
  }

  return response as Setting;
}
const setting: Setting = getSetting();

//login authentication
const isIE =
  window.navigator.userAgent.indexOf("MSIE ") > -1 ||
  window.navigator.userAgent.indexOf("Trident/") > -1;

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HeroComponent,
    TeamComponent,
    ClientsComponent,
    HomeComponent,
    PreloaderComponent,
    ScrollSpyDirective,
    BackToTopComponent,
    DocumentComponent,
    OfferingComponent,
    TrainingComponent,
    PageNotFoundComponent,
    PresentationComponent,
    WelcomeComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    VideoPlayerModule,
    VideoLibraryModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
