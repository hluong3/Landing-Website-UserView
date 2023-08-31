import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { ShareService } from "src/app/services/share.service";
import { IEvent } from "src/app/models/event";
import { sortListByDate } from "../../calendar/event-utils";
import { createEvent, download } from "../../calendar/event-download";
import { CopyModalComponent } from "../../calendar/copy-modal/copy-modal.component";
import { TrainingService } from "src/app/services/training.service";
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
  selector: "app-training-offering-table",
  templateUrl: "./training-offering-table.component.html",
  styleUrls: ["./training-offering-table.component.scss"],
})
export class TrainingOfferingTableComponent implements OnInit {
  id: string = "";
  type: string = "";
  events: IEvent[] = [];
  order = {
    by: "start",
    direction: "desc",
  };
  title: string = "";
  loading: boolean = false;
  constructor(
    private _route: ActivatedRoute,
    private _trainingService: TrainingService,
    private _shareService: ShareService,
    private _matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    //Listening time zone change
    this._shareService.timeZoneSelected.subscribe((timeZone: String) => {
      // console.log('Change time zone: '+timeZone);
      this.getData();
    });

    this.id = this._route.snapshot.paramMap.get("id");
    this.getData();
  }

  getData() {
    this.loading = true;
    this._trainingService.getOfferingEvents(this.id).subscribe((data) => {
      this.events = sortListByDate(data, this.order.by, this.order.direction);
      this.loading = false;
    });
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
    return (
      moment()
        .tz(localStorage.getItem("applyTimeZone") || moment.tz.guess())
        .diff(dateToCheck) <= 0
    );
  }
}
