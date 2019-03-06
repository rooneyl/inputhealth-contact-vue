<template>
  <q-layout>
    <q-page padding>
      <div class="fill">
        <div class="row">
          <div class="column1">
            <div class="fill">
              <q-card inline style="align:center; width: 90%; height: 90%">
                <q-card-media overlay-position="top">
                  <img :src="defaultImage" inline style="width:100% height: 100%">
                </q-card-media>
              </q-card>
            </div>
            <div class="center">
              <q-btn outline color="primary" label="Picture" icon="add"/>
            </div>
          </div>
          <div class="column2">
            <!-- Required Field -->
            <q-field :error="errorName" error-label="Oops, Name is required">
              <q-input v-model="contact.name" stack-label="Name"/>
            </q-field>
            <q-field :error="errorPhone" error-label="Oops, Phone number is required">
              <q-input v-model="contact.phone" type="number" stack-label="Phone Number"/>
            </q-field>
            <q-field :error="errorEmail" error-label="Oops, Email is required">
              <q-input v-model="contact.email" stack-label="Email"/>
            </q-field>
          </div>
          <br>
          <br>
          <!-- Optional Field -->
          <div inline style="width: 100%;">
            <q-input v-model="contact.street" stack-label="Address"/>
            <q-input v-model="contact.city" stack-label="City"/>
            <q-input v-model="contact.postalCode" stack-label="PostalCode"/>
            <q-select v-model="contact.province" :options="provinceOptions" stack-label="Province"/>
            <q-select v-model="contact.gender" :options="genderOptions" stack-label="Sex"/>
            <q-datetime v-model="contact.birthDay" type="date" stack-label="Birth Day"/>
            <q-input v-model="contact.note" stack-label="Note"/>
          </div>
          <div class="center">
            <q-btn outline color="primary" :label="editingStatus" icon="add" @click="handleClick"/>
          </div>
        </div>
      </div>
    </q-page>
  </q-layout>
</template>

<script>
import { Province, Gender } from "@/commons/options";
import { FETCH_USER } from "@/store";
import { mapGetters } from "vuex";
import defaultImage from "@/assets/defaultImage.jpg";

export default {
  name: "Profile",
  data() {
    return {
      errorName: false,
      errorPhone: false,
      errorEmail: false,
      genderOptions: Gender,
      provinceOptions: Province,
      contact: {
        name: "",
        email: "",
        phone: "",
        id: "",
        picture: "",
        gender: "",
        street: "",
        city: "",
        province: "",
        postalCode: ""
      }
    };
  },
  mounted() {
    const exist = this.$store.getters.getContactById(this.$route.params.id);
    if (exist != undefined) this.contact = exist;
  },
  computed: {
    defaultImage() {
      if (this.contact.picture.length != 0) return this.contact.picture;
      return defaultImage;
      // return require("@/assets/defaultImage.jpg");
    },
    editingStatus() {
      if (this.contact.id.length != 0) return "EDIT";
      return "ADD";
    }
  },
  methods: {
    handleClick() {
      this.errorName = this.contact.name == undefined || this.contact.name.length == 0;
      this.errorPhone = this.contact.phone == undefined || this.contact.phone.length == 0;
      this.errorEmail = this.contact.email == undefined || this.contact.email.length == 0;

      if (this.errorName || this.errorPhone || this.errorEmail) return;

      if (this.contact.id.length == 0) {
        this.contact.id = this.contact.phone.toString();
      }
      this.$store.dispatch(FETCH_USER, this.contact);
    }
  }
};
</script>

<style scoped>
.row {
  display: flex;
}

.column1 {
  flex: 25%;
  margin: 5px;
}

.column2 {
  flex: 70%;
  margin: 5px;
}
.center {
  text-align: center;
  width: 100%;
  padding: 20px;
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
</style>

