<template>
  <q-page padding class="docs-chip row justify-center">
    <div class="col" style="width: 400px; max-width: 45vw;">
      <div class="row" style="width:100%">
        <div class="col-4 justify-center" style="min-width:200px;">
          <q-card-media overlay-position="top">
            <!-- <img :src="defaultImage" inline style="width:100% height: 100%"> -->
            <picture-input
              @change="onChange"
              width="600"
              height="600"
              margin="16"
              accept="image/jpeg, image/png"
              size="10"
              buttonClass="btn"
            />
          </q-card-media>
          <!-- <div class="row justify-center" style="width:100%"> -->
          <!--   <q-btn outline disable color="primary" label="Picture" icon="add"/> -->
          <!-- </div> -->
        </div>
        <div class="col justify-center" style="min-width:200px;">
          <!-- Required Field -->
          <q-field :error="errorName" error-label="Oops, Name is required">
            <q-input v-model="contact.name" stack-label="Name"/>
          </q-field>
          <q-field :error="errorPhone" error-label="Oops, Phone number is required">
            <q-input v-model="contact.phone" @input="updateInput" stack-label="Phone Number"/>
          </q-field>
          <q-field :error="errorEmail" error-label="Oops, Email is required">
            <q-input v-model="contact.email" stack-label="Email"/>
          </q-field>
        </div>
        <!-- Optional Field -->
        <div class="row" style="min-width:200px;">
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
            <q-datetime v-model="contact.birthday" type="date" stack-label="Birth Day"/>
          </div>
          <div class="col-12">
            <q-input v-model="contact.note" stack-label="Note"/>
          </div>
          <input type="file" @change="onFileChange">
          <!-- dd -->
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
import { FETCH_USER, DELETE_USER, UPDATE_USER } from "@/store";
import { mapGetters } from "vuex";
import defaultImage from "@/assets/defaultImage.jpg";
import PictureInput from "vue-picture-input";

const empty = {
  name: "",
  email: "",
  phone: "",
  picture: "",
  gender: "",
  street: "",
  city: "",
  note: "",
  province: "",
  birthday: "",
  postalCode: "",
  tags: []
};
export default {
  name: "Profile",
  components: {
    PictureInput
  },
  data() {
    return {
      editingStatus: true,
      errorName: false,
      errorPhone: false,
      errorEmail: false,
      genderOptions: Gender,
      provinceOptions: Province,
      contact: empty
    };
  },
  mounted() {
    const exist = this.$store.getters.getContactById(this.$route.params.id);
    if (exist != undefined) {
      this.contact = exist;
      this.editingStatus = true;
    } else {
      this.editingStatus = false;
    }
  },

  beforeRouteUpdate(to, from, next) {
    if (to.path == "/add") this.contact = empty;
    this.editingStatus = false;
    next();
  },
  computed: {
    defaultImage() {
      if (!this.contact.picture) return this.contact.picture;
      return defaultImage;
      // return require("@/assets/defaultImage.jpg");
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
      if (this.editingStatus) return this.$store.dispatch(UPDATE_USER, this.contact);
      console.log(this.image);
      console.log("Ddd");
      this.$store.dispatch(FETCH_USER, { contact: this.contact, image: this.image });
    },
    updateInput(newVal) {
      const numOnly = newVal.replace(/\D/g, "");
      if (numOnly.length > 6) {
        this.contact.phone =
          numOnly.slice(0, 3) + "-" + numOnly.slice(3, 6) + "-" + numOnly.slice(6);
      } else {
        this.contact.phone = numOnly;
      }
    },
    onChange(image) {
      console.log("New picture selected!");
      if (image) {
        console.log("Picture loaded.");
        this.image = image;
      } else {
        console.log("FileReader API not supported: use the <form>, Luke!");
      }
    },
    onFileChange(e) {
      const file = e.target.files[0];
      this.image = file;
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
