import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import * as moment from "moment";
import "moment-timezone";
import { Observable } from "rxjs/internal/Observable";
import { map, startWith } from "rxjs/operators";
import { OktaAuthService } from "src/app/services/app.service";
import { ShareService } from "src/app/services/share.service";
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  mobileNav = false;
  @ViewChild("inputTimeZone") inputTimeZone!: ElementRef<HTMLInputElement>;
  timeZoneForm = new FormControl("");

  moment = moment;
  currentTimeZone = localStorage.getItem("applyTimeZone") || moment.tz.guess();
  setTimeZone = localStorage.getItem("applyTimeZone") || moment.tz.guess();
  timeZoneList = moment.tz.names();
  filteredOptions: Observable<string[]>;
  isAuthenticated: boolean = false;
  userName: string = "";
  constructor(
    public oktaAuth: OktaAuthService,
    private _shareService: ShareService
  ) {
    this.filteredOptions = this.timeZoneForm.valueChanges.pipe(
      startWith(""),
      map((value) => this._filter(value || ""))
    );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.timeZoneList.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  ngOnInit(): void {
    this.timeZoneForm.setValue(this.setTimeZone);
    this.oktaAuth.$isAuthenticated.subscribe((val) => {
      if(val){
        this.isAuthenticated = val;
        this.oktaAuth.oktaAuth.token.getUserInfo().then((res) => {
          // console.log(res);
          if(res.name != ''){
            this.userName = res.name;
          }else{
            this.userName = res.given_name + ' ' + res.family_name
          }
        });
      }
    });
  }

  onSelectOption(event: MatAutocompleteSelectedEvent) {
    this.timeZoneForm.setValue(event.option.value);
    this.currentTimeZone = event.option.value;
    this.setTimeZone = event.option.value;

    localStorage.setItem("applyTimeZone", event.option.value);
    // this.changeTimeZone.emit('Change Time Zone: '+this.setTimeZone);
    this._shareService.timeZoneSelected.emit(event.option.value);
    this.inputTimeZone.nativeElement.blur();
    // console.log(event.option.value);
  }

  onFocusInput() {
    // this.inputTimeZone.nativeElement.value = '';
    this.timeZoneForm.setValue("");
    this.setTimeZone = "";
  }

  onBlurInput() {
    setTimeout(() => {
      if (!this.timeZoneList.includes(this.timeZoneForm.value)) {
        this.timeZoneForm.setValue(this.currentTimeZone);
        this.setTimeZone = this.currentTimeZone;
      }
    }, 200);
  }

  clickMobileNavToggle(event: any) {
    // console.log("Mobile Nav Toggle");
    this.mobileNav = !this.mobileNav;
  }
}
