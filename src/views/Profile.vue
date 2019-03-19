<template>
  <div class="q-mx-lg">
    <q-page padding class="docs-chip row justify-center" style="max-width:800px;">
      <q-card class="q-ma-sm">
        <q-card-media overlay-position="bottom">
          <img :src="getImage" style="width:220px; height:220px">
          <q-card-title slot="overlay" style="text-align: center;">
            <label class="custom-input" for="file" style="cursor: pointer;">
              {{this.contact.picture ? "Change Picture":"Upload Picture"}}
              <q-icon name="library_add"/>
            </label>
          </q-card-title>
        </q-card-media>
      </q-card>
      <q-field class="col-12" :error="errorName" error-label="Oops, Name is required">
        <q-input v-model="contact.name" stack-label="Name"/>
      </q-field>
      <q-field class="col-12" :error="errorPhone" error-label="Oops, Phone number is required">
        <q-input v-model="contact.phone" @input="updateInput" stack-label="Phone Number"/>
      </q-field>
      <q-field class="col-12" :error="errorEmail" error-label="Oops, Email is required">
        <q-input v-model="contact.email" stack-label="Email"/>
      </q-field>

      <q-input class="col-12" v-model="contact.street" stack-label="Address"/>
      <q-input class="col-12" v-model="contact.city" stack-label="City"/>
      <q-input class="col-12" v-model="contact.postalCode" stack-label="PostalCode"/>
      <q-select
        class="col-12"
        v-model="contact.province"
        :options="provinceOptions"
        stack-label="Province"
      />
      <q-select
        class="col-12"
        v-model="contact.gender"
        :options="genderOptions"
        stack-label="Gender"
      />
      <q-datetime class="col-12" v-model="contact.birthday" type="date" stack-label="Birth Day"/>
      <q-input class="col-12" v-model="contact.note" stack-label="Note"/>

      <q-chips-input v-model="contact.tags" style="width:100%" stack-label="Tags"/>
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
      <input type="file" name="file" id="file" @change="onFileChange" class="inputfile">
    </q-page>
  </div>
</template>

<script>
import { Province, Gender } from "@/commons/options";
import { FETCH_USER, DELETE_USER, UPDATE_USER } from "@/store";

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
      this.contact = Object.assign({}, empty);
      this.editingStatus = false;
    }
  },

  beforeRouteUpdate(to, from, next) {
    if (to.path == "/add") this.contact = empty;
    this.editingStatus = false;
    next();
  },
  computed: {
    getImage() {
      if (!this.contact.picture) return require("@/assets/defaultImage.jpg");
      return this.contact.picture;
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
      if (this.editingStatus)
        return this.$store.dispatch(UPDATE_USER, { contact: this.contact, image: this.image });
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
    onFileChange(e) {
      const file = e.target.files[0];
      this.image = file;
      this.contact.picture = URL.createObjectURL(event.target.files[0]);
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
.custom-input {
  font-size: 0.75em;
  color: white;
  display: inline-block;
}

.inputfile {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}
</style>
