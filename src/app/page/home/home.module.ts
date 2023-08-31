import { NgModule } from "@angular/core";
import { HomeComponent } from "./home.component";
import { RouterModule } from "@angular/router";
import { NgxLoadingModule } from "ngx-loading";

const routes = [
  {
    path: "",
    component: HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), NgxLoadingModule.forRoot({})],
  exports: [RouterModule, NgxLoadingModule],
})
export class HomeModule {}
