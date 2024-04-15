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
  name: "PieChart",
  props: {
    cityId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      chartData: {},
      categoryColors: {
        Utilities: "#5470C6",
        Childcare: "#40E0D0",
        Restaurants: "#EE6666",
        Clothing: "#F9E79F",
        Transportation: "#3BA272",
        // Add more categories and colors as needed
      },
    };
  },
  computed: {
    echartOption() {
      // This computed property will ensure reactivity
      return this.chartData;
    },
  },
  async created() {
    await this.fetchChartData();
  },
  methods: {
    async fetchChartData() {
      try {
        const response = await axios.get(
            `https://api.ll.beydu.com/api/v1/get-piechartdata/${this.cityId}`
        );
        const dataForChart = response.data[0]; // Assuming the first item is what you need

        // Setting up ECharts options
        this.chartData = {
          tooltip: {
            trigger: "item",
          },
          legend: {
            orient: "vertical",
            left: "left",
          },
          series: [
            {
              name: "Expenses From",
              type: "pie",
              radius: ["50%", "100%"],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: "#fff",
                borderWidth: 2,
              },
              label: {
                show: true,
                // position: "outside",
                position: "inside",
                formatter: "{d}%",
                color: "black",
                fontSize: 16,
                percentPrecision: 0,

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
                itemStyle: {
                  color: this.categoryColors[name] || "#999", // Fallback color
                },
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
