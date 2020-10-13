import Data from "../transactions.json";
// Images
import WFIMG from "../../UIELements/assets/icons/whole-foods.png";
import TheTeaLoungeIMG from "../../UIELements/assets/icons/the-tea-lounge.png";
import TexacoIMG from "../../UIELements/assets/icons/texaco.png";
import SECIMG from "../../UIELements/assets/icons/southern-electric-company.png";
import LawrencePIMG from "../../UIELements/assets/icons/lawrence-pearson.png";
import JerryHIMG from "../../UIELements/assets/icons/jerry-hildreth.png";
import HMIMG from "../../UIELements/assets/icons/h&m-online-store.png";
import BackbaseIMG from "../../UIELements/assets/icons/backbase.png";
import AmazonIMG from "../../UIELements/assets/icons/amazon-online-store.png";
import SEIMG from "../../UIELements/assets/icons/7-eleven.png";

// const log = console.log;
export const getData = () => Data;

const updateDateInUI = (date) => {
  let dateCondition = typeof date === "string";

  if (dateCondition) {
    if (date.indexOf("-") === -1) {
      return date;
    }
  }

  const newDate = new Date(date);
  const dateToString = newDate.toString();
  const splitDate = dateToString.split(" ");
  const UIDate = `${splitDate[1]}. ${splitDate[2]}`;

  return UIDate;
};

const changeDateFormat = (currentFormat) => {
  return Date.parse(currentFormat);
};

export const updatedData = () => {
  let initialData = Data.data;
  let newData = [];
  let initialCompanyIMGData = [
    { name: "Backbase", src: BackbaseIMG, alt: "Backbase" },
    { name: "The Tea Lounge", src: TheTeaLoungeIMG, alt: "The Tea Lounge" },
    { name: "Texaco", src: TexacoIMG, alt: "Texaco" },
    { name: "Amazon Online Store", src: AmazonIMG, alt: "Amazon Online Store" },
    { name: "7-Eleven", src: SEIMG, alt: "7-Eleven" },
    { name: "H&M Online Store", src: HMIMG, alt: "H&M Online Store" },
    { name: "Jerry Hildreth", src: JerryHIMG, alt: "Jerry Hildreth" },
    { name: "Lawrence Pearson", src: LawrencePIMG, alt: "Lawrence Pearson" },
    { name: "Whole Foods", src: WFIMG, alt: "Whole Foods" },
    {
      name: "Southern Electric Company",
      src: SECIMG,
      alt: "Southern Electric Company",
    },
  ];

  for (let i = 0; i < initialData.length; i++) {
    let obj = initialData[i];
    let date = obj.dates.valueDate;

    if (typeof obj.dates.valueDate === "string") {
      if (obj.dates.valueDate.split("-").length === 3) {
        obj.dates.valueDate = changeDateFormat(obj.dates.valueDate);
      }
    }

    if (typeof obj.transaction.amountCurrency.amount === "string") {
      obj.transaction.amountCurrency.amount = parseFloat(
        obj.transaction.amountCurrency.amount
      );
    }

    date = updateDateInUI(date);
    obj.dates.userDate = date;

    let currentCompanyName = obj.merchant.name;

    const imgData =
      initialCompanyIMGData.find((elm) => elm.name === currentCompanyName) ||
      {};

    obj = { ...obj, imgData };

    newData.push(obj);
  }

  //   console.log(newData);

  return newData;
};

export const generateDropdownOptions = () => {
  let initialData = Data.data;
  let {
    merchant: { name },
  } = Data.data;
  let options = [];
  let allNames = [];

  for (let i = 0; i < initialData.length; i++) {
    if (allNames.indexOf(name) === -1) {
      allNames.push(name);
      options.push({ name: name, label: name });
    }
  }

  console.log(options);
  return options;
};

export const addData = (obj) => {
  // let currentData = Data.data;
  // currentData.unshift(obj);
  Data.data.push(obj)
  
  // return currentData;

  // console.log(currentData);

  // updatedData();
}
