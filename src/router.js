import Vue from "vue";
import Router from "vue-router";
import DefaultLayout from "./layouts/Default.vue";
import GallaryView from "./views/GallaryView.vue";
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
          name: "gallary-view",
          component: GallaryView
        },
        {
          path: "/gallary",
          name: "list-view",
          component: ListView
        },
        {
          path: "/:id",
          name: "profile",
          component: Profile,
          meta: { transitionName: "slide" }
        }
      ]
    }
  ]
});
