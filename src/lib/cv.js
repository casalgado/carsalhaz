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

const members_url =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRRmDmlVnTE5B2MQ6n76icC-UJwP20sOdJ_WM-EQVjrLcJuTwSmMqyWR0pkui4YJTSxvW9U52Nnfw_X/pub?gid=0&single=true&output=csv";
const getMembers = () => {
  let data = [];
  return new Promise((resolve) => {
    Papa.parse(members_url, {
      download: true,
      header: true,
      complete: (results) => {
        data = results.data;
        // console.log(data);
        resolve(data);
      },
    });
  });
};

const orders_url =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRRmDmlVnTE5B2MQ6n76icC-UJwP20sOdJ_WM-EQVjrLcJuTwSmMqyWR0pkui4YJTSxvW9U52Nnfw_X/pub?gid=1607532012&single=true&output=csv";
const getOrders = () => {
  let data = [];
  return new Promise((resolve) => {
    Papa.parse(orders_url, {
      download: true,
      header: true,
      complete: (results) => {
        data = results.data;
        // console.log(data);
        resolve(data);
      },
    });
  });
};

const products_url =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRRmDmlVnTE5B2MQ6n76icC-UJwP20sOdJ_WM-EQVjrLcJuTwSmMqyWR0pkui4YJTSxvW9U52Nnfw_X/pub?gid=1511137527&single=true&output=csv";
const getProducts = () => {
  let data = [];
  return new Promise((resolve) => {
    Papa.parse(products_url, {
      download: true,
      header: true,
      complete: (results) => {
        data = results.data;
        // console.log(data);
        resolve(data);
      },
    });
  });
};

const design_info_url =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTUmLReoqswu9GCYQUbf7M-ZqgogFjFOgNhXJ7NirfCJtUEeapK61QqA6DqVt-Htowe1WMXQFBerLdQ/pub?gid=1263643295&single=true&output=csv";
const getPhoneInfo = () => {
  let data = [];
  return new Promise((resolve) => {
    Papa.parse(design_info_url, {
      download: true,
      header: true,
      complete: (results) => {
        data = results.data;
        // console.log(data);
        resolve(data);
      },
    });
  });
};

export const cv_data = parseData();
export const members = getMembers();
export const orders = getOrders();
export const products = getProducts();
export const phoneInfo = getPhoneInfo();
