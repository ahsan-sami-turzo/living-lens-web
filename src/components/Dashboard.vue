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
    <v-row cols="6" v-for="city in cities" :key="city.id">
      <v-col>
        <v-card>
          <v-card-title>{{ city.city_name }}</v-card-title>
          <v-card-subtitle>Finland</v-card-subtitle>
          <v-card-text>
            <BarChart :cityId="city.id" />
          </v-card-text>
          <v-card-actions>
            <v-btn @click="goToCityDetail(city.id)" color="primary"> View Details </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";
import BarChart from "@/components/BarChart.vue";
import axios from "axios";

export default {
  name: "Dashboard",
  components: {
    apexchart: VueApexCharts,
    BarChart,
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
    goToCityDetail(id){
      this.$router.push('/city-detail/'+id)
    },
    async fetchCities() {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8080/api/v1/get-cities/3"
        );

        response.data.map(city => {
          this.cities.push({ ...city });
        });
      } catch (error) {
        console.error("Error fetching cities or city data:", error);
      }
    },
  },
};
</script>
