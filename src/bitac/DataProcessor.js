import { Activity } from "./Activity";

export class DataProcessor {
  constructor() {
    this.data = [];
  }

  static processRawData(rawData) {
    const processed = [];
    const relationships = new Set();
    const categories = new Set();

    for (const item of rawData) {
      const activity = new Activity(item);
      const activities = activity.isOvernight() ? activity.split() : [activity];

      for (const act of activities) {
        processed.push(act);
        act.company.forEach((c) => c && relationships.add(c));
        if (act.category) categories.add(act.category);
      }
    }

    return { processed, relationships, categories };
  }
}
