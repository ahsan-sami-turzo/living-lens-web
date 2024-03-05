<template>
  <v-container>
    <v-chart
      v-if="barChartData && barChartData.series.length > 0"
      :option="barChartOption"
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
      barChartData: {
        categories: [],
        series: [],
      },
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
    barChartOption() {
      return {
        tooltip: {
          trigger: "axis",
          axisPointer: { type: "shadow" },
          formatter: function (params) {
            const param = params[0];
            return `${param.name}: €${param.value
              .toFixed(2)
              .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
          },
        },
        xAxis: {
          type: "category",
          data: this.barChartData.categories,
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: "€{value}",
          },
        },
        series: [
          {
            data: this.barChartData.series.map((value, index) => ({
              value,
              itemStyle: {
                color:
                  this.categoryColors[this.barChartData.categories[index]] ||
                  "#999", // Fallback color
              },
            })),
            type: "bar",
          },
        ],
      };
    },
  },
  async created() {
    await this.fetchChartData();
  },
  methods: {
    async fetchChartData() {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8080/api/v1/get-barchartdata/${this.cityId}`
        );
        const data = response.data[0];
        this.barChartData.categories = Object.keys(data).filter(
          key => key !== "Summary"
        );
        this.barChartData.series = this.barChartData.categories.map(
          key => data[key]
        );
      } catch (error) {
        console.error("Error fetching city data:", error);
      }
    },
  },
};
</script>
