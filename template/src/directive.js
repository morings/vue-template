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
//el-select下拉加载
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
//  el-dialog弹窗拖拽
Vue.directive('dialogDrag', {
  bind(el, binding, vnode, oldVnode) {
    // 获取拖拽内容头部
    const dialogHeaderEl = el.querySelector('.el-dialog__header');
    // 获取拖拽内容整体 这个rrc-dialog是我自己封装的组件 如果使用element的组件应写成.el-dialog
    const dragDom = el.querySelector('.el-dialog');
    const closeDom = el.querySelector('.el-dialog__headerbtn');
    dialogHeaderEl.style.cursor = 'move';   
    //防止点击close导致拖拽
    closeDom.onclick = function(e){
      e.stopPropagation()
    }
    closeDom.onmousedown = function(e){
      e.stopPropagation()
    }
    closeDom.onmouseup = function(e){
      e.stopPropagation()
    }
    // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
    const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null);
    // 鼠标按下事件
    dialogHeaderEl.onmousedown = (e) => {
      // 鼠标按下，计算当前元素距离可视区的距离 (鼠标点击位置距离可视窗口的距离)
      const disX = e.clientX - dialogHeaderEl.offsetLeft;
      const disY = e.clientY - dialogHeaderEl.offsetTop;
      // 获取到的值带px 正则匹配替换
      let styL, styT;
      dragDom.style.top = dragDom.offsetTop+'px';
      dragDom.style.left = dragDom.offsetLeft+'px';
      dragDom.style.margin = 0;
      // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
      if (sty.left.includes('%')) {
        styL = +document.body.clientWidth * (+sty.left.replace(/\%/g, '') / 100);
        styT = +document.body.clientHeight * (+sty.top.replace(/\%/g, '') / 100);
      } else {
        styL = +sty.left.replace(/\px/g, '');
        styT = +sty.top.replace(/\px/g, '');
      };
 
      // 鼠标拖拽事件
      document.onmousemove = function (e) {
        // 通过事件委托，计算移动的距离 （开始拖拽至结束拖拽的距离）
        const l = e.clientX - disX;
        const t = e.clientY - disY;

        let finallyL = l + styL
        let finallyT = t + styT

        // 边界值判定 注意clientWidth scrollWidth区别 要减去之前的top left值
        // dragDom.offsetParent表示弹窗阴影部分
        /*if (finallyL < 0) {
          finallyL = 0
        } else if (finallyL > dragDom.offsetParent.clientWidth - dragDom.clientWidth - dragDom.offsetParent.offsetLeft) {
          finallyL = dragDom.offsetParent.clientWidth - dragDom.clientWidth - dragDom.offsetParent.offsetLeft
        }

        if (finallyT < 0) {
          finallyT = 0
        } else if (finallyT > dragDom.offsetParent.clientHeight - dragDom.clientHeight - dragDom.offsetParent.offsetLeft) (
          finallyT = dragDom.offsetParent.clientHeight - dragDom.clientHeight - dragDom.offsetParent.offsetLeft
        )*/
 
        // 移动当前元素
        dragDom.style.left = `${finallyL}px`;
        dragDom.style.top = `${finallyT}px`;
 
        //将此时的位置传出去
        //binding.value({x:e.pageX,y:e.pageY})
      };
 
      document.onmouseup = function (e) {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    }
  }
})