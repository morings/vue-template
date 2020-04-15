//进度条组件
<template>
  <el-progress :stroke-width="strokeWidth" :status="status" :text-inside="true" :percentage="percentage"  ref="progress"></el-progress>
</template>
<script>
export default {
  props:{
    num1:{
      default:0,
    },
    num2:{
      default:0,
    },
    strokeWidth:{
      default:18,
    }
  },
  computed:{
    //进度条数据设置
    percentage(){
      if(this.num1 && this.num2){
        if(this.num1>=this.num2){
          this.status = 'success';
          this.$nextTick(()=>{
            var progress = this.$refs.progress.$el;
            var text = progress.getElementsByClassName("el-progress-bar__innerText");
            var str = parseInt(this.num1/this.num2*100)+"%"; 
            text[0].innerHTML =str;
          }) 
          return 100;        
        }else{
          return parseInt(this.num1/this.num2*100); 
        }
      }else{
        return 0;
      }
    }
  },
  data(){
    return{     
      status:"exception"
    }
  }
}
</script>




