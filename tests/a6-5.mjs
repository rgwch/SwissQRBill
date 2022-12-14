import { PDF, SVG } from "../lib/node/esm/node/index.js";
import { writeFileSync } from "fs";

const data = {
  currency: "CHF",
  amount: 1199.95,
  reference: "210000000003139471430009017",
  creditor: {
    name: "Robert Schneider AG",
    address: "Rue du Lac 1268",
    zip: 2501,
    city: "Biel",
    account: "CH4431999123000889012",
    country: "CH"
  },
  debtor: {
    name: "Pia-Maria Rutschmann-Schnyder",
    address: "Grosse Marktgasse 28",
    zip: 9400,
    city: "Rorschach",
    country: "CH"
  }
};

const pdf = new PDF(data, "./output/pdf/a6-5.pdf", { "size": "A6" });
const svg = new SVG(data);
writeFileSync("./output/svg/a6-5.svg", svg.toString());