<template>
  <el-input   ref="elInput" :value='value' :disabled="disabled"  @input="handInput_" @blur="blur" :readonly='readonly' :size="size" :type="type" :placeholder="placeholder" >
    <template slot="append">
      <slot name="append"></slot>
    </template>
  </el-input>
</template>
<script>
export default {
  props:{
    value:{

    },
    //保留几位小数
    digit:{
      default:0
    },
    //是否可用
    disabled:{
      default:false
    },
    //最大值
    max:{
      default:false
    },
    //是否能输复制
    negative:{
      default:false
    },
    //是否只读
    readonly:{
      default:false
    },
    size:{
      default:"large"
    },
    //占位符
    placeholder:{
      default:''
    },
    type:{
      default:'text'
    }
  },
  
  methods:{
    blur(){
      this.$emit('blur')
    },
    toNonExponential(num) {
        var m = num.toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/);
        return num.toFixed(Math.max(0, (m[1] || '').length - m[2]));
    },
    handInput_(value){
      if(this.negative){
        //负数处理
        if(this.digit==0){
          let reg = /(^\-{0,1}\d+$)/;
          if(!reg.test(value)){
            return document.execCommand('Undo')
          }
        }else if(this.digit<100){
          let reg = new RegExp('(^\\-{0,1}\\d+$)|(^\\-{0,1}\\d+\\.\\d{0,'+this.digit+'}$)');
          if(!reg.test(value)){
            return document.execCommand('Undo')
          }
        }else{
          let reg = /(^\-{0,1}\d*$)|(^\-{0,1}\d+\.\d*$)/
          if(!reg.test(value)){
            return document.execCommand('Undo')
          }
        }
      }else if(this.digit == 0){//正数处理
        let reg = /^\d+$/;
        if(!reg.test(value)){
          return document.execCommand('Undo')
        }
      }else if(this.digit<100){
        let reg = new RegExp('(^\\d+$)|(^\\d+\\.\\d{0,'+this.digit+'}$)');
        if(!reg.test(value)){
          return document.execCommand('Undo')
        }
      }else{
        if(isNaN(value)){
          return document.execCommand('Undo')
        }
      }
      if(this.max!==false && value > this.max){
        value = max;
      }
      this.$emit('input', value);          
    },
    //只包括正数
    handInput(e){
      if(this.negative){
        return this.handNegative(e)
      }
      let self = this;
      var value = e;
      if(self.digit==0){
        value = value.replace(/[^\d]/g,"");
      }else{
        value = value.replace(/[^\d.]/g,""); //清除"数字"和"."以外的字符
        value = value.replace(/^\./g,""); //验证第一个字符是数字
        //只保留第一个, 清除多余的
        value = value.replace(/\.{2,}/g,"."); 
        value = value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
        if(self.digit<100){
          var str = "^(\\-)*(\\d+)\\.("
          for(var i=0;i<self.digit;i++){
            str = str+"\\d";
          }
          str= str+").*$";
          var reg = new RegExp(str);
          value = value.replace(reg,'$1$2.$3');
        }
        //value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3'); //只能输入两个小数
        
      }
      if(self.max!==false && value>self.max){
        value = self.max;
      };
      console.log(this.$el.querySelector("input").value)
      self.$emit('input', value);
      
    },
    //包括负数
    handNegative(e){
      let self = this;
      var value = e;
      if(self.digit==0){
        value = value.replace(/[^\-\d]/g,"");
      }else{
        value = value.replace(/[^\-\d.]/g,""); //清除"数字"和"."和'-'以外的字符
        value = value.replace(/^\./g,""); //验证第一个字符不是'.'
        value = value.replace(/\.{2,}/g,"."); //只保留第一个'.', 清除多余的
        value = value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
        value = value.replace(/\-{2,}/g,"-"); //只保留第一个, 清除多余的
        value = value.replace(/^(\-)/,"$#$").replace(/\-/g,"").replace("$#$","-");
        if(self.digit<100){
          var str = "^(\\-)*(\\d+)\\.("
          for(var i=0;i<self.digit;i++){
            str = str+"\\d";
          }
          str= str+").*$";
          var reg = new RegExp(str)
        }
        //value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3'); //只能输入两个小数
        value = value.replace(reg,'$1$2.$3');
      }  
      self.$emit('input', value);          
    }
  }
}
</script>

