import { Component, OnInit } from "@angular/core";
import { SubjectService } from "../../../services/subject.service";
import { Chart } from "chart.js";
import * as moment from "moment";
declare var $: any;
//import "chartjs-plugin-datalabels";

@Component({
  selector: "app-homepage",
  templateUrl: "./homepage.component.html",
  styleUrls: ["./homepage.component.scss"],
})
export class HomepageComponent implements OnInit {
  changeDay: string;
  now = moment().format("dddd, MMMM DD, YYYY");

  constructor(private subjectService: SubjectService) {}

  ngOnInit() {
    this.createChartBar();
    this.createChartLine();
    this.handleDatePicker();
    this.handleChartLine();
  }

  // data demo
  dataChartBar = [
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

  //method create chartbar
  chartBar = {
    data: {
      labels: this.generateDay(),
      datasets: [
        {
          label: "Hệ 1",
          data: this.dataChartBar,
          backgroundColor: "#28d9ee",
        },
      ],
    },
    options: {
      scales: {
        xAxes: [
          {
            barPercentage: 0.5,
            stacked: true,
          },
        ],
        yAxes: [
          {
            stacked: true,
          },
        ],
      },
      plugins: {
        datalabels: {
          color: "#000",
          display: true,
          align: "center",
          backgroundColor: "#fff",
          font: {
            weight: 600,
          },
        },
      },
      title: {
        display: true,
        text: "Năng lượng sản xuất (kWh)",
        position: "left",
        fontFamily: "Avenir",
        fontStyle: "light",
      },
      maintainAspectRatio: false,
    },
  };

  //method create chart line
  chartLine = {
    data: {
      labels: this.generateTime(this.now),
      datasets: [
        {
          label: "Hệ 1-Inverter",
          data: this.dataChartBar,
          backgroundColor: "#c6f02d",
          borderColor: "#c6f02d",
          fill: false,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              fontColor: "rgba(0,0,0,.6)",
              fontStyle: "bold",
              beginAtZero: true,
              min: 0,
              max: 50,
              step: 1,
            },
          },
        ],
      }, // scale
      plugins: {
        datalabels: {
          display: false,
        },
      },
      title: {
        display: true,
        text: "Công suất PV trong ngày (kW)",
        position: "left",
        fontFamily: "Avenir",
        fontStyle: "light",
      },
      maintainAspectRatio: false,
    },
  };

  //reload chartline when user change data
  handleChartLine() {
    this.subjectService.getChangeTime().subscribe((timer) => {
      this.createChartLine();
      this.generateTime(timer);
    });
  }

  //function generate list the days
  generateDay() {
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

  //handle datepicker when change
  handleDatePicker() {
    const component = this;

    $("#datepicker").datepicker({
      dateFormat: "DD, MM d, yy",
      changeMonth: true,
      changeYear: true,
      maxDate: 0,
    });

    $("#datepicker")
      .datepicker("setDate", "0")
      .on("change", function (e) {
        this.changeDay = e.target.value;

        // component.generateTime(this.changeDay);
        component.subjectService.sendChangeTime(this.changeDay);
      });
  }

  //function generate list the timer

  generateTime(timer) {
    let hourse = 0;
    let minutes = 0;
    let currentHourse = parseInt(moment().format("HH"));
    let currentMinutes = parseInt(moment().format("mm"));
    const timeArr = ["00:00:00"];

    if (timer !== this.now) {
      currentHourse = 24;
    }
    for (let i = 1; hourse <= currentHourse; i++) {
      if (minutes === 50 && hourse < currentHourse) {
        minutes = 0;
        hourse++;
      } else {
        if (currentMinutes > minutes) {
          minutes += 10;
        }
        return minutes;
      }
      let item = `${hourse < 10 ? "0" + hourse : hourse}:${
        minutes < 10 ? "0" + minutes : minutes
      }:00`;
      timeArr.push(item);
    }
    console.log(timeArr);
    return timeArr;
  }

  createChartBar() {
    //new chartbar
    new Chart("chart-bar", {
      type: "bar",
      height: 400,
      data: this.chartBar.data,
      options: this.chartBar.options,
    });
  }

  createChartLine() {
    //new chartline
    new Chart("chart-line", {
      type: "line",
      data: this.chartLine.data,
      options: this.chartLine.options,
    });
  }
}
