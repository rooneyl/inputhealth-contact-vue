<template>
  <q-layout view="lHr LpR fFf">
    <!-- Header -->
    <q-layout-header>
      <q-toolbar color="primary">
        <div class="col" style="text-align:left;">
          <q-btn
            v-if="backButton"
            dense
            class="no-shadow"
            round
            @click="homeButton"
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
            @input="toggleMethod"
            :options="[
            {label: 'Grid', value: 'home',icon:'grid_on'},
            {label: 'List', value: 'gallary',icon:'list'}
          ]"
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
        @beforeLeave="beforeLeave"
        @enter="enter"
        @afterEnter="afterEnter"
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

const DEFAULT_TRANSITION = "slide";
const DEFAULT_TRANSITION_MODE = "out-in";
export default {
  name: "LayoutDefault",
  data() {
    return {
      viewToggle: "home",
      transitionName: DEFAULT_TRANSITION,
      transitionMode: DEFAULT_TRANSITION_MODE,
      transitionEnterActiveClass: ""
    };
  },
  created() {
    this.$store.dispatch(FETCH_USERS);
    this.$router.beforeEach((to, from, next) => {
      let transitionName = to.meta.transitionName || from.meta.transitionName || DEFAULT_TRANSITION;

      if (transitionName === "slide") {
        const toDepth = to.path.length;
        const fromDepth = from.path.length;
        transitionName = toDepth < fromDepth ? "slide-right" : "slide-left";
      }

      this.transitionEnterActiveClass = `${transitionName}-enter-active`;

      this.transitionName = transitionName;

      next();
    });
  },
  computed: {
    ...mapState(["isError", "rawContactList", "viewTpye"]),
    backButton() {
      return this.$route.name == "profile";
    }
  },

  methods: {
    toggleMethod(val) {
      if (val != this.viewTpye) {
        this.$store.commit(CHANGE_VIEW);
        this.$router.push({ name: this.viewTpye });
      }
    },
    beforeLeave(element) {
      this.prevHeight = getComputedStyle(element).height;
    },
    enter(element) {
      const { height } = getComputedStyle(element);

      element.style.height = this.prevHeight;

      setTimeout(() => {
        element.style.height = height;
      });
    },
    afterEnter(element) {
      element.style.height = "auto";
    },
    backHome() {
      this.$router.push({ name: "home" });
      this.$store.commit(CHANGE_VIEW);
    },
    addContact() {
      this.$router.push({ name: "profile", params: { id: "add" } });
    },
    shuffleContact() {
      this.$store.commit(SHUFFLE_USERS);
    },
    listView() {
      this.$router.push({ name: "gallary" });
      this.$store.commit(CHANGE_VIEW);
    },
    homeButton() {
      this.$router.push({ name: this.viewTpye });
    }
  }
};
</script>
<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
  overflow: hidden;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

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

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  transform: translate(-2em, 0);
}

.zoom-enter-active,
.zoom-leave-active {
  animation-duration: 0.5s;
  animation-fill-mode: both;
  animation-name: zoom;
}

.zoom-leave-active {
  animation-direction: reverse;
}

@keyframes zoom {
  from {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }

  100% {
    opacity: 1;
  }
}
</style>