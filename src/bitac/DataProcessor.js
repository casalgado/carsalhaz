import { Activity } from "./Activity";
import { categoryMetadata } from "./categoryMetadata";

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

    let prevLocation;
    for (const item of validData) {
      const activity = new Activity(item);
      const activities = activity.isOvernight() ? activity.split() : [activity];

      for (const act of activities) {
        // LOCATION INHERITANCE LOGIC
        // We inherit the previous activity's location in two specific cases:
        // 1. Non-location categories (like "worktime", "jrnl") should inherit location
        //    UNLESS they have "force_location" flag (which means use their own category)
        // 2. Location categories (like "vueltas", "tt", "gym") normally set their own location
        //    BUT if they have "skip_location" flag, they should inherit instead.

        if (
          prevLocation && // Only inherit if we have a previous location to inherit from
          // Case 1: Non-location category without force_location flag
          ((!categoryMetadata[act.category].isLocation &&
            !act.details.includes("force_location")) ||
            // Case 2: Location category with skip_location flag (override normal behavior)
            (categoryMetadata[act.category].isLocation &&
              act.details.includes("skip_location")))
        ) {
          act.location = prevLocation;
        }
        prevLocation = act.location;

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
