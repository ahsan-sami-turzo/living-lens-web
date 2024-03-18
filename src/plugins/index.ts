/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from "./vuetify";
import router from "@/router";
import VueApexCharts from "vue3-apexcharts";
import ECharts from "vue-echarts";
import { use } from "echarts/core";

import { CanvasRenderer } from "echarts/renderers";
import { BarChart, PieChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
} from "echarts/components";

use([
  CanvasRenderer,
  BarChart,
  PieChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
]);

// Types
import type { App } from "vue";

export function registerPlugins(app: App) {
  app.use(vuetify);
  app.use(router);

  app.component("apexchart", VueApexCharts);
  app.component("v-chart", ECharts);
}
