import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  // // パスが登録されていない場合はログイン画面へ(LoginAdmin.vueを作成したらコメントを外してください)
  // {
  //   path: "*",
  //   component: () => import("../components/LoginAdmin.vue"),
  // },
  {
    path: "/registerAdmin",
    component: () => import("../view/RegisterAdmin.vue"),
  },
  {
    path: "/loginAdmin",
    component: () => import("../view/LoginAdmin.vue"),
  },
  {
    path: "/employeeList",
    component: () => import("../view/EmployeeList.vue"),
  },
  {
    path: "/employeeDetail/:id",
    component: () => import("../view/EmployeeDetail.vue"),
  },
  {
    path: "/logoutAdmin",
    component: () => import("../view/LogoutAdmin.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
