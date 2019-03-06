<template>
  <a href inline style="all: unset" @click.prevent="getDetail">
    <q-card inline class="q-ma-sm">
      <q-card-media>
        <img :src="getImage" style="width:180px; height:180px">
      </q-card-media>
      <q-card-title>
        {{name}}
        <span slot="subtitle">{{phone}}</span>
        <span slot="main">{{contact.email}}</span>
      </q-card-title>
      <q-card-actions>
        <q-btn flat icon="edit">EDIT</q-btn>
        <q-btn flat icon="delete" @click="deleteContact">DELETE</q-btn>
      </q-card-actions>
    </q-card>
  </a>
</template>

<script>
import { DELETE_USER } from "@/store";
const shortName = (name) => {
  if (name.length > 16) {
    let shortName = name.split(" ");
    return shortName[0] + shortName[0][0];
  }
  return name;
};

export default {
  props: {
    contact: {
      type: Object,
      required: true
    }
  },
  computed: {
    name() {
      return shortName(this.contact.name);
    },
    phone() {
      return this.contact.phone;
    },
    email() {
      return this.contact.email;
    },
    getImage() {
      if (this.contact.picture.length == 0) return require("@/assets/defaultImage.jpg");
      return this.contact.picture;
    }
  },
  methods: {
    getDetail() {
      this.$router.push(this.contact.id);
    },
    deleteContact() {
      this.$store.dispatch(DELETE_USER, this.contact);
    }
  }
};
</script>

<style>
.qcard-class {
  width: 10px;
  height: 10px;
  margin: 20px;
  color: black;
}
</style>