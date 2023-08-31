import { MaterialModule } from "./../../material/material.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CalendarComponent } from "./calendar.component";
import { FullCalendarModule } from "@fullcalendar/angular";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import momentTimezonePlugin from "@fullcalendar/moment-timezone";
import { NgxLoadingModule } from "ngx-loading";
import { RouterModule } from "@angular/router";
import { CalendarEventListComponent } from "./calendar-event-list/calendar-event-list.component";
import { ClickedOutsideDirective } from "src/app/directive/clicked-outside.directive";
import { OptionModalComponent } from "./option-modal/option-modal.component";
import { CopyModalComponent } from "./copy-modal/copy-modal.component";
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
    component: CalendarComponent,
  },
  {
    path: "event-list",
    component: CalendarEventListComponent,
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
  declarations: [
    CalendarComponent,
    CalendarEventListComponent,
    ClickedOutsideDirective,
    OptionModalComponent,
    CopyModalComponent,
  ],
  exports: [
    RouterModule,
    NgxLoadingModule,
    FullCalendarModule,
    CopyModalComponent,
  ],
})
export class CalendarModule {}
