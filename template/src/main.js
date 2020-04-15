// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './assets/styles/reset.css'
import './assets/styles/border.css'
//引入初始化css
import 'element-ui/lib/theme-chalk/index.css'//引入elmentui样式
import './assets/styles/index.css'
import Vue from 'vue'
import Navigation from 'vue-navigation'//前进刷新后退不刷新组件
import ECharts from 'vue-echarts'
import 'babel-polyfill'//es6打包转es5
import ElementUI from 'element-ui'
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
//引入图片预览插件
import animate from 'animate.css' //引入动画animate.css
import App from './App'
import router from './router'
import $http from "./Api/api"
import {deepClone} from "./tool"
import bus from "./Bus"
import {$cfm,$prt} from "./confim"
import{getCookie,delCookie} from "./cookie"
import './directive'
import './globalMixin'
Vue.use(Navigation, {router})
ElementUI.TableColumn.props.showOverflowTooltip = {type:ElementUI.TableColumn.props.showOverflowTooltip,default:true};//设置elment的table文字超出显示省略号
ElementUI.Select.props.filterable = {type:ElementUI.Select.props.filterable,default:true};//设置elment的select默认带有filter功能
console.log(ElementUI)
Vue.use(ElementUI,{ size: 'small'})
Vue.use(Viewer);
Vue.use(animate)
Vue.config.productionTip = false//阻止启动生产消息，常用作指令。
Vue.prototype.$http = $http;
Vue.prototype.$cfm = $cfm;
Vue.prototype.$prt = $cfm;
Vue.prototype.$deepClone = deepClone;
Vue.prototype.$bus = bus;
Vue.prototype.$setCookie = setCookie;
Vue.prototype.$getCookie = getCookie;
Vue.prototype.$delCookie = delCookie;
Vue.component('v-chart', ECharts)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
