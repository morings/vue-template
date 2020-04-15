//响应弹窗
import { MessageBox } from 'element-ui';
//询问弹窗
export const $cfm = function(message,title='提示'){
  return MessageBox.confirm(message,title,{
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    closeOnClickModal:false,
    closeOnPressEscape:false
  })
}
//输入弹窗
export const $prt = function(message,title='提示',inputValidator){
  return MessageBox.prompt(message,title,{
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    closeOnClickModal:false,
    closeOnPressEscape:false,
    inputValidator:inputValidator
  })
}
