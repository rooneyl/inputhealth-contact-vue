<template>
  <q-layout view="lHr LpR fFf">
    <!-- Header -->
    <q-layout-header>
      <q-toolbar color="primary">
        <div class="col" style="text-align:left;">
          <q-btn
            v-if="backButton"
            dense
            round
            @click="homeButton"
            aria-label="MENU"
            icon="arrow_back"
          />
        </div>
        <div class="col" style="text-align:center;">
          <q-btn-toggle
            v-model="viewToggle"
            color="white"
            text-color="blue"
            toggle-color="amber"
            toggle-text-color
            dense
            :options="[
            {label: 'List', value: 'list',icon:'list'},
            {label: 'Grid', value: 'grid',icon:'grid_on'}
          ]"
          />
        </div>
        <div class="col" style="text-align:right;">
          <q-btn flat dense round @click="backHome" aria-label="GALARY_VIEW" icon="grid_on"/>
          <q-btn flat dense round @click="listView" aria-label="List" icon="list"/>
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
import { SHUFFLE_USERS } from "@/store";
const DEFAULT_TRANSITION = "slide";
const DEFAULT_TRANSITION_MODE = "out-in";
export default {
  name: "LayoutDefault",
  data() {
    return {
      viewToggle: "list",
      mode: true,
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
    ...mapState(["isError", "rawContactList"]),
    backButton() {
      return this.$route.name == "profile";
    }
  },

  methods: {
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
      this.mode = false;
      this.$router.push({ name: "home" });
    },
    addContact() {
      this.$router.push({ name: "profile", params: { id: "add" } });
    },
    shuffleContact() {
      this.$store.commit(SHUFFLE_USERS);
    },
    listView() {
      this.mode = true;
      this.$router.push({ name: "gallary" });
    },
    homeButton() {
      console.log(this.$route.name);
      if (this.mode) {
        this.listView();
      } else {
        this.backHome();
      }
    }
  }
  // ,
  // watch: {
  //   viewToggle() {
  //     console.log("dd");
  //     if (this.viewToggle == "list ") {
  //       this.listView();
  //       return;
  //     }
  //     this.homeButton();
  //   }
  // }
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