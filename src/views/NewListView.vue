<template>
  <q-page padding>
    <div style="padding:20px">
      <q-input
        v-model="search"
        float-label="Search"
        clearable
        :after="[{icon: 'arrow_forward', content: true, handler () {}}]"
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
      <q-list link inset-separator style="width:95%">
        <ListViewItem v-for="(contact,i) in currentPageList" :contact="contact" :key="i"/>
      </q-list>
    </div>
    <div class="row justify-center" style="padding:20px">
      <q-pagination v-model="page" :max="maxPage" :input="true"/>
    </div>
  </q-page>
</template>

<script>
import ListViewItem from "@/components/ListViewItem";
import { mapState, mapGetters } from "vuex";
export default {
  name: "home",
  data() {
    return {
      tagSearch: [],
      page: 1,
      search: "",
      contactPerPage: 10
    };
  },
  components: {
    ListViewItem
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
  },
  methods: {
    getDetail(contact) {
      this.$router.push(contact.id);
    }
  }
};
</script>

<style scoped>
</style>