<template>
  <v-container>
    <v-chart
      v-if="
        chartData &&
        chartData.series &&
        chartData.series[0] &&
        chartData.series[0].data.length > 0
      "
      :option="echartOption"
      autoresize
      style="height: 300px"
    ></v-chart>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "BarChart",
  props: {
    cityId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      chartData: {}, // Now we'll store ECharts options directly here
    };
  },
  computed: {
    echartOption() {
      // This computed property will ensure reactivity
      return this.chartData;
    },
  },
  async created() {
    await this.fetchCities();
  },
  methods: {
    async fetchCities() {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8080/api/v1/get-piechartdata/${this.cityId}`
        );
        const dataForChart = response.data[0]; // Assuming the first item is what you need

        // Setting up ECharts options
        this.chartData = {
          tooltip: {
            trigger: "item",
          },
          legend: {
            top: "5%",
            left: "center",
            show: true,
          },
          series: [
            {
              name: "Expenses From",
              type: "pie",
              radius: ["40%", "70%"],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: "#fff",
                borderWidth: 2,
              },
              label: {
                show: true,
                position: "outside",
                // formatter: params =>
                //   `${params.data.name}: ${params.data.value}`,
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: 30,
                  fontWeight: "bold",
                },
              },
              labelLine: {
                show: true,
              },
              data: Object.entries(dataForChart).map(([name, value]) => ({
                value,
                name,
              })),
            },
          ],
        };
      } catch (error) {
        console.error("Error fetching city data:", error);
      }
    },
  },
};
</script>