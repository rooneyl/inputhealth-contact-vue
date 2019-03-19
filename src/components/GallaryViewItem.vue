<template>
  <span href style="cursor:pointer" @click="getDetail">
    <q-card inline class="q-ma-sm">
      <q-card-media>
        <img :src="getImage" style="width:180px; height:180px">
      </q-card-media>
      <q-card-title>
        {{name}}
        <span slot="subtitle">
          <q-icon name="phone" size="14px"/>
          {{phone}}
        </span>
        
        <span slot="main">{{contact.email}}</span>
      </q-card-title>
      <q-card-separator/>
    </q-card>
  </span>
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

<style>
.qcard-class {
  width: 10px;
  height: 10px;
  margin: 20px;
  color: black;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>