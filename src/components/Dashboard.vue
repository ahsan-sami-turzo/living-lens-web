<template>
  <v-container>
    <v-row>
      <v-col cols="4">
        <v-combobox
          clearable
          chips
          label="Select Country"
          :items="['Finland', 'Sweden', 'Norway', 'Denmark']"
          variant="outlined"
        ></v-combobox>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="2">
        <v-card
          class="pa-3"
          style="cursor: pointer"
          color="primary"
          :dark="true"
        >
          <v-card-title class="pa-2">
            <div class="subtitle-2">Helsinki</div>
          </v-card-title>
        </v-card>
      </v-col>
      <v-col cols="4">
        <apexchart
          type="donut"
          width="100%"
          :options="helsinkiPieCharts.options"
          :series="helsinkiPieCharts.series"
        ></apexchart>
      </v-col>
      <v-col cols="6">
        <v-row>
          <v-col>
            <apexchart
              type="bar"
              width="100%"
              :options="helsinkiBarCharts.options"
              :series="helsinkiBarCharts.series"
            ></apexchart>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="2">
        <v-card
          class="pa-3"
          style="cursor: pointer"
          color="primary"
          :dark="true"
        >
          <v-card-title class="pa-2">
            <div class="subtitle-2">Helsinki</div>
          </v-card-title>
        </v-card>
      </v-col>
      <v-col cols="4">
        <apexchart
          type="donut"
          width="100%"
          :options="helsinkiPieCharts.options"
          :series="helsinkiPieCharts.series"
        ></apexchart>
      </v-col>
      <v-col cols="6">
        <v-row>
          <v-col>
            <apexchart
              type="bar"
              width="100%"
              :options="helsinkiBarCharts.options"
              :series="helsinkiBarCharts.series"
            ></apexchart>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="2">
        <v-card
          class="pa-3"
          style="cursor: pointer"
          color="primary"
          :dark="true"
        >
          <v-card-title class="pa-2">
            <div class="subtitle-2">Helsinki</div>
          </v-card-title>
        </v-card>
      </v-col>
      <v-col cols="4">
        <apexchart
          type="donut"
          width="100%"
          :options="helsinkiPieCharts.options"
          :series="helsinkiPieCharts.series"
        ></apexchart>
      </v-col>
      <v-col cols="6">
        <v-row>
          <v-col>
            <apexchart
              type="bar"
              width="100%"
              :options="helsinkiBarCharts.options"
              :series="helsinkiBarCharts.series"
            ></apexchart>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";

export default {
  name: "Dashboard",
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      helsinkiPieCharts: {
        series: [44, 55, 41, 17, 15],
        options: {
          labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 200,
                },
                legend: {
                  position: "bottom",
                },
              },
            },
          ],
        },
      },
      lahtiPieChart: {
        series: [44, 55, 41, 17, 15],
        options: {
          labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 200,
                },
                legend: {
                  position: "bottom",
                },
              },
            },
          ],
        },
      },
      lappeenrantaPieChart: {
        series: [44, 55, 41, 17, 15],
        options: {
          labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 200,
                },
                legend: {
                  position: "bottom",
                },
              },
            },
          ],
        },
      },
      helsinkiBarCharts: {
        series: [
          {
            name: "Sales",
            data: [44, 55, 41, 64, 22, 43, 21],
          },
        ],
        options: {
          chart: {
            type: "bar",
            height: 350,
          },
          plotOptions: {
            bar: {
              borderRadius: 4,
              horizontal: true,
            },
          },
          dataLabels: {
            enabled: false,
          },
          xaxis: {
            categories: [
              "South Korea",
              "Canada",
              "United Kingdom",
              "Netherlands",
              "Italy",
              "France",
              "Japan",
            ],
          },
        },
      },
      lahtiBarChart: {
        series: [
          {
            name: "Sales",
            data: [44, 55, 41, 64, 22, 43, 21],
          },
        ],
        options: {
          chart: {
            type: "bar",
            height: 350,
          },
          plotOptions: {
            bar: {
              borderRadius: 4,
              horizontal: true,
            },
          },
          dataLabels: {
            enabled: false,
          },
          xaxis: {
            categories: [
              "South Korea",
              "Canada",
              "United Kingdom",
              "Netherlands",
              "Italy",
              "France",
              "Japan",
            ],
          },
        },
      },
      lappeenrantaBarChart: {
        series: [
          {
            name: "Sales",
            data: [44, 55, 41, 64, 22, 43, 21],
          },
        ],
        options: {
          chart: {
            type: "bar",
            height: 350,
          },
          plotOptions: {
            bar: {
              borderRadius: 4,
              horizontal: true,
            },
          },
          dataLabels: {
            enabled: false,
          },
          xaxis: {
            categories: [
              "South Korea",
              "Canada",
              "United Kingdom",
              "Netherlands",
              "Italy",
              "France",
              "Japan",
            ],
          },
        },
      },
    };
  },
};
</script>
