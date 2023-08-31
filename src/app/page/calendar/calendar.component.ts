import { ShareService } from "./../../services/share.service";
import { IEvent } from "./../../models/event";
import { Component, OnInit, ViewChild } from "@angular/core";
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventApi,
  EventInput,
  FullCalendarComponent,
} from "@fullcalendar/angular";
import { CalendarService } from "src/app/services/calendar.service";
import { INITIAL_EVENTS, transferListEventApi } from "./event-utils";
import { MatDialog } from "@angular/material/dialog";
import { OptionModalComponent } from "./option-modal/option-modal.component";
import { ActivatedRoute, Router } from "@angular/router";
import * as moment from "moment";
import tippy from "tippy.js";
@Component({
  selector: "app-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.scss"],
})
export class CalendarComponent implements OnInit {
  annotations: any[] = [];
  events: IEvent[] = [];
  calendarEvents: EventInput[] = INITIAL_EVENTS;
  timeZone = "";
  @ViewChild("calendar") calendarComponent: FullCalendarComponent;
  constructor(
    private _calendarService: CalendarService,
    private _matDialog: MatDialog,
    private _route: Router,
    private _shareService: ShareService
  ) {
    this.timeZone = localStorage.getItem("applyTimeZone") || moment.tz.guess();
    this.calendarOptions.timeZone = this.timeZone;
  }

  ngOnInit(): void {
    this._calendarService.getAnotations().subscribe(
      (data) => {
        this.annotations = data;
      },
      (error) => console.log(error)
    );
    this._calendarService.getCalendarList().subscribe(
      (data) => {
        this.events = data;
        this.calendarOptions.events = transferListEventApi(this.events);
      },
      (error) => console.log(error)
    );
    this._shareService.timeZoneSelected.subscribe((timeZone: string) => {
      this.timeZone = timeZone;
      this.calendarOptions.timeZone = this.timeZone;
      this.calendarOptions.events = transferListEventApi(this.events);
    });
  }
  transform(date: any) {
    const format = "M/D/yyyy, h:mm A";
    let convertDate = moment(date);
    let applyTimeZone: any =
      localStorage.getItem("applyTimeZone") || moment.tz.guess();
    let convertTimeZone = convertDate.tz(applyTimeZone).format(format);
    return convertTimeZone;
  }
  calendarOptions: CalendarOptions = {
    // timeZone: this.timeZone,
    headerToolbar: {
      left: "prev next today",
      center: "title",
      right: "", //'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: "dayGridMonth",
    initialEvents: [], // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: false,
    selectable: false,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    eventDidMount: this.renderTooltip.bind(this),
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };
  currentEvents: EventApi[] = [];
  handleDateSelect(selectInfo: DateSelectArg) {
    // const title = prompt('Please enter a new title for your event');
    // const calendarApi = selectInfo.view.calendar;
    // calendarApi.unselect(); // clear date selection
    // if (title) {
    //   calendarApi.addEvent({
    //     id: createEventId(),
    //     title,
    //     start: selectInfo.startStr,
    //     end: selectInfo.endStr,
    //     allDay: selectInfo.allDay
    //   });
    // }
  }

  handleEventClick(clickInfo: EventClickArg) {
    // if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
    //   clickInfo.event.remove();
    // }
  }
  renderTooltip(info) {
    tippy(info.el, {
      content: info.event.extendedProps.description,
      placement: "bottom-start",
      theme: "light",
    });
  }

  handleEvents(events: EventInput[]) {
    this.calendarEvents = events;
  }

  handleGetDataCalendar() {
    const calendarApi = this.calendarComponent.getApi();
    const date = calendarApi.view.currentStart;
    let month = date.getMonth() + 1;
    if (date.getDate() !== 1) month = month + 1;
    const year = date.getFullYear();
    this._route.navigate(["calendar/event-list"], {
      queryParams: {
        month: month,
        year: year,
      },
    });
  }
  openSelecteCategories() {
    const optionModal = this._matDialog.open(OptionModalComponent, {
      data: {
        title: "Select categories",
        type: "category",
        categories: this.annotations,
      },
      width: "500px",
    });
    optionModal.afterClosed().subscribe((data) => {
      if (!data) return;
      this._route.navigate(["calendar/event-list"], {
        queryParams: {
          id: data,
          type: "category",
        },
      });
    });
  }
  openSelecteRegions() {
    this._calendarService.getRegions().subscribe(
      (data) => {
        const optionModal = this._matDialog.open(OptionModalComponent, {
          data: {
            title: "Select regions",
            type: "region",
            categories: data,
          },
          width: "500px",
        });
        optionModal.afterClosed().subscribe((data) => {
          if (!data) return;
          this._route.navigate(["calendar/event-list"], {
            queryParams: {
              id: data,
              type: "region",
            },
          });
        });
      },
      (error) => console.log(error)
    );
  }
}
