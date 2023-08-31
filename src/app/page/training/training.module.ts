import { MaterialModule } from "src/app/material/material.module";
import { NgModule } from "@angular/core";
import { TrainingComponent } from "./training.component";
import { RouterModule } from "@angular/router";
import { NgxLoadingModule } from "ngx-loading";
import { TrainingListComponent } from "./training-list/training-list.component";
import { TrainingEventTableComponent } from "./training-event-table/training-event-table.component";
import { TrainingOfferingComponent } from "./training-offering/training-offering.component";
import { TrainingCalendarComponent } from "./training-calendar/training-calendar.component";
import { FullCalendarModule } from "@fullcalendar/angular";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import momentTimezonePlugin from "@fullcalendar/moment-timezone";
import { CommonModule } from "@angular/common";
import { ConvertTimeZonePipe } from "src/app/pipe/convert-time-zone.pipe";
import { TrainingOfferingTableComponent } from "./training-offering-table/training-offering-table.component";
import { SharedModule } from "src/app/shared/shared.module";

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin,
  momentTimezonePlugin,
]);

const routes = [
  {
    path: "",
    component: TrainingComponent,
  },
  {
    path: "training-list",
    component: TrainingListComponent,
  },
  {
    path: "event-table-view",
    component: TrainingEventTableComponent,
  },
  {
    path: "offering-event-view",
    component: TrainingOfferingComponent,
  },
  {
    path: "event-calendar-view",
    component: TrainingCalendarComponent,
  },
  {
    path: "offering-event-view/offering/:id",
    component: TrainingOfferingTableComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FullCalendarModule,
    MaterialModule,
    SharedModule,
    RouterModule.forChild(routes),
    NgxLoadingModule.forRoot({}),
  ],
  exports: [RouterModule],
  declarations: [
    TrainingListComponent,
    TrainingEventTableComponent,
    TrainingOfferingComponent,
    TrainingCalendarComponent,
    TrainingOfferingTableComponent,
  ],
  providers: [ConvertTimeZonePipe],
})
export class TrainingModule {}
