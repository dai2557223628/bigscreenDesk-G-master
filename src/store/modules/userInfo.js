/**
 * Created by zhengyongbo on 17/8/21.
 */
import * as types from "../mutation-types";
const namespaced = true;
// initial state

const state = {
  userInfo: {}
};

// getters
const getters = {
  userName: state => state.userInfo.username,
  realName: state => state.userInfo.realname,
  roleName: state => state.userInfo.role_name,
};

// actions
const actions = {
  setUserInfo({ commit }, payload) {
    return new Promise(resolve => {
      commit(types.SET_USERINFO, payload);
      /*context.dispatch('setLogin', true, { root: true })*/
      commit(types.SET_LOGIN, { login: true }, { root: true });
      resolve(payload);
    });
  },

  updateUserInfo(context, payload) {
    //update
    return new Promise(resolve => {
      context.commit(types.SET_USERINFO, payload);
      resolve(payload);
    });
  },

  logout(context) {
    context.dispatch("logout", null, { root: true }); // -> 'someOtherAction'
  }
};

// mutations
const mutations = {
  [types.SET_USERINFO](state, payload) {
    state.userInfo = payload;
  },

  [types.UPDATE_USERINFO](state, payload) {
    state.userInfo = Object.assign(state.userInfo, payload);
  }
};

export default {
  namespaced,
  state,
  getters,
  actions,
  mutations
};
