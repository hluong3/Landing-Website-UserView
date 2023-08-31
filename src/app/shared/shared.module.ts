import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "./../material/material.module";
import { ConvertTimeZonePipe } from "./../pipe/convert-time-zone.pipe";
import { NgModule } from "@angular/core";
import { ShareWithComponent } from "./share-with/share-with.component";
import { CommonModule } from "@angular/common";
import { NgxLoadingModule } from "ngx-loading";
import { ShareVideoComponent } from "./share-video/share-video.component";

@NgModule({
  declarations: [ConvertTimeZonePipe, ShareWithComponent, ShareVideoComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxLoadingModule.forRoot({}),
  ],
  exports: [ConvertTimeZonePipe, ShareWithComponent],
})
export class SharedModule {}
