import md5 from "js-md5";
import axios from "axios";

const state = () => ({
  info: "",
});

const actions = {
  async login({ commit, state, dispatch }, form) {
    // console.log(md5(md5("123456") + md5(md5("1424834523"))));
    // console.log(md5('20220807001297216你好0121oRy8XTp__OybVNxX2Df9'));
    if (form) {
      let data = {
        user: form.user,
        pwd: md5(md5(form.pwd) + md5(md5("1424834523"))),
      };
      const rst = await axios.post("/ache/login", data);
      if (rst.data) {
        commit("setUser", rst.data);
        commit("setCookie", data);
        return true;
      } else {
        return false;
      }
    } else {
      if (document.cookie) {
        let strcookie = document.cookie; //获取cookie字符串
        let arrcookie = strcookie.split("; "); //分割
        for (let i = 0; i < arrcookie.length; i++) {
          //遍历匹配
          let arr = arrcookie[i].split("=");
          let data = {
            user: arr[0],
            pwd: arr[1],
          };
          const rst = await axios.post("/ache/login", data);
          if (rst.data) {
            commit("setUser", rst.data);
            return true;
          }
        }
        return false;
      } else {
        return false;
      }
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
