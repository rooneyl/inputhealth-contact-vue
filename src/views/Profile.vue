<template>
  <q-page padding class="docs-chip row justify-center">
    <div class="col" style="width: 400px; max-width: 45vw;">
      <div class="row" style="width:100%">
        <div class="col-4 justify-center" style="min-width:200px;">
          <q-card-media overlay-position="top">
            <img :src="defaultImage" inline style="width:100% height: 100%">
          </q-card-media>
          <div class="row justify-center" style="width:100%">
            <q-btn outline disable color="primary" label="Picture" icon="add"/>
          </div>
        </div>
        <div class="col justify-center" style="min-width:200px;">
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
        <!-- Optional Field -->
        <div class="row">
          <div class="col-12">
            <q-input style="width:100%" v-model="contact.street" stack-label="Address"/>
          </div>
          <div class="col-12">
            <q-input v-model="contact.city" stack-label="City"/>
          </div>
          <div class="col-12">
            <q-input v-model="contact.postalCode" stack-label="PostalCode"/>
          </div>
          <div class="col-12">
            <q-select v-model="contact.province" :options="provinceOptions" stack-label="Province"/>
          </div>
          <div class="col-12">
            <q-select v-model="contact.gender" :options="genderOptions" stack-label="Gender"/>
          </div>
          <div class="col-12">
            <q-datetime v-model="contact.birthDay" type="date" stack-label="Birth Day"/>
          </div>
          <div class="col-12">
            <q-input v-model="contact.note" stack-label="Note"/>
          </div>
          <div class="col-12">
            <q-chips-input v-model="contact.tags" style="width:100%" stack-label="Tags"/>
          </div>
        </div>
        <!-- BUTTONS -->
        <div class="row justify-center" style="width:100%;">
          <span>
            <q-btn
              outline
              color="primary"
              label="SAVE"
              icon="add"
              @click="handleClick"
              style="margin:10px; width:125px"
            />
            <q-btn
              v-if="editingStatus"
              outline
              color="primary"
              label="DELETE"
              icon="delete"
              @click="deleteContact"
              style="margin:10px; width:125px"
            />
          </span>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { Province, Gender } from "@/commons/options";
import { FETCH_USER, DELETE_USER } from "@/store";
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
        note: "",
        province: "",
        postalCode: "",
        tags: []
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
      return this.contact.id.length != 0;
    }
  },
  methods: {
    deleteContact() {
      this.$store.dispatch(DELETE_USER, this.contact);
    },
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
img {
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  padding: 10px;
}
</style>

