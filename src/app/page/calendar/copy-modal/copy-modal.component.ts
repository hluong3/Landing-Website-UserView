import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Clipboard } from "@angular/cdk/clipboard";

@Component({
  selector: "app-copy-modal",
  templateUrl: "./copy-modal.component.html",
  styleUrls: ["./copy-modal.component.scss"],
})
export class CopyModalComponent implements OnInit {
  afterCopied: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _clipboard: Clipboard,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}
  handleCopy() {
    const pending = this._clipboard.beginCopy(this.data?.location || "");
    let remainingAttempts = 3;
    const attempt = async () => {
      const result = pending.copy();
      if (!result && --remainingAttempts) {
        setTimeout(attempt);
      } else {
        pending.destroy();
      }
    };
    attempt().then(() => {
      this.afterCopied = true;
      this._snackBar.open("The link is copied to clipboard", "Ok", {
        duration: 2000,
      });
    });
  }
}
