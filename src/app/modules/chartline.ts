import * as moment from "moment";

let now = moment().format("dddd, MMMM DD, YYYY");
let dataChartLine = [];

export function GenerateTime(timer) {
  let hourse = 0;
  let minutes = 0;
  let currentHourse = parseInt(moment().format("HH"));
  const currentMinutes = parseInt(moment().format("mm"));
  let n = Math.floor(currentMinutes / 10);

  const timeArr = ["00:00:00"];

  if (timer !== now) {
    currentHourse = 24;
    n = -1;
  }
  for (let i = 1; i <= currentHourse * 6 + n; i++) {
    //generate fake data for the chartline
    let data = Math.floor(Math.random() * Math.floor(7));
    dataChartLine.push(data);

    //check
    if (minutes === 50 && hourse < currentHourse) {
      minutes = 0;
      hourse++;
    } else {
      minutes += 10;
    }
    let item = `${hourse < 10 ? "0" + hourse : hourse}:${
      minutes < 10 ? "0" + minutes : minutes
    }:00`;
    timeArr.push(item);
  }
  return timeArr;
}
export function DataChartLine() {
  return dataChartLine;
}
