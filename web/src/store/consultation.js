import axios,{ shoppingConfigPay } from '../http.js'

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
  //课程查询
  jvCosInfoColumnQuery: ({ commit }, request) => {
    return axios.post("sk/jvCosInfoColumnQuery.mo", request, shoppingConfigPay).then(value => {
      return value.data.data;
    }).catch(err);
  },
  //课程分组查询
  jvCosGroupQuery: ({ commit }, request) => {
    return axios.post("sk/jvCosGroupQuery.mo", request, shoppingConfigPay).then(value => {
      return value.data.data;
    }).catch(err);
  },
   //咨询师查询
  psyerQuery: ({ commit }, request) => {
    return axios.post("sk/jvPsycDocQuery.mo", request, shoppingConfigPay).then(value => {
      return value.data.data;
    }).catch(err);
  },
  //心里测评
  evalListQuery: ({ commit }, request) => {
    return axios.post("sk/jvPsycEvalListQuery.mo", request, shoppingConfigPay).then(value => {
      return value.data.data;
    }).catch(err);
  },
};

export default {
  state,
  mutations,
  actions,
  getters
}
