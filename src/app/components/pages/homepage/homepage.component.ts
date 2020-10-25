import { Component, OnInit } from "@angular/core";
import { SubjectService } from "../../../services/subject.service";

import { Chart } from "chart.js";
import * as moment from "moment";
declare var $: any;
import "chartjs-plugin-datalabels";

import { GenerateDay, DataChartBar } from "../../../modules/chartbar";
import { GenerateTime, DataChartLine } from "../../../modules/chartline";

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

  //method create chartbar
  chartBar = {
    data: {
      labels: GenerateDay(),
      datasets: [
        {
          label: "Hệ 1",
          data: DataChartBar(),
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
      labels: GenerateTime(this.now),
      datasets: [
        {
          label: "Hệ 1-Inverter",
          data: DataChartLine(),
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

      //hide points in chartline
      elements: {
        point: {
          radius: 0,
        },
      },
    },
  };

  //reload chartline when user change data
  handleChartLine() {
    this.subjectService.getChangeTime().subscribe((timer) => {
      this.createChartLine();
    });
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
        component.subjectService.sendChangeTime(this.changeDay);
      });
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
