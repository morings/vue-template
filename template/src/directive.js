//自定义directive
import Vue from "vue";
import Vtip from 'vtip'
import 'vtip/lib/index.min.css'
import { Message} from 'element-ui';
const tip = Vtip.tip;
Vue.directive("tooltip", {
  bind(el, binding) {
    var tipInstance = null;
    el.addEventListener("mouseenter", function() {
      if(el.scrollWidth>el.offsetWidth){
        tipInstance = tip({
          target: el, // tip 的参考元素
          content:el.innerText,
          theme:"dark"
        });
        el.removeEventListener('dblclick',copy)
        el.addEventListener('dblclick',copy)
      }    
    });
    el.addEventListener("mouseleave", function() {
      tipInstance?tipInstance.destroy():'';
      tipInstance?el.removeEventListener('dblclick',copy):''
      document.removeEventListener('copy',save);
    });
    function save(e){
　　　e.clipboardData.setData('text/plain',el.innerText);//下面会说到clipboardData对象
　　　e.preventDefault();//阻止默认行为
      Message({
        message:'复制成功',
        type:'success'
      })  
　　}
    function copy(){     
      document.removeEventListener('copy',save);
      document.addEventListener('copy',save);
      document.execCommand("Copy"); // 执行浏览器复制命令
          
    }
  }
})

Vue.directive("el-select-loadmore", {
  bind(el, binding) {
    const SELECTWRAP_DOM = el.querySelector(
      '.el-select-dropdown .el-select-dropdown__wrap'
    );
    SELECTWRAP_DOM.addEventListener('scroll', function() {
      const condition =
        this.scrollHeight - this.scrollTop <= this.clientHeight;
      if (condition) {
        binding.value();
      }
    });
  }
});