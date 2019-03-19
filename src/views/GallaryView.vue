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
      <q-select
        multiple
        chips
        color="purple"
        float-label="Tags"
        v-model="tagSearch"
        :options="tagOptionList"
      />
    </div>
    <div class="row justify-center">
      <GallaryViewItem v-for="(contact,i) in currentPageList" :contact="contact" :key="i"/>
    </div>
    <div class="row justify-center" style="padding:20px">
      <q-pagination v-model="page" :max="maxPage" :input="true"/>
    </div>
  </q-page>
</template>

<style></style>

<script>
import { mapState, mapGetters } from "vuex";
import GallaryViewItem from "@/components/GallaryViewItem";
export default {
  data() {
    return {
      page: 1,
      search: "",
      tagSearch: [],
      contactPerPage: 14
    };
  },
  components: {
    GallaryViewItem
  },
  computed: {
    ...mapState(["rawContactList"]),
    ...mapGetters(["tagOptionList"]),
    contactList() {
      if (this.search.length == 0 && this.tagSearch.length == 0) return this.rawContactList;
      else {
        this.page = 1;
        return this.rawContactList
          .filter((c) => {
            return c.name.toLowerCase().includes(this.search.toLowerCase());
          })
          .filter((c) => {
            return this.tagSearch.every((tag) => {
              return c.tags.includes(tag);
            });
          });
      }
    },
    currentPageList() {
      if (this.search.length == 0 && this.tagSearch.length == 0) {
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

.pointer {
  cursor: pointer;
}
</style>
