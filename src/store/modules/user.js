import md5 from "js-md5";
import axios from "axios";

const state = () => ({
  isLogin: false,
});

const actions = {
  async login({ commit, state, dispatch }, form) {
    let data = {};
    if (form) {
      data = {
        user: form.user,
        pwd: md5(form.pwd),
      };
    } else {
      if (document.cookie) {
        data = {
          user: document.cookie.substr(0, document.cookie.indexOf("=")),
          pwd: document.cookie.substr(
            document.cookie.indexOf("=") + 1,
            document.cookie.length - document.cookie.indexOf("=")
          ),
        };
        commit("setLogin", true);
        return;
      } else {
        return;
      }
    }
    const rst = await axios.post("/ache/login", data);
    if (rst.data) {
      commit("setLogin", true);
      commit("setCookie", data);
      return true;
    } else {
      return false;
    }
  },

  exit({ commit }, form) {
    commit("setLogin", false);
    commit("clearCookie", form);
    return "退出成功！";
  },
};

const mutations = {
  setLogin(state, whether) {
    state.isLogin = whether;
  },
  setCookie(state, userInfo) {
    let expTime = new Date();
    expTime.setTime(expTime.getTime() + 2 * 60 * 60 * 1000);
    document.cookie =
      userInfo.user + "=" + userInfo.pwd + ";expires=" + expTime.toUTCString();
  },
  clearCookie(state, userInfo) {
    let expTime = new Date();
    expTime.setTime(expTime.getTime() - 1);
    document.cookie = userInfo.user + "=" + ";expires=" + expTime.toUTCString();
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
