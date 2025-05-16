import { DateTimeParser } from "./DateTimeParser";

export class Activity {
  constructor(item) {
    this.id = item["Consecutivo"];
    this.date = item["iso_date"];
    this.startTime = item["Hora Inicio"];
    this.endTime = item["Hora Fin"];
    this.category = item["Categoria"].toLowerCase();
    this.startTimeMinutes = DateTimeParser.convertToMinutes(
      item["Hora Inicio"]
    );
    this.endTimeMinutes = DateTimeParser.convertToMinutes(item["Hora Fin"]);
    this.duration = Number(item["Minutos"]);
    this.company = item["Compañia"].replace(/\s/g, "").split(",");
    this.sub_categories = {
      doom: Number(item["DOOM"]),
      leer: Number(item["LEER"]),
      podcast: Number(item["PODCAST"]),
    };
  }

  toRaw() {
    return {
      Consecutivo: this.id,
      iso_date: this.date,
      "Hora Inicio": this.startTime,
      "Hora Fin": this.endTime,
      Categoria: this.category,
      Minutos: this.duration,
      Compañia: this.company.join(","),
      DOOM: this.sub_categories.doom,
      LEER: this.sub_categories.leer,
      PODCAST: this.sub_categories.podcast,
    };
  }

  isOvernight() {
    return this.endTimeMinutes < this.startTimeMinutes;
  }

  split() {
    const durationFirstPart = 1440 - this.startTimeMinutes;
    const durationSecondPart = this.endTimeMinutes;
    const nextDay = DateTimeParser.nextDay(this.date);
    const firstDurationPercentage = (durationFirstPart / this.duration) * 100;
    const secondDurationPercentage = (durationSecondPart / this.duration) * 100;

    const splitSubElements = (percentage) => ({
      doom: Math.round((this.sub_categories.doom * percentage) / 100),
      leer: Math.round((this.sub_categories.leer * percentage) / 100),
      podcast: Math.round((this.sub_categories.podcast * percentage) / 100),
    });

    const firstPart = new Activity({
      ...this.toRaw(), // method below
      Consecutivo: `${this.id}-1`,
      "Hora Fin": "24:00",
      Minutos: durationFirstPart,
      DOOM: splitSubElements(firstDurationPercentage).doom,
      LEER: splitSubElements(firstDurationPercentage).leer,
      PODCAST: splitSubElements(firstDurationPercentage).podcast,
    });

    const secondPart = new Activity({
      ...this.toRaw(),
      Consecutivo: `${this.id}-2`,
      iso_date: nextDay,
      "Hora Inicio": "00:00",
      Minutos: durationSecondPart,
      DOOM: splitSubElements(secondDurationPercentage).doom,
      LEER: splitSubElements(secondDurationPercentage).leer,
      PODCAST: splitSubElements(secondDurationPercentage).podcast,
    });
    return [firstPart, secondPart];
  }
}
