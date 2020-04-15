import axios from 'axios'
axios.defaults.withCredentials=true;
import {Message} from 'element-ui';
export const baseURL = window.config.baseURL;
const service = axios.create({
  baseURL:baseURL,
  headers:{
    'Content-Type':'application/json'
  }
});
const errorInfo = {
}
service.interceptors.request.use(config => {
  return config;
}, error => {  //请求错误处理
  return Promise.reject(error)
});
service.interceptors.response.use(
  response => {  //成功请求到数据
    if(response.data.success){
      return response.data.data?response.data.data:response.data
    }else{
      showerror(response.data);
      return Promise.reject()
    }  
  },
  error => {  //响应错误处理
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
export default service;


