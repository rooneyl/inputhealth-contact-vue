import Vue from "vue";
import Vuex from "vuex";
import EventService from "@/services/EventService";
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

const cap = (str) => {
  if (str.length == 1) return str.toUpperCase();
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const capEach = (sentence) => {
  return sentence
    .split(" ")
    .map(cap)
    .join(" ");
};

const randomTags = () => {
  return ["Family", "Work", "Friend"].filter(() => Math.random() >= 0.3);
};

const manipulateList = (rawContactList) => {
  const boxContact = (contact) => {
    return {
      name: cap(contact.name.first) + " " + cap(contact.name.last),
      email: contact.email,
      phone: contact.phone.split("-").join(""),
      id: contact.phone,
      picture: contact.picture.large,
      gender: contact.gender,
      street: capEach(contact.location.street),
      city: capEach(contact.location.city),
      province: capEach(contact.location.state),
      birthday: contact.dob.date,
      postalCode: contact.location.postcode.toUpperCase(),
      tags: randomTags()
    };
  };
  return rawContactList.map(boxContact).sort((a, b) => a.name.localeCompare(b.name.first) > 0);
};

export default new Vuex.Store({
  state: {
    viewTpye: "home",
    rawContactList: [],
    isError: false
  },
  mutations: {
    [SET_USERS](state, payload) {
      state.rawContactList = payload.sort((a, b) => a.name.localeCompare(b.name));
    },
    [ADD_USER](state, payload) {
      state.rawContactList = state.rawContactList.filter((x) => x.id != payload.id);
      state.rawContactList.push(payload);
      state.rawContactList = state.rawContactList.sort((a, b) => a.name.localeCompare(b.name));
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
      state.viewTpye = state.viewTpye == "home" ? "gallary" : "home";
    }
  },
  actions: {
    [FETCH_USERS]({ commit }) {
      Loading.show({
        spinnerColor: "blue"
      });

      EventService()
        .then((res) => {
          commit(UNFLAG_ERROR);
          commit(SET_USERS, manipulateList(res.data.results));
        })
        .catch((e) => {
          console.log(e);
          commit(FLAG_ERROR);
        })
        .then(() => Loading.hide());
    },
    [FETCH_USER]({ commit, state }, contact) {
      Loading.show({
        spinnerColor: "blue"
      });

      setTimeout(() => {
        Loading.hide();
        commit(ADD_USER, contact);
        router.push({ name: state.viewTpye });
      }, 2000);
    },
    [DELETE_USER]({ commit, state }, contact) {
      Loading.show({
        spinnerColor: "blue"
      });

      setTimeout(() => {
        Loading.hide();
        commit(REMOVE_USER, contact);
        router.push({ name: state.viewTpye });
      }, 2000);
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
