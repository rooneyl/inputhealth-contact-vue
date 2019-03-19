<template>
  <q-layout view="lHr LpR fFf">
    <!-- Header -->
    <q-layout-header>
      <q-toolbar color="primary">
        <div class="col" style="text-align:left;">
          <q-btn
            v-if="backButtonVisible"
            dense
            class="no-shadow"
            round
            @click="backButton"
            aria-label="MENU"
            icon="arrow_back"
          />
        </div>
        <div class="col" style="text-align:center;">
          <q-btn-toggle
            v-model="viewToggle"
            color="blue-8"
            text-color="white"
            toggle-color="white"
            toggle-text-color="blue-8"
            dense
            class="no-shadow"
            @input="changeView"
            :options="toggleOptions"
          />
        </div>
        <div class="col" style="text-align:right;">
          <q-btn flat dense round @click="shuffleContact" aria-label="SHUFFLE" icon="shuffle"/>
          <q-btn flat dense round @click="addContact" aria-label="ADD" icon="add"/>
        </div>
      </q-toolbar>
    </q-layout-header>
    <!-- Container -->
    <q-page-container>
      <transition
        :name="transitionName"
        :mode="transitionMode"
        :enter-active-class="transitionEnterActiveClass"
      >
        <router-view v-if="!this.isError && this.rawContactList.length != 0"/>
        <div v-else-if="!this.isError"></div>
        <div v-else>There is something wrong with internet Connetction</div>
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState } from "vuex";
import { FETCH_USERS } from "@/store";
import { SHUFFLE_USERS, CHANGE_VIEW } from "@/store";

export default {
  name: "LayoutDefault",
  data() {
    return {
      viewToggle: "gallary-view",
      transitionName: "slide",
      transitionMode: `out-in`,
      transitionEnterActiveClass: "",
      toggleOptions: [
        { label: "Grid", value: "gallary-view", icon: "grid_on" },
        { label: "List", value: "list-view", icon: "list" }
      ]
    };
  },
  created() {
    this.$store.dispatch(FETCH_USERS);
    this.$router.beforeEach((to, from, next) => {
      const toDepth = to.path.length;
      const fromDepth = from.path.length;
      this.transitionName = toDepth < fromDepth ? "slide-right" : "slide-left";
      next();
    });
  },
  computed: {
    ...mapState(["isError", "rawContactList"]),
    backButtonVisible() {
      return this.$route.name == "profile";
    }
  },
  methods: {
    changeView() {
      this.$store.commit(CHANGE_VIEW);
      this.$router.push({ name: this.viewToggle });
    },
    addContact() {
      this.$router.push({ name: "profile", params: { id: "add" } });
    },
    shuffleContact() {
      this.$store.commit(SHUFFLE_USERS);
    },
    backButton() {
      this.$router.push({ name: this.viewToggle });
    }
  }
};
</script>
<style lang="scss">
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition-duration: 1s;
  transition-property: opacity, transform;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
  overflow: hidden;
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  transform: translate(2em, 0);
}
.slide-right-enter,
.slide-left-leave-active {
  opacity: 0;
  transform: translate(-2em, 0);
}
</style>