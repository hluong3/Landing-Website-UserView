import { IVideoItem } from "src/app/models/video-item";
import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ShareViaEmailService } from "src/app/services/share-via-email.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ShareWithComponent } from "../share-with/share-with.component";

@Component({
  selector: "app-share-video",
  templateUrl: "./share-video.component.html",
  styleUrls: ["./share-video.component.scss"],
})
export class ShareVideoComponent implements OnInit {
  shareForm: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    message: new FormControl("", [Validators.required]),
  });
  loading = false;
  constructor(
    private _shareViaEmailService: ShareViaEmailService,
    @Inject(MAT_DIALOG_DATA) public data: any,
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
      .postShareEmailVideo({
        to: this.shareForm.value.email,
        subject: this.data.name,
        content: this.shareForm.value.message,
        link: this.data.link,
      })
      .subscribe((data) => {
        this.loading = false;
        this.dialogRef.close();
        this._snackBar.open("Email sent successfully", "OK", {
          duration: 2000,
        });
      });
  }
}
