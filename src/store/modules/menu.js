/**
 * Created by zhengyongbo on 17/8/21.
 */
import * as types from "../mutation-types";
const namespaced = true;
// initial state

const state = {
  // 一级目录选中
  menuCode: ''
};

// getters
const getters = {
  menuCode: state => state.menuCode
};

// actions
const actions = {
  setMenuCode({ commit }, payload) {
    return new Promise(resolve => {
      commit(types.SET_MENU_CODE, payload);
      resolve(payload);
    });
  }
};

// mutations
const mutations = {
  [types.SET_MENU_CODE](state, payload) {
    state.menuCode = payload;
  }
};

export default {
  namespaced,
  state,
  getters,
  actions,
  mutations
};
