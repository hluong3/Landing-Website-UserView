import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { WelcomeComponent } from "./welcome.component";
import { NgxLoadingModule } from "ngx-loading";
const routes: Routes = [
  {
    path: "",
    component: WelcomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), NgxLoadingModule.forRoot({})],
  exports: [RouterModule, NgxLoadingModule],
})
export class WelcomeModule {}
