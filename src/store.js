import Vue from "vue";
import Vuex from "vuex";
import { Get, Delete, Update, Post } from "@/services/EventService";
import { Loading } from "quasar";
import router from "@/router";
import _ from "lodash";

Vue.use(Vuex);

// Mutations
export const SET_USERS = "SET_USERS";
export const ADD_USER = "ADD_USER";
export const REMOVE_USER = "REMOVE_USER";
export const SHUFFLE_USERS = "SHUFFLE_USERS";
export const REMOVE_TAG = "REMOVE_TAG";
export const CHANGE_VIEW = "CHANGE_VIEW";

export const FLAG_ERROR = "FLAG_ERROR";
export const UNFLAG_ERROR = "UNFLAG_ERROR";

// Actions
export const FETCH_USERS = "FETCH_USERS";
export const FETCH_USER = "FETCH_USER";
export const DELETE_USER = "DELETE_USER";
export const UPDATE_USER = "UPDATE_USER";

export default new Vuex.Store({
  state: {
    viewType: "gallary-view",
    rawContactList: [],
    isError: false
  },
  mutations: {
    [SET_USERS](state, payload) {
      payload.forEach((contact) => {
        contact.tags = !contact.tags || contact.tags == "" ? [] : contact.tags.split(",");
      });
      state.rawContactList = payload.sort((a, b) => a.name.localeCompare(b.name));
    },
    [REMOVE_USER](state, payload) {
      state.rawContactList = state.rawContactList.filter((c) => c.id != payload.id);
    },
    [FLAG_ERROR](state) {
      state.isError = true;
    },
    [UNFLAG_ERROR](state) {
      state.isError = false;
    },
    [SHUFFLE_USERS](state) {
      state.rawContactList = _.shuffle(state.rawContactList);
    },
    [CHANGE_VIEW](state) {
      state.viewType = state.viewType == "gallary-view" ? "list-view" : "gallary-view";
    }
  },
  actions: {
    [FETCH_USERS]({ commit }) {
      Loading.show({
        spinnerColor: "blue"
      });

      Get()
        .then((res) => {
          commit(UNFLAG_ERROR);
          commit(SET_USERS, res.data);
        })
        .catch((e) => {
          console.log(e);
          commit(FLAG_ERROR);
        })
        .then(() => Loading.hide());
    },
    [FETCH_USER]({ commit, state, dispatch }, contact) {
      Loading.show({
        spinnerColor: "blue"
      });
      Post(contact)
        .then(() => {
          dispatch(FETCH_USERS);
          router.push({ name: state.viewType });
        })
        .catch((e) => {
          console.log(e);
          commit(FLAG_ERROR);
        })
        .then(() => Loading.hide());
    },
    [UPDATE_USER]({ commit, state, dispatch }, contact) {
      Loading.show({
        spinnerColor: "blue"
      });
      Update(contact)
        .then(() => {
          dispatch(FETCH_USERS);
          router.push({ name: state.viewType });
        })
        .catch((e) => {
          console.log(e);
          commit(FLAG_ERROR);
        })
        .then(() => Loading.hide());
    },
    [DELETE_USER]({ commit, state, dispatch }, contact) {
      Loading.show({
        spinnerColor: "blue"
      });

      Delete(contact.id)
        .then(() => {
          dispatch(FETCH_USERS);
          router.push({ name: state.viewType });
        })
        .catch((e) => {
          console.log(e);
          commit(FLAG_ERROR);
        })
        .then(() => Loading.hide());
    }
  },
  getters: {
    getContactById: (state) => (id) => state.rawContactList.find((c) => c.id == id),
    tagOptionList: (state) => {
      const set1 = new Set();
      state.rawContactList.forEach((contact) => contact.tags.forEach((tag) => set1.add(tag)));

      const result = [];
      set1.forEach((c) => {
        result.push({ label: c, value: c });
      });
      return result;
    }
  }
});
