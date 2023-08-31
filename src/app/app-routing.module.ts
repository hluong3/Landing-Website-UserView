import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { OktaAuthGuard } from "./guard/app.guard";

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  {
    path: "login",
    loadChildren: () => import("./auth/auth.module").then((m) => m.AuthModule),
  },
  {
    path: "home",
    loadChildren: () =>
      import("./page/home/home.module").then((m) => m.HomeModule),
    canActivate: [OktaAuthGuard],
  },
  {
    path: "offering",
    loadChildren: () =>
      import("./page/offering/offering.module").then((m) => m.OfferingModule),
    canActivate: [OktaAuthGuard],
  },
  // {
  //   path: "login",
  //   loadChildren: () =>
  //     import("./page/welcome/welcome.module").then((m) => m.WelcomeModule),
  // },
  {
    path: "calendar",
    loadChildren: () =>
      import("./page/calendar/calendar.module").then((m) => m.CalendarModule),

    canActivate: [OktaAuthGuard],
  },
  {
    path: "training",
    loadChildren: () =>
      import("./page/training/training.module").then((m) => m.TrainingModule),
    canActivate: [OktaAuthGuard],
  },
  {
    path: "video-library",
    loadChildren: () =>
      import("./page/video-library/video-library.module").then(
        (m) => m.VideoLibraryModule
      ),
    canActivate: [OktaAuthGuard],
  },
  {
    path: "**",
    pathMatch: "full",
    loadChildren: () =>
      import("./page/page-not-found/page-not-found.module").then(
        (m) => m.PageNotFoundModule
      ),
    canActivate: [OktaAuthGuard],
  },
];

const isIframe = window !== window.parent && !window.opener;

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: false,
      // Don't perform initial navigation in iframes
      initialNavigation: !isIframe ? "enabled" : "disabled",
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  providers: [],
  exports: [RouterModule],
})
export class AppRoutingModule {}
