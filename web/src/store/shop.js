import axios, { config, shoppingConfig, shoppingConfigPay } from '../http.js'

const state = {

};

const err = (error) => {
  throw new Error(error.data.rtnMsg);
};

const getters = {

};

const mutations = {

};

const actions = {
  //组关联套餐列表
  groupPackagesList: ({
    commit
  }, request) => {
    return axios.post("medical/packages/api/groupPackagesList", request, shoppingConfig).then(data => {
      return data.data;
    }).catch(err);
  },
  //获取套餐列表
  packagesList: ({
    commit
  }, request) => {
    return axios.post("medical/packages/api/all", request, shoppingConfig).then(data => {
      return data.data;
    }).catch(err);
  },

};

export default {
  state,
  mutations,
  actions,
  getters
}
