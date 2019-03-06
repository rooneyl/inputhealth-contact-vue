<template>
  <q-layout view="lHr LpR fFf">
    <!-- Header -->
    <q-layout-header>
      <q-toolbar color="primary">
        <q-btn flat dense round @click="backHome" aria-label="Menu" icon="home"/>

        <!-- <q-toolbar-title>Home</q-toolbar-title>
        <q-toolbar-main>Add</q-toolbar-main>-->
        <q-toolbar-title></q-toolbar-title>

        <q-btn flat dense round @click="addContact" aria-label="Shuffle" icon="shuffle"/>
        <q-btn flat dense round @click="addContact" aria-label="ADD" icon="add"/>
      </q-toolbar>
    </q-layout-header>

    <!-- Container -->
    <q-page-container>
      <div v-if="!this.isError && this.rawContactList.length != 0">
        <router-view/>
      </div>
      <div v-else-if="!this.isError">
        <!-- <Loading/> -->
      </div>
      <div v-else>There is something wrong with internet Connetction</div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState } from "vuex";
import { FETCH_USERS } from "@/store";
export default {
  name: "LayoutDefault",
  created() {
    this.$store.dispatch(FETCH_USERS);
  },
  computed: { ...mapState(["isError", "rawContactList"]) },
  methods: {
    backHome: function() {
      this.$router.push({ name: "home" });
    },
    addContact: function() {
      this.$router.push({ name: "profile", params: { id: "add" } });
    },
    add: function() {
      window.show("TTT");
    }
  }
};
</script>

<style></style>
