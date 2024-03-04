<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar app title="Living Lens"></v-app-bar>

    <v-navigation-drawer app>
      <v-list lines="one" density="compact">
        <v-list-item>
          <v-select
            label="Select Lifestyle"
            :items="lifestyles"
            v-model="selectedLifestyle"
            @change="updateCategories"
            return-object
          ></v-select>
        </v-list-item>
        <v-list-item title="Categories">
          <v-select
            v-model="currentCategories"
            :items="currentCategories"
            label="Select Categories"
            multiple
            chips
            clearable
            attach
          ></v-select>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main
      class="d-flex align-center justify-center"
      style="min-height: 900px"
    >
      <v-container fluid class="py-8 px-6">
        <router-view />
      </v-container>
      <!-- <iframe
        :src="iframeUrl"
        frameborder="0"
        width="100%"
        height="100%"
        allowtransparency
      ></iframe> -->
    </v-main>
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    selectedLifestyle: "",
    lifestyles: [
      "Gourmet Explorer",
      "City Hustle",
      "Family Nest",
      "Entertainment Enthusiast",
    ],
    categories: {
      "Gourmet Explorer": [
        "Meal for 2, Mid-range Restaurant, Three-course",
        "Meal, Inexpensive Restaurant",
        "Domestic Beer (0.5 liter draught)",
        "Bottle of Wine (Mid-Range)",
        "Cappuccino (regular)",
        "Markets: Chicken Breasts (Boneless, Skinless), (1kg)",
        "Markets: Fresh Cheese (1kg)",
        "Markets: Bottle of Wine (Mid-Range)",
      ],
      "City Hustle": [
        "Meal, Inexpensive Restaurant",
        "Monthly Pass (Public Transport)",
        "Fitness Club, Monthly Fee for 1 Adult",
        "Cinema, International Release, 1 Seat",
        "Coffee from a coffee shop (e.g., Starbucks)",
        "Fast Food Combo Meal",
        "Taxi Start (Normal Tariff)",
      ],
      "Family Nest": [
        "Markets: Milk (regular), (1 liter)",
        "Markets: Loaf of Fresh White Bread (500g)",
        "Markets: Rice (white), (1kg)",
        "Kindergarten (or Preschool), Full Day, Private, Monthly for 1 Child",
        "International Primary School, Yearly for 1 Child",
        "Doctor’s visit (General Practitioner)",
        "Cinema, International Release, 1 Adult & 1 Child",
      ],
      "Entertainment Enthusiast": [
        "Cinema, International Release, 1 Seat",
        "Domestic Beer (0.5 liter draught) in a pub",
        "Concert Tickets (Average Price)",
        "Nightclub Entry (Regular on Weekend)",
        "Latest Consumer Electronics (e.g., Smartphone, Gaming Console)",
        "Gym Membership",
        "Sports Event Ticket",
      ],
    },
    dashboardList: {
      "Gourmet Explorer":
        "http://localhost:3000/public/dashboard/29d88086-5c29-4ea1-b2e6-ea534ab59f23",
      "Family Nest":
        "http://localhost:3000/public/dashboard/1e6817c3-2cae-417f-a488-3b5c421cc059",
    },
    currentCategories: [],
    categorySelected: {},
    iframeUrl: "",
  }),
  watch: {
    selectedLifestyle(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.updateCategories();
        this.iframeUrl = this.dashboardList[newVal];
      }
    },
  },
  methods: {
    updateCategories() {
      if (this.selectedLifestyle) {
        this.currentCategories = this.categories[this.selectedLifestyle];
        // Reset the categorySelected to reflect the new categories
        this.categorySelected = this.currentCategories.reduce(
          (acc, category) => {
            acc[category] = false;
            return acc;
          },
          {}
        );
      } else {
        this.currentCategories = [];
      }
    },
    async fetchJWT(selectedLifestyle) {
      try {
        const response = await fetch(
          `http://localhost:3002/generate-jwt?lifestyle=${encodeURIComponent(
            selectedLifestyle
          )}`
        );
        const data = await response.json();
        this.iframeUrl = `http://localhost:3000/embed/dashboard/${data.token}#bordered=true&titled=true`;
      } catch (error) {
        console.error("Error fetching JWT:", error);
      }
    },
  },
  mounted() {
    // this.fetchJWT(this.selectedLifestyle);
  },
};
</script>
