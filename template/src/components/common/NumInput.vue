<template>
  <el-input   ref="elInput" :value='value' :disabled="disabled"  @input="handInput" @blur="blur" :readonly='readonly' :size="size" :type="type" :placeholder="placeholder" >
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
    digit:{
      default:0
    },
    disabled:{
      default:false
    },
    max:{
      default:false
    },
    negative:{
      default:false
    },
    readonly:{
      default:false
    },
    size:{
      default:"large"
    },
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
        value = value.replace(/\.{2,}/g,"."); //只保留第一个, 清除多余的
        value = value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
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
      value = value.replace(/\-{2,}/g,"-"); //只保留第一个, 清除多余的
      value = value.replace(/^(\-)/,"$#$").replace(/\-/g,"").replace("$#$","-");

      self.$emit('input', value);          
    }
  }
}
</script>

