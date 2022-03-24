import md5 from "js-md5";
import axios from "axios";

const state = () => ({
  info: "",
});

const actions = {
  async login({ commit, state, dispatch }, form) {
    let data = {};
    if (form) {
      data = {
        user: form.user,
        pwd: md5(md5(form.pwd) + md5(md5("1424834523"))),
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
        const rst = await axios.post("/ache/login", data);
        if (rst.data) {
          commit("setUser", rst.data);
          // axios.interceptors.request.use((config) => {//添加请求头;
          // config.headers.Sign = rst.data.user;
          // config.headers = {};
          // console.log(config.headers);
          // return config;
          // });
          return true;
        } else {
          return false;
        }
      } else {
        return;
      }
    }
    const rst = await axios.post("/ache/login", data);
    if (rst.data) {
      commit("setUser", rst.data);
      commit("setCookie", data);
      return true;
    } else {
      return false;
    }
  },

  exit({ commit }, form) {
    commit("setUser", "");
    commit("clearCookie", form);
    return "退出成功！";
  },
};

const mutations = {
  setUser(state, info) {
    state.info = info;
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
