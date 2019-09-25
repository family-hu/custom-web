
//首页
const Main = () => import('./components/Main.vue');
const Home = () => import('./components/home/Home.vue');

//登录
const Login = () => import('./components/login/Login.vue');
const PhoneCodeLogin = () => import('./components/login/PhoneCodeLogin.vue');
const AccountLogin = () => import('./components/login/AccountLogin.vue');


//shop
const ShopList = () => import('./components/shop/ShopList.vue');
const Shop = () => import('./components/shop/Shop.vue');


//1010 consultation
const CourseHome = () => import('./components/consultation/CourseHome.vue');
const PsyerHome = () => import('./components/consultation/PsyerHome.vue');
const ConsultationList = () => import('./components/consultation/ConsultationList.vue');

//DoctorList
const DoctorList = () => import('./components/doctor/DoctorList.vue');

//news
const NewsList = () => import('./components/news/NewsList.vue');

export const routes = [
  {path: "/login", component: Login, meta: {title: "登录"}},
  {path: "/phoneCodeLogin", component: PhoneCodeLogin, meta: {title: "手机号登录"}},
  {path: "/accountLogin", component: AccountLogin, meta: {title: "用户名登录"}},




  //shop
  {path: "/shopList", component: ShopList, meta: { title: "健康服务列表", keepAlive: false } },
  {path: "/shop", component: Shop, meta: { title: "健康服务", keepAlive: false } },

  //1010
  {path: "/courseHome", component: CourseHome, meta: { title: "健康课程", keepAlive: false } },
  {path: "/psyerHome", component: PsyerHome, meta: { title: "咨询师", keepAlive: false } },
  {path: "/consultationList", component: ConsultationList, meta: { title: "心里测评", keepAlive: false } },

  //doctorList
  {path: "/doctorList", component: DoctorList, meta: { title: "医生列表", keepAlive: false } },

  //news
  {path: "/newsList", component: NewsList, meta: { title: "资讯列表", keepAlive: false } },



  {path: "/customHome", component: Main, meta: {title: "自定义服务", keepAlive: false}},
  // {path: "/home", component: Home, meta: {title: "", keepAlive: true}},
  // {path: "", component: Login, meta: {title: "登录", keepAlive: false}},
  // {path: '*', redirect:"/"}
];

