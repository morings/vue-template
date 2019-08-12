<template>
  <el-input   ref="elInput"  v-model="num" :disabled="disabled" :maxlength="digit==0?9:16" @input="handInput" @blur="blur">

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
    }
  },
  data(){
    return{
      num:''
    }
  },
  watch:{
    value(a,b){
      this.num = this.value;
    },
    max(){}
  },
  mounted(){
    this.num = this.value;
  },
  methods:{
    blur(){
      this.$emit('blur')
    },
    //只包括正数
    handInput(){
      if(this.negative){
        return this.handNegative()
      }
      let self = this;
      var value = self.num;
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
      }
      self.num = value;
      if(value===''){
        return self.$emit('input','')
      }
      self.$emit('input', Number(value));
    },
    //包括负数
    handNegative(){
      let self = this;
      var value = self.num;
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
      self.num = value;
      if(!isNaN(value)){
        if(value===''){
          return self.$emit('input','')
        }
        self.$emit('input', Number(value));
      }     
    }
  }
}
</script>

