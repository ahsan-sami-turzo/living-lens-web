<template>
  <v-container>
    <v-row>
      <v-col cols="4">
        <v-btn>
                    {{ selectedCountry.title }}

                    <v-menu activator="parent">
                      <v-list style="max-height: 300px; overflow: auto">
                        <v-list-item
                          :ripple="false"
                          v-for="(country, index) in countries"
                          :key="country.value"
                          :value="index"
                        >
                        <v-list-item-title @click="changeCountry(country)">{{
                    country.title
                  }}</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </v-btn>
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
      selectedCountry: {title:'Germany',value:1},
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
    changeCountry(country) {
      this.fetchCities(country.value);
      this.selectedCountry = country;
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
        this.fetchCities(this.selectedCountry.value)
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    },
  },
};
</script>
