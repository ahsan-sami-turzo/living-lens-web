<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6" v-for="city in cities" :key="city.id">
        <v-card class="pa-3">
          <v-card-title class="pa-2">
            <div class="subtitle-2">{{ city.city_name }}</div>
          </v-card-title>
          <apexchart
            type="donut"
            :options="city.chartOptions"
            :series="city.chartSeries"
          ></apexchart>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import axios from "axios";
import VueApexCharts from "vue3-apexcharts";
const BASE_URL = "http://localhost:8080/api/v1";

export default {
  name: "CitiesData",
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      cities: [],
    };
  },
  async created() {
    await this.fetchCities();
  },
  methods: {
    async fetchCities() {
      try {
        const response = await axios.get("${BASE_URL}/get-cities/3");
        await Promise.all(
          response.data.map(async city => {
            const cityDataResponse = await axios.get(
              `${BASE_URL}/get-piechartdata/${city.id}`
            );
            const dataForChart = cityDataResponse.data[0]; // Assuming each city has one data object
            this.cities.push({
              ...city,
              chartOptions: {
                labels: Object.keys(dataForChart),
                responsive: [
                  {
                    breakpoint: 480,
                    options: {
                      chart: { width: 200 },
                      legend: { position: "bottom" },
                    },
                  },
                ],
              },
              chartSeries: Object.values(dataForChart),
            });
          })
        );
      } catch (error) {
        console.error("Error fetching cities or city data:", error);
      }
    },
  },
};
</script>
