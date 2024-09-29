import * as Papa from "papaparse";

const cv_url =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQRMS1vyf6xcxPBBE0j7_inglkQVo7EFodBxWRNM1BI6PLATEk3jjO25Enjkde4hqAcZvd8tu9LGrvL/pub?output=csv";

const parseData = () => {
  let data = [];
  return new Promise((resolve) => {
    Papa.parse(cv_url, {
      download: true,
      header: true,
      complete: (results) => {
        //console.log(results);
        data = results.data.filter((e) => e.description != "");
        for (let i = 0; i < data.length; i++) {
          const element = data[i];
          //console.log(element.bullets.split("\n"));
          element.bullets = element.bullets
            .split("\n")
            .map((e) => e.split("**"));
          // console.log(element.bullets);
        }
        //console.log(data);
        resolve(data);
      },
    });
  });
};

const getData = (url) => {
  let data = [];
  return new Promise((resolve) => {
    Papa.parse(url, {
      download: true,
      header: true,
      complete: (results) => {
        data = results.data;
        console.log("incv", data);
        resolve(data);
      },
    });
  });
};

export const cv_data = parseData();
export const recipe_book = getData(
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSAtekbqE04bfBvLYrqa6gnUIJK1ObopQ5UkMzsXiWYHt4WODzRGbUi3tgrvXc2fwew8pYQ0gpvwxFm/pub?gid=0&single=true&output=csv"
);
export const recipe_images = getData(
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSAtekbqE04bfBvLYrqa6gnUIJK1ObopQ5UkMzsXiWYHt4WODzRGbUi3tgrvXc2fwew8pYQ0gpvwxFm/pub?gid=965312415&single=true&output=csv"
);
export const recipe_categories = getData(
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSAtekbqE04bfBvLYrqa6gnUIJK1ObopQ5UkMzsXiWYHt4WODzRGbUi3tgrvXc2fwew8pYQ0gpvwxFm/pub?gid=1285482102&single=true&output=csv"
);
