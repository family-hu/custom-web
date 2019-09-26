import axios, { config, orgConfig } from '../http.js'

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

  //获取医生列表
  doctorList: ({ commit }, request) => {
    return axios.post("doctor/wx", request, orgConfig).then(value => {
      return { doctorList: value.data.data, total: value.data.total.value };
    }).catch(err);
  },

  //资讯
  newsList: ({ commit }, request) => {
    return axios.post("news/wx", request, orgConfig).then(value => {
      return { newsList: value.data.data, total: value.data.total.value };
    }).catch(err);
  },

  //获取机构详情
  orgDetail: ({ commit }, request) => {
    return axios.post("newsAuthorOrgGet.mo", request, config).then(value => {
      return value.data.orgObj;
    }).catch(err);
  },

};

export default {
  state,
  mutations,
  actions,
  getters
}
