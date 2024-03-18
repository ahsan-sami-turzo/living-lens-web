/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from "@/plugins";

// Components
import App from "./App.vue";

// Composables
import { createApp } from "vue";
// import VueApexCharts from "vue-apexcharts";

const app = createApp(App);
// app.component("apexchart", VueApexCharts);

registerPlugins(app);

app.mount("#app");
