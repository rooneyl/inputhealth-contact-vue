<template>
  <q-page padding>
    <div style="padding:20px">
      <q-input
        v-model="search"
        float-label="Search"
        clearable
        :after="[{icon: 'arrow_forward', content: true, handler () {}}]"
        @
      />
    </div>
    <div class="row justify-center">
      <ContactCard v-for="(contact,i) in currentPageList" :contact="contact" :key="i"/>
    </div>
    <div class="row justify-center" style="padding:20px">
      <q-pagination v-model="page" :max="maxPage" :input="true"/>
    </div>
  </q-page>
</template>

<style></style>

<script>
import { mapState } from "vuex";
import ContactCard from "@/components/ContactCardListViewCopy";
export default {
  name: "home",
  data() {
    return {
      page: 1,
      search: "",
      contactPerPage: 8
    };
  },
  components: {
    ContactCard
  },
  computed: {
    ...mapState(["rawContactList"]),
    contactList() {
      if (this.search.length == 0) return this.rawContactList;
      else {
        this.page = 1;
        return this.rawContactList.filter((c) => {
          return (
            c.name.toLowerCase().includes(this.search.toLowerCase()) ||
            c.tags.filter((tag) => tag.toLowerCase().includes(this.search.toLowerCase())).length > 0
          );
        });
      }
    },
    currentPageList() {
      if (this.search.length == 0) {
        let beginningIndex = (this.page - 1) * this.contactPerPage;
        let endingIndex = beginningIndex + this.contactPerPage;
        return this.contactList.slice(beginningIndex, endingIndex);
      } else {
        let beginningIndex = (this.page - 1) * this.contactPerPage;
        let endingIndex = beginningIndex + this.contactPerPage;
        return this.contactList.slice(beginningIndex, endingIndex);
      }
    },
    maxPage() {
      return Math.ceil(this.contactList.length / this.contactPerPage);
    }
  }
};
</script>

<style>
.search-bar {
  width: 96%;
  height: 10%;
  margin: 2%;
}
.s-bar {
  width: 100%;
  justify-content: center;
}
</style>
