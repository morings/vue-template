import axios from 'axios'
axios.defaults.withCredentials=true;
import { Loading,Message} from 'element-ui';
export const baseURL = window.config.baseURL;
const service = axios.create({
  baseURL:baseURL
});
const errorInfo = {
}
var MaskLoad = null;
service.interceptors.request.use(config => {
  document.getElementById("transMask").style.display = "block";
  if(config.Loading){
    MaskLoad = Loading.service({
      lock: true,
      text: config.Loading,
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
  }
  config.headers['Content-Type'] = 'application/json';
  if(config.url.indexOf("/HWJHP/client/image/upload")!=-1){
    config.headers['Content-Type'] = 'multipart/form-data'
  }else{ 
    if(typeof(config.data)=="string"){
      var data = JSON.parse(config.data)
    }else{
      var data = config.data;
    }
  }
  deleteEmptyProperty(data)
  config.data = JSON.stringify(data);  
  return config;
}, error => {  //请求错误处理
  return Promise.reject(error)
});
service.interceptors.response.use(
  response => {  //成功请求到数据
      document.getElementById("transMask").style.display = "none";
      if(MaskLoad){
        MaskLoad.close();
        MaskLoad = null;
      }
      if(response.data.success){
        if(response.config.data && typeof(response.config.data) == 'string'){
          var jsonData = JSON.parse(response.config.data);
          if(jsonData.showSuccess){
            Message({message:response.data.msg,type:'success'})
          }
        }
        return response.data.data?response.data.data:response.data
      }else{
        showerror(response.data);
        return Promise.reject()
      }  
  },
  error => {  //响应错误处理
    document.getElementById("transMask").style.display = "none";
    if(MaskLoad){
      MaskLoad.close();
      MaskLoad = null;
    }
    showerror(error.response.data);
    return Promise.reject(error)
  }
);
function showerror(data){  
  Message({
    type:"error",
    message:data.msg
  });
};
function deleteEmptyProperty(object){
  for (var i in object) {
    var value = object[i];
    if (typeof value === 'object') {
      if (Array.isArray(value)) {
        if (value.length == 0) {
          delete object[i];
          continue;
        }
      }
      deleteEmptyProperty(value);
      if (isEmpty(value)) {
        delete object[i];
      }
    } else {
      if (value === '' || value === null || value === undefined) {
        delete object[i];
      }
    }
  }
}

function isEmpty(object) {
  for (var name in object) {
    return false;
  }
  return true;
}

export default service;


