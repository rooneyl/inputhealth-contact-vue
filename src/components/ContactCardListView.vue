<template>
  <span href @click="getDetail" class="row justify-center" style="width:100%; height:20%">
    <q-card inline class="q-ma-sm" style="width:60%;">
      <div class="row">
        <div class="col-2">
          <q-card-media class="fill">
            <img :src="getImage" style="width:200px; height:200px">
          </q-card-media>
        </div>
        <div class="col-10">
          <q-card-title>
            {{name}}
            <span slot="subtitle">
              <q-icon name="phone" size="14px"/>
              {{getPhoneNum}}
            </span>
          </q-card-title>
          <q-card-separator/>
          <q-card-main style="font-size:16px">
            <q-icon name="email"/>
            {{email}}
            <p>
              <q-icon name="home"/>
              {{address}}
            </p>
            <q-chips-input readonly v-model="contact.tags" hide-underline/>
          </q-card-main>
        </div>
      </div>
    </q-card>
  </span>
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
    },
    address() {
      return `${this.contact.street}, ${this.contact.city}, ${this.contact.province}, ${
        this.contact.postalCode
      }`;
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

.fill {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.fill img {
  flex-shrink: 0;
  min-width: 100%;
  min-height: 100%;
}

.one-line {
  border: 1px solid black;
  width: 70px;
  overflow: hidden;
  white-space: nowrap;
}
</style>