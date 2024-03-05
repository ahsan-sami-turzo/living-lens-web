import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "@/components/Dashboard.vue";
import Admin from "@/components/Admin.vue";
import CityDetail from "@/components/CityDetail.vue";

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
  },
  {
    path: "/city-detail/:id",
    name: "CityDetail",
    component: CityDetail,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
