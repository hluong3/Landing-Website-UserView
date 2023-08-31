import { Pipe, PipeTransform } from "@angular/core";
import * as moment from "moment";

@Pipe({
  name: "convertTimeZone",
})
export class ConvertTimeZonePipe implements PipeTransform {
  transform(date: any, format: string) {
    let convertDate = moment(date);
    let applyTimeZone: any =
      localStorage.getItem("applyTimeZone") || moment.tz.guess();
    let convertTimeZone = convertDate.tz(applyTimeZone).format(format);
    return convertTimeZone;
  }
}
