import axios,{ config , orgConfig} from '../http.js'

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

  //微页面
  orgShow: ({ commit }, request) => {
    return axios.post("micro/page/show", request, orgConfig).then(value => {
      return value.data;
    }).catch(err);
  },

  //导航
  navigations: ({ commit }, request) => {
    return axios.post("micro/navigations", request, orgConfig).then(value => {
      return value.data;
    }).catch(err);
  },

  //分享
  busipageshare: ({ commit }, request) => {
    return axios.post("busipageshare.mo", request, config).then(value => {
      return value.data;
    }).catch(err);
  },


};

export default {
  state,
  mutations,
  actions,
  getters
}
