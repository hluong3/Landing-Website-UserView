import { Component, Inject, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}
@Component({
  selector: "app-option-modal",
  templateUrl: "./option-modal.component.html",
  styleUrls: ["./option-modal.component.scss"],
})
export class OptionModalComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
  selected: string;
  ngOnInit(): void {
    this.selected = this.data?.categories[0]?._id || "";
  }
}
