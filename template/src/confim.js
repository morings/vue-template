//自定义confirm
import { MessageBox } from 'element-ui';
const confim = function(message,title='提示'){
  return MessageBox.confirm(message,title,{
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    closeOnClickModal:false,
    closeOnPressEscape:false
  })
}
export default confim;