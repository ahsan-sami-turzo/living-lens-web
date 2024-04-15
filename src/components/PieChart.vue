<template>
  <v-container>
    <apexchart
      type="pie"
      width="480"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </v-container>
</template>

<script>
import axios from "axios";
import VueApexCharts from "vue3-apexcharts";

export default {
  name: "PieChart",
  components: {
    apexchart: VueApexCharts,
  },
  props: {
    cityId: {
      type: Number,
      required: true,
    },
  },
  data() {

    return {
      series: [],
      chartOptions : {
          chart: {
              width: 480,
            },
            labels: [],
            responsive: [{
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  position: 'bottom'
                }
              }
            }]
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
              radius: ["40%", "100%"],
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
                fontSize: 18,
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
              }))
        var labels = []
        for (let item of data){
          this.series.push(item.value)
          labels.push(item.name)
        }
        this.chartOptions = {
          chart: {
              width: 380,
            },
            labels: labels,
            responsive: [{
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  position: 'bottom'
                }
              }
            }]
        }

      } catch (error) {
        console.error("Error fetching city data:", error);
      }
    },
  },
};
</script>
