import Vue from "vue";
import Router from "vue-router";
import DefaultLayout from "./layouts/Default.vue";
import Home from "./views/Home.vue";
import Profile from "./views/Profile.vue";
import ListView from "./views/ListView";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      component: DefaultLayout,
      children: [
        {
          path: "",
          name: "home",
          component: ListView
        },
        {
          path: "/gallary",
          name: "gallary",
          component: Home
        },
        {
          path: "/:id",
          name: "profile",
          component: Profile
        }
      ]
    }
  ]
});
