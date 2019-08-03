// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './assets/styles/reset.css'
import './assets/styles/border.css'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/styles/index.css'
import Vue from 'vue'
import Navigation from 'vue-navigation'
import ECharts from 'vue-echarts'
import 'echarts'
import 'babel-polyfill'
import ElementUI from 'element-ui'
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'//引入图片预览插件
import VueClipboard from 'vue-clipboard2'
import animate from 'animate.css' //引入动画
import App from './App'
import router from './router'
import $http from "./Api/api"
import {deepClone} from "./tool"
import bus from "./Bus"
import $cfm from "./confim"
import { Message} from 'element-ui';
import{setCookie_,getCookie,delCookie} from "./cookie"
import './directive'
import './globalMixin'
Vue.use(Navigation, {router})
ElementUI.TableColumn.props.showOverflowTooltip = {type:ElementUI.TableColumn.props.showOverflowTooltip,default:true};
ElementUI.Select.props.filterable = {type:ElementUI.Select.props.filterable,default:true};
console.log(ElementUI)
Vue.use(ElementUI,{ size: 'small'})
Vue.use(VueClipboard);
Vue.use(Viewer);
Vue.use(animate)
Vue.config.productionTip = false
Vue.prototype.$http = $http;
Vue.prototype.$cfm = $cfm;
Vue.prototype.$deepClone = deepClone;
Vue.prototype.$bus = bus;
Vue.prototype.$setCookie = setCookie_;
Vue.prototype.$getCookie = getCookie;
Vue.prototype.$delCookie = delCookie;
Vue.component('v-chart', ECharts)
Date.prototype.Format = function (fmt) { //author: meizz 
  var o = {
      "M+": this.getMonth() + 1, //月份 
      "d+": this.getDate(), //日 
      "h+": this.getHours(), //小时 
      "m+": this.getMinutes(), //分 
      "s+": this.getSeconds(), //秒 
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
      "S": this.getMilliseconds() //毫秒 
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
  if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
