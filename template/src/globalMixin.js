//全局mixin
import Vue from 'vue'

Vue.mixin({
  methods:{
    //返回上一页
    goback(){
      this.$router.go(-1);
    },
    //数字格式化
    Number(value){
      if(isNaN(value)){
        return 0
      }else{
        return Number(value)
      }
    },
    //下载文件
    exportFile(res,fileName){
      const content = res
      const blob = new Blob([content])
      if ('download' in document.createElement('a')) { // 非IE下载
        const elink = document.createElement('a')
        elink.download = fileName
        elink.style.display = 'none'
        elink.href = URL.createObjectURL(blob)
        document.body.appendChild(elink)
        elink.click()
        URL.revokeObjectURL(elink.href) // 释放URL 对象
        document.body.removeChild(elink)
      } else { // IE10+下载
        navigator.msSaveBlob(blob, fileName)
      }
    }
  },
  components:{
  },
  mounted(){
   
  },
  activated(){
    
  },
  deactivated(){
    
  },
  data(){
    return{
      
    }
  },
  watch:{
    
  }
});