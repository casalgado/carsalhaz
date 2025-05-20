export class DateTimeParser {
  // time string is in the format "HH:MM"
  static convertToMinutes(timeString) {
    const [h, m] = timeString.split(":").map(Number);
    return h * 60 + m;
  }

  static convertToTimeString(minutes) {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  }

  static nextDay(iso_date) {
    const date = new Date(iso_date);
    date.setDate(date.getDate() + 1);
    return date.toISOString().split("T")[0];
  }

  static getWeekday(iso_date) {
    const day = new Date(iso_date).toLocaleDateString("en-US", {
      timeZone: "UTC",
      weekday: "long",
    });

    return day;
  }
}
