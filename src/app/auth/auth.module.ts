import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthComponent } from "./auth.component";
import { AuthCallbackComponent } from "./auth-callback/auth-callback.component";
import { AuthProtectedComponent } from "./auth-protected/auth-protected.component";
import { OktaAuthGuard } from "../guard/app.guard";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../shared/shared.module";

const routes: Routes = [
  {
    path: "",
    component: AuthComponent,
  },
  {
    path: "callback",
    component: AuthCallbackComponent,
  },
  {
    path: "protected",
    component: AuthProtectedComponent,
    canActivate: [OktaAuthGuard],
  },
];

@NgModule({
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  declarations: [AuthComponent, AuthCallbackComponent, AuthProtectedComponent],
  exports: [RouterModule],
})
export class AuthModule {}
