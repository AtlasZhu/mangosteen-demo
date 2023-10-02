type DateKeys = "YYYY" | "MM" | "DD" | "HH" | "mm" | "ss" | "sss";
export class Time {
  date: Date;
  constructor(date = new Date()) {
    this.date = date;
  }
  getDateObj() {
    return {
      year: this.date.getFullYear(),
      month: this.date.getMonth() + 1,
      day: this.date.getDate(),
      hour: this.date.getHours(),
      minute: this.date.getMinutes(),
      second: this.date.getSeconds(),
      millSecond: this.date.getMilliseconds(),
    };
  }
  getDateStringObj() {
    const dateObj = this.getDateObj();
    return {
      YYYY: dateObj.year.toString().padStart(4, "0"),
      MM: dateObj.month.toString().padStart(2, "0"),
      DD: dateObj.day.toString().padStart(2, "0"),
      HH: dateObj.hour.toString().padStart(2, "0"),
      mm: dateObj.minute.toString().padStart(2, "0"),
      ss: dateObj.second.toString().padStart(2, "0"),
      sss: dateObj.millSecond.toString().padStart(3, "0"),
    };
  }
  formatAsString(pattern = "YYYY-MM-DD-HH-mm-ss-sss") {
    const dateStringObj = this.getDateStringObj();
    return pattern
      .replace("YYYY", dateStringObj.YYYY)
      .replace("MM", dateStringObj.MM)
      .replace("DD", dateStringObj.DD)
      .replace("HH", dateStringObj.HH)
      .replace("mm", dateStringObj.mm)
      .replace("ss", dateStringObj.ss)
      .replace("sss", dateStringObj.sss);
  }
  formatAsArray(pattern: DateKeys[] = ["YYYY", "MM", "DD", "HH", "mm", "ss", "sss"]) {
    const dateStringObj = this.getDateStringObj();
    return pattern.map(item => dateStringObj[item]);
  }

  firstDayOfMonth() {
    return new Time(new Date(this.date.getFullYear(), this.date.getMonth(), 1, 0, 0, 0));
  }
  firstDayOfYear() {
    return new Time(new Date(this.date.getFullYear(), 0, 1, 0, 0, 0));
  }
  lastDayOfMonth() {
    return new Time(new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0, 0, 0, 0));
  }
  lastDayOfYear() {
    return new Time(new Date(this.date.getFullYear() + 1, 0, 0, 0, 0, 0));
  }
  add(amount: number, unit: "year" | "month" | "day" | "hour" | "minute" | "second" | "millisecond") {
    let date = new Date(this.date.getTime());
    switch (unit) {
      case "year":
        date.setFullYear(date.getFullYear() + amount);
        break;
      case "month":
        const date1 = date.getDate();
        date.setDate(1);
        date.setMonth(date.getMonth() + amount);
        const date2 = new Date(date.getFullYear(), date.getMonth() + 1, 0, 0, 0, 0);
        date.setDate(Math.min(date1, date2.getDate()));
        break;
      case "day":
        date.setDate(date.getDate() + amount);
        break;
      case "hour":
        date.setHours(date.getHours() + amount);
        break;
      case "minute":
        date.setMinutes(date.getSeconds() + amount);
        break;
      case "second":
        date.setSeconds(date.getSeconds() + amount);
        break;
      case "millisecond":
        date.setMilliseconds(date.getMilliseconds() + amount);
        break;
      default:
        throw new Error("Time.add :unknown unit");
    }
    return new Time(date);
  }
}
