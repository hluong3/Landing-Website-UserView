import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventInput,
  FullCalendarComponent,
} from "@fullcalendar/angular";
import { IEvent } from "src/app/models/event";
import { TrainingService } from "src/app/services/training.service";
import {
  INITIAL_EVENTS,
  transferListEventApi,
} from "../../calendar/event-utils";
import * as moment from "moment";
import { ShareService } from "src/app/services/share.service";
import tippy from "tippy.js";
@Component({
  selector: "app-training-calendar",
  templateUrl: "./training-calendar.component.html",
  styleUrls: ["./training-calendar.component.scss"],
})
export class TrainingCalendarComponent implements OnInit {
  calendarOptions: CalendarOptions = {
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
    customButtons: {
      next: {
        click: this.handleGetNextDataCalendar.bind(this),
      },
      prev: {
        click: this.handleGetPrevDataCalendar.bind(this),
      },
      today: {
        text: "Today",
        click: this.handleGetTodayDataCalendar.bind(this),
      },
    },
    eventDidMount: this.renderTooltip.bind(this),
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };
  month = 0;
  year = 0;
  events: IEvent[] = [];
  calendarEvents: EventInput[] = INITIAL_EVENTS;
  type = "Training Calendar";
  calendarApi = null;
  timeZone = localStorage.getItem("applyTimeZone") || moment.tz.guess();
  @ViewChild("calendar") calendarComponent: FullCalendarComponent;
  constructor(
    private _route: Router,
    private _trainingCalendarService: TrainingService,
    private _shareService: ShareService
  ) {
    this.calendarOptions.timeZone = this.timeZone;
  }

  ngOnInit(): void {
    const date = new Date();
    this.month = date.getMonth() + 1;
    this.year = date.getFullYear();
    this.getData();
    this._shareService.timeZoneSelected.subscribe((timeZone: string) => {
      this.timeZone = timeZone;
      this.calendarOptions.timeZone = this.timeZone;
      this.calendarOptions.events = transferListEventApi(this.events);
    });
  }
  getData(month = this.month, year = this.year) {
    this._trainingCalendarService
      .getTrainingCalendar(month, year)
      .subscribe((data) => {
        const newEvent = data.filter(
          (item) => this.events.findIndex((e) => e._id === item._id) === -1
        );
        this.events.push(...newEvent);
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
  handleGetNextDataCalendar() {
    this.calendarApi = this.calendarComponent.getApi();
    this.calendarApi.next();
    const date = this.calendarApi.view.currentStart;
    this.getData(date.getMonth() + 1, date.getFullYear());
  }
  handleGetPrevDataCalendar() {
    this.calendarApi = this.calendarComponent.getApi();
    this.calendarApi.prev();
    const date = this.calendarApi.view.currentStart;
    this.getData(date.getMonth() + 1, date.getFullYear());
  }
  handleGetTodayDataCalendar() {
    this.calendarApi = this.calendarComponent.getApi();
    this.calendarApi.today();
    const date = this.calendarApi.view.currentStart;
    this.getData(date.getMonth() + 1, date.getFullYear());
  }
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

  handleEvents(events: EventInput[]) {
    this.calendarEvents = events;
  }
  renderTooltip(info) {
    tippy(info.el, {
      content: info.event.extendedProps.description,
      placement: "bottom-start",
      theme: "light",
    });
  }
}
