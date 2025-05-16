import { Activity } from "./Activity";

export class DataProcessor {
  constructor() {
    this.data = [];
  }

  static processRawData(rawData) {
    const processed = [];
    const uniqueRelationships = {};
    const categories = new Set();
    const days = new Set();
    const validData = rawData.filter((item) => item["iso_date"] !== "");

    for (const item of validData) {
      const activity = new Activity(item);
      const activities = activity.isOvernight() ? activity.split() : [activity];

      for (const act of activities) {
        processed.push(act);
        act.company.forEach((c) => {
          if (c === "") c = "Sin compañia";
          if (!uniqueRelationships[c]) {
            uniqueRelationships[c] = act.duration;
          } else {
            uniqueRelationships[c] += act.duration;
          }
        });
        if (act.category) categories.add(act.category);
        if (act.date) days.add(act.date);
      }
    }
    let relationships = Object.entries(uniqueRelationships)
      .map(([key, value], index) => ({
        name: key,
        duration: value,
        id: "r" + index,
      }))
      .sort((a, b) => b.duration - a.duration);

    return { processed, relationships, categories, days };
  }
}
