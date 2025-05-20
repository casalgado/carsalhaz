import { DateTimeParser } from "./DateTimeParser";
import { categoryStyles } from "./config";

export class Activity {
  constructor(item) {
    this.id = item["Consecutivo"];
    this.date = item["iso_date"];
    this.startTime = item["Hora Inicio"];
    this.endTime = item["Hora Fin"];
    this.category = item["Categoria"].trim().toLowerCase();
    this.description = item["Descripcion"];
    this.details = item["Detalles"];
    this.startTimeMinutes = DateTimeParser.convertToMinutes(
      item["Hora Inicio"]
    );
    this.endTimeMinutes = DateTimeParser.convertToMinutes(item["Hora Fin"]);
    this.duration = Number(item["Minutos"]);
    this.company = item["Compañia"]
      .replace(/\s/g, "")
      .split(",")
      .map((c) => {
        if (c === "") c = "Sin compañia";
        return c;
      });
    this.sub_categories = {
      doom: Number(item["DOOM"]),
      leer: Number(item["LEER"]),
      podcast: Number(item["PODCAST"]),
    };

    if (categoryStyles[this.category] === undefined) {
      console.warn(
        `Category "${this.category}" not found in categoryStyles. Defaulting to "#999" color and "80%" height.`
      );
    }
    this.styles = categoryStyles[this.category];
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

  getSegmentStyle() {
    const active = {
      backgroundColor: this.styles.color || categoryStyles.default.color,
      borderRadius: this.styles.radius || categoryStyles.default.radius,
      height: this.styles.height || categoryStyles.default.height,
      left: (this.startTimeMinutes / (24 * 60)) * 100 + "%",
      width: (this.duration / (24 * 60)) * 100 + "%",
    };
    const inactive = {
      backgroundColor: categoryStyles.default.color,
      borderRadius: categoryStyles.default.radius,
      height: categoryStyles.default.height,
      left: (this.startTimeMinutes / (24 * 60)) * 100 + "%",
      width: (this.duration / (24 * 60)) * 100 + "%",
    };
    return { active, inactive };
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

  matchesFilter(filters) {
    // Initialize all match variables to true (neutral state)
    let relationshipMatch = true;
    let categoryMatch = true;
    let subcategoryMatch = true;

    // Check relationships (if any filters are provided)
    if (filters.relationships && filters.relationships.length > 0) {
      // Extract relationship names from filter objects
      const filterRelationshipNames = filters.relationships.map((r) => r.name);

      // Check if any of the activity's companies match any filter relationship
      relationshipMatch = this.company.some((company) =>
        filterRelationshipNames.includes(company)
      );
    }

    // Check categories (if any filters are provided)
    if (filters.categories && filters.categories.length > 0) {
      // Extract category names from filter objects
      const filterCategoryNames = filters.categories.map((c) => c.name);

      // Check if the activity's category matches any filter category
      categoryMatch = filterCategoryNames.includes(this.category);
    }

    // Check subcategories (if any filters are provided)
    if (filters.subcategories && filters.subcategories.length > 0) {
      // Extract subcategory names from filter objects
      const filterSubcategoryNames = filters.subcategories.map((sc) => sc.name);

      // Check if any of the activity's subcategories with value > 0 match the filters
      subcategoryMatch = Object.keys(this.sub_categories).some(
        (subcategory) =>
          filterSubcategoryNames.includes(subcategory) &&
          this.sub_categories[subcategory] > 0
      );
    }

    // Return true only if all applicable filters match
    return relationshipMatch && categoryMatch && subcategoryMatch;
  }
}
