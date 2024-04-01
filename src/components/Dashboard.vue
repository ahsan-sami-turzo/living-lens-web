<template>
  <v-container>
    <v-row>
      <v-col cols="4">
        <v-select
          clearable
          label="Select Country"
          v-model="selectedCountry"
          :items="countries"
          return-object
          @input="countrySelected"
        ></v-select>
      </v-col>
    </v-row>
    <v-row cols="6" v-for="city in cities" :key="city.id">
      <v-col>
        <v-card>
          <v-card-title>{{ city.city_name }}</v-card-title>
          <v-card-subtitle>Finland</v-card-subtitle>
          <v-card-text>
            <v-row>
              <v-col cols="6">
                <PieChart :cityId="city.id" />
              </v-col>
              <v-col cols="6">
                <BarChart :cityId="city.id" />
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="goToCityDetails(city)">
              View Details
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";
import BarChart from "@/components/BarChart.vue";
import PieChart from "@/components/PieChart.vue";
import axios from "axios";

export default {
  name: "Dashboard",
  components: {
    apexchart: VueApexCharts,
    BarChart,
    PieChart,
  },
  data() {
    return {
      selectedCity: null,
      cities: [],
      countries: [],
      selectedCountry: null,
    };
  },
  async created() {
    // this.selectedCity = "Finland";
    await this.fetchCountries();
  },
  methods: {
    goToCityDetails(city) {
      this.$router.push({
        name: "CityDetail",
        params: { id: city.id, city_name: city.city_name },
      });
    },
    countrySelected() {
      console.log("selected: ", this.selectedCountry);
      if (this.selectedCountry) {
        console.log("selected: ", this.selectedCountry);
        this.fetchCities(this.selectedCountry.value);
      } else {
        console.log("empty: ", this.selectedCountry);
        this.cities = [];
      }
    },
    async fetchCities(countryId) {
      try {
        const response = await axios.get(
          `https://api.ll.beydu.com/api/v1/get-cities/${countryId}`
        );
        this.cities = response.data;
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    },
    async fetchCountries() {
      try {
        const response = await axios.get(
          "https://api.ll.beydu.com/api/v1/get-countries/"
        );
        response.data.map(data =>
          this.countries.push({ title: data.name, value: data.id })
        );
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    },
  },
};
</script>
