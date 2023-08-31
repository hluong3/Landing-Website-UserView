import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PageNotFoundComponent } from "./page-not-found.component";
import { RouterModule } from "@angular/router";
import { NgxLoadingModule } from "ngx-loading";

const routes = [
  {
    path: "",
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), NgxLoadingModule.forRoot({})],
  exports: [RouterModule, NgxLoadingModule],
})
export class PageNotFoundModule {}
