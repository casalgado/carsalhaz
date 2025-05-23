import { Activity } from "./Activity";
import { categoryMetadata } from "./categoryMetadata";

const onlyLocations = false; // Set to true to show only locations

export class DataProcessor {
  constructor() {
    this.data = [];
  }

  static processRawData(rawData) {
    const processed = [];
    const uniqueRelationships = {};
    const uniqueCategories = new Set();
    const days = new Set();
    const validData = rawData.filter((item) => item["iso_date"] !== "");

    let prevCategory;
    for (const item of validData) {
      const activity = new Activity(item);
      const activities = activity.isOvernight() ? activity.split() : [activity];

      for (const act of activities) {
        if (prevCategory && !categoryMetadata[act.category].isLocation) {
          if (onlyLocations) {
            act.setCategory(prevCategory);
          }
          act.location = prevCategory;
        }
        prevCategory = act.category;

        processed.push(act);
        act.company.forEach((c) => {
          if (!uniqueRelationships[c]) {
            uniqueRelationships[c] = act.duration;
          } else {
            uniqueRelationships[c] += act.duration;
          }
        });
        if (act.category)
          uniqueCategories.add(act.category.trim().toLowerCase());
        if (act.date) days.add(act.date);
      }
    }
    console.log("unique categories", uniqueCategories);
    let relationships = Object.entries(uniqueRelationships)
      .map(([key, value], index) => ({
        name: key,
        duration: value,
        id: "r" + index,
      }))
      .sort((a, b) => b.duration - a.duration);

    let categories = Array.from(uniqueCategories)
      .map((cat, index) => ({
        name: cat,
        id: "c" + index,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));

    let subcategories = [
      { name: "doom", id: "sc0" },
      { name: "leer", id: "sc1" },
      { name: "podcast", id: "sc2" },
    ];

    return { processed, relationships, categories, days, subcategories };
  }
}
