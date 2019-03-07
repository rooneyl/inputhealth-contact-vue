<template>
  <q-layout view="lHr LpR fFf">
    <!-- Header -->
    <q-layout-header>
      <q-toolbar color="primary">
        <q-btn flat dense round @click="backHome" aria-label="MENU" icon="home"/>
        <q-toolbar-title></q-toolbar-title>
        <q-btn flat dense round @click="listView" aria-label="GALARY_VIEW" icon="grid_on"/>
        <q-btn flat dense round @click="backHome" aria-label="List" icon="list"/>
        <q-btn flat dense round @click="shuffleContact" aria-label="SHUFFLE" icon="shuffle"/>
        <q-btn flat dense round @click="addContact" aria-label="ADD" icon="add"/>
      </q-toolbar>
    </q-layout-header>
    <!-- Container -->
    <q-page-container>
      <router-view v-if="!this.isError && this.rawContactList.length != 0"/>
      <div v-else-if="!this.isError"></div>
      <div v-else>There is something wrong with internet Connetction</div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState } from "vuex";
import { FETCH_USERS } from "@/store";
import { SHUFFLE_USERS } from "@/store";
export default {
  name: "LayoutDefault",
  created() {
    this.$store.dispatch(FETCH_USERS);
  },
  computed: { ...mapState(["isError", "rawContactList"]) },
  methods: {
    backHome() {
      this.$router.push({ name: "home" });
    },
    addContact() {
      this.$router.push({ name: "profile", params: { id: "add" } });
    },
    shuffleContact() {
      this.$store.commit(SHUFFLE_USERS);
    },
    listView() {
      this.$router.push({ name: "gallary" });
    }
  }
};
</script>