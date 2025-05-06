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

// for cv
// sheet url: https://docs.google.com/spreadsheets/d/1g2GNxXqNLozb1_-nhTLwHPsUqiat3eH2EO4NbKPl8Bk/edit?gid=0#gid=0
export const cv_data = parseData();

// for recipes
// sheet url: https://docs.google.com/spreadsheets/d/1xMgQPyXLYFD8Q3Yq1LBDwI1IlsDZRaGvyQwJw6oFRcE/edit?usp=drive_link
export const recipe_book = getData(
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSAtekbqE04bfBvLYrqa6gnUIJK1ObopQ5UkMzsXiWYHt4WODzRGbUi3tgrvXc2fwew8pYQ0gpvwxFm/pub?gid=0&single=true&output=csv"
);
export const recipe_additional_data = getData(
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSAtekbqE04bfBvLYrqa6gnUIJK1ObopQ5UkMzsXiWYHt4WODzRGbUi3tgrvXc2fwew8pYQ0gpvwxFm/pub?gid=1260042740&single=true&output=csv"
);

// for viajes y paseos
// sheet url: https://docs.google.com/spreadsheets/d/1Wbcd8pR9s7P_0R-b2nCkVBWL1u93YC-zbRpyIjkmZfk/edit?gid=0#gid=0
export const viajes_book = getData(
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vToS4T2gjCtVUSHQZ6GxRD8ppJC-uhrjhIAcjY-wy0z0MAISwuOUxOzu_fe--XWZGQy9G7WV7d_W-2w/pub?gid=0&single=true&output=csv"
);
export const viajes_additional_data = getData(
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vToS4T2gjCtVUSHQZ6GxRD8ppJC-uhrjhIAcjY-wy0z0MAISwuOUxOzu_fe--XWZGQy9G7WV7d_W-2w/pub?gid=1260042740&single=true&output=csv"
);
// for shopping list
// sheet url: https://docs.google.com/spreadsheets/d/1RYgAmmGF8e3EL29l6KTssE5th2R1yC4097q5GgW8rao/edit?usp=drive_link
export const list_book = getData(
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQoYu5hbGmEuAP6v9a1NTkhD9iOTmGwm9lGC8MzG5C_mQcWho_JBNwmjJ83Rhr5fY6pkqR_7JY7CSYo/pub?gid=332160851&single=true&output=csv"
);

export const portfolio_data = getData(
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSM1iKzoQGRq2jd2cNkOVIlrCR0i88qdX2kx959yBAMGrBEolpj7_aWeiWAZY_9DnSFSMdm-YOP8aQS/pub?gid=1391686964&single=true&output=csv"
);
