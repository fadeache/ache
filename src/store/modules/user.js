import md5 from "js-md5";
import axios from "axios";

const state = () => ({
  isLogin: false,
});

const actions = {
  async login({ commit, state, dispatch }, form) {
    let data = {};
    if (form.pwd) {
      data = {
        user: form.user,
        pwd: md5(form.pwd),
      };
    }
    const rst = await axios.post("/ache/login", data);
    if (rst.data) {
      commit("setLogin", true);
      return true;
    } else {
      commit("setLogin", false);
      return false;
    }
  },
};

const mutations = {
  setLogin(state, whether) {
    state.isLogin = whether;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
