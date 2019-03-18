<template>
  <div class="row justify-center" style="width:100%">
    <span href @click="getDetail" style="width:70%">
      <q-card style="margin:20px;">
        <div class="row">
          <div>
            <q-card-media>
              <img :src="getImage">
            </q-card-media>
          </div>
          <div>
            <q-card-title>
              {{name}}
              <span slot="subtitle">
                <q-icon name="phone" size="14px"/>
                {{phone}}
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
  </div>
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
      if (!this.contact.picture) return require("@/assets/defaultImage.jpg");
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
      this.$router.push(this.contact.id.toString());
    },
    deleteContact() {
      this.$store.dispatch(DELETE_USER, this.contact);
    }
  }
};
</script>

<style>
.fill img {
  min-width: 100%;
  min-height: 100%;
}
</style>