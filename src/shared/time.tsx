export const time = (date = new Date()) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  const millSecond = date.getMilliseconds();

  const dateObj = {
    YYYY: year.toString().padStart(4, "0"),
    MM: month.toString().padStart(2, "0"),
    DD: day.toString().padStart(2, "0"),
    HH: hour.toString().padStart(2, "0"),
    mm: minute.toString().padStart(2, "0"),
    ss: second.toString().padStart(2, "0"),
    sss: millSecond.toString().padStart(3, "0"),
  };
  type DateKeys = "YYYY" | "MM" | "DD" | "HH" | "mm" | "ss" | "sss";

  const api = {
    formatAsString: (pattern = "YYYY-MM-DD-HH-mm-ss-sss") => {
      return pattern
        .replace("YYYY", dateObj.YYYY)
        .replace("MM", dateObj.MM)
        .replace("DD", dateObj.DD)
        .replace("HH", dateObj.HH)
        .replace("mm", dateObj.mm)
        .replace("ss", dateObj.ss)
        .replace("sss", dateObj.sss);
    },
    formatAsArray: (
      pattern: DateKeys[] = ["YYYY", "MM", "DD", "HH", "mm", "ss", "sss"],
    ) => {
      return pattern.map(item => dateObj[item]);
    },
  };
  return api;
};
