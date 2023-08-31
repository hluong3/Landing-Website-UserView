import { CopyModalComponent } from "./../copy-modal/copy-modal.component";
import { sortListByDate } from "./../event-utils";
import { IEvent } from "src/app/models/event";
import { Component, OnInit, AfterViewInit } from "@angular/core";
import { CalendarService } from "src/app/services/calendar.service";
import { createEvent, download } from "../event-download";
import { ActivatedRoute } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { ShareService } from "src/app/services/share.service";
import { ShareWithComponent } from "src/app/shared/share-with/share-with.component";
import * as moment from "moment";
import "moment-precise-range-plugin";
declare module "moment" {
  function preciseDiff(
    start: string | Date | moment.Moment,
    end: string | Date | moment.Moment,
    convertToObject?: boolean
  ): any;
}
@Component({
  selector: "app-calendar-event-list",
  templateUrl: "./calendar-event-list.component.html",
  styleUrls: ["./calendar-event-list.component.scss"],
})
export class CalendarEventListComponent implements OnInit {
  id: string = "";
  type: string = "";
  month: string = "";
  year: string = "";
  events: IEvent[] = [];
  order = {
    by: "start",
    direction: "desc",
  };
  title: string = "";
  loading: boolean = false;
  constructor(
    private _route: ActivatedRoute,
    private _calendarService: CalendarService,
    private _matDialog: MatDialog,
    private _shareService: ShareService
  ) {}

  ngOnInit(): void {
    //Listening time zone change
    this._shareService.timeZoneSelected.subscribe((timeZone: String) => {
      // console.log('Change time zone: '+timeZone);
      this.getData();
    });

    this._route.queryParamMap.subscribe((params) => {
      this.id = params.get("id");
      this.type = params.get("type");
      this.month = params.get("month");
      this.year = params.get("year");

      this.getData();
    });
  }

  getData() {
    this.loading = true;
    if (this.id && this.type) {
      this.title = this.type === "region" ? "Regional Event" : "Category Event";
      this._calendarService.getCalendarByType(this.type, this.id).subscribe(
        (data) => {
          this.events = sortListByDate(
            data,
            this.order.by,
            this.order.direction
          );
          this.loading = false;
        },
        (error) => console.log(error)
      );
    } else if (this.month && this.year) {
      this.title = "Event View";
      this._calendarService.getCalendarByMonth(this.month, this.year).subscribe(
        (data) => {
          this.events = sortListByDate(
            data,
            this.order.by,
            this.order.direction
          );
          this.loading = false;
        },
        (error) => console.log(error)
      );
    } else {
      this.title = "All Events List";
      this._calendarService.getCalendarList().subscribe(
        (data) => {
          this.events = sortListByDate(
            data,
            this.order.by,
            this.order.direction
          );
          this.loading = false;
        },
        (error) => console.log(error)
      );
    }
  }

  handleICSDownload(event: IEvent) {
    download(
      `${event.title || event.id}.ics`,
      createEvent([
        {
          start: new Date(event.startTime),
          end: new Date(event.endTime),
          summary: event.title,
          description: event.title,
          location:
            event.locationType === "Online"
              ? ""
              : event.geographicalLocationId?.address,
          url: event.location || "",
        },
      ])
    );
  }

  getDistanceTime(event: IEvent) {
    const start = new Date(event.startTime);
    const end = new Date(event.endTime);
    return moment.preciseDiff(start, end);
  }
  sortBy(field: string) {
    this.order.by = field;
    this.order.direction = this.order.direction === "asc" ? "desc" : "asc";
    this.events = sortListByDate(
      this.events,
      this.order.by,
      this.order.direction
    );
    this.loading = false;
  }
  copyAchievements(event: IEvent) {
    const copyModal = this._matDialog.open(CopyModalComponent, {
      data: event,
      width: "max(50vw, 400px)",
    });
  }
  handleShareWithEmail(event: IEvent) {
    this._matDialog.open(ShareWithComponent, {
      data: event,
    });
  }
  isPast(dateToCheck: Date) {
    const timeZone = localStorage.getItem("applyTimeZone") || moment.tz.guess();
    const date = moment(dateToCheck).tz(timeZone);
    return moment().tz(timeZone).diff(date) <= 0;
  }
}
