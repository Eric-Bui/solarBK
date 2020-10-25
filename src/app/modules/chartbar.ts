export function GenerateDay() {
  const date = new Date();
  const dayArr = [];
  for (let i = 0; i < 30; i++) {
    if (i > 0) {
      date.setDate(date.getDate() - 1);
    }

    const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    const month =
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1;

    const daysAgo = `${date.getFullYear()}-${month}-${day}`;
    dayArr.push(daysAgo);
  }

  return dayArr.reverse();
}

const dataChartBar = [
  48,
  38,
  46,
  17,
  17,
  48,
  26,
  45,
  29,
  49,
  45,
  31,
  20,
  14,
  33,
  30,
  30,
  32,
  37,
  40,
  33,
  21,
  37,
  15,
  19,
  30,
  38,
  42,
  8,
  46,
];
export function DataChartBar() {
  // data fake of chartbar
  return dataChartBar;
}
