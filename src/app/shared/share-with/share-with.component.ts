import { IEvent } from "./../../models/event";
import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ShareViaEmailService } from "src/app/services/share-via-email.service";
import { createEvent } from "src/app/page/calendar/event-download";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-share-with",
  templateUrl: "./share-with.component.html",
  styleUrls: ["./share-with.component.scss"],
})
export class ShareWithComponent implements OnInit {
  shareForm: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    message: new FormControl("", [Validators.required]),
  });
  loading = false;
  constructor(
    private _shareViaEmailService: ShareViaEmailService,
    @Inject(MAT_DIALOG_DATA) public data: IEvent,
    private dialogRef: MatDialogRef<ShareWithComponent>,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}
  handleShare() {
    console.log(this.data);
    this.postShare();
  }
  postShare() {
    if (!this.shareForm.valid) {
      this._snackBar.open("Please fill all fields", "OK", {
        duration: 2000,
      });
      return;
    }
    this.loading = true;
    this._shareViaEmailService
      .postShareEmailEvent({
        to: this.shareForm.value.email,
        subject: this.data.title,
        content: this.shareForm.value.message,
        ics: this.createICS(this.data),
      })
      .subscribe((data) => {
        this.loading = false;
        this.dialogRef.close();
        this._snackBar.open("Email sent successfully", "OK", {
          duration: 2000,
        });
      });
  }
  createICS(event: IEvent) {
    return createEvent([
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
    ]);
  }
}
