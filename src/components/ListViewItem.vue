<template>
  <q-item :to="contact.id.toString()">
    <q-item-side :avatar="getImage"/>
    <q-item-main>
      <q-item-tile label line="1">{{name}}</q-item-tile>
      <q-item-tile sublabel line="1">{{phone}}</q-item-tile>
    </q-item-main>
  </q-item>
</template>

<script>
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
      if (!this.contact.picture) return require("@/assets/defaultImage.jpg");
      return this.contact.picture;
    },
    getPhoneNum() {
      if (this.contact.phone.length == 10) {
        return `(${this.contact.phone.slice(0, 3)})-${this.contact.phone.slice(
          3,
          6
        )}-${this.contact.phone.slice(6, 10)}`;
      }
    }
  },
  methods: {
    getDetail() {
      this.$router.push(this.contact.id.toString());
    }
  }
};
</script>

<style scoped>
</style>