<template>
  <el-upload
    v-if="!disabled"
    action=""
    ref='upload'
    :accept="'image/*'" 
    :limit='limit'
    :auto-upload="false"
    list-type="picture-card"
    :show-file-list="true"
    :file-list="fileList"
    :on-preview='preview'
    :on-change="change"
    :on-remove="remove"
    :on-exceed="exceed"
    :multiple="multiple?true:false">
    <i class="el-icon-plus"></i>
  </el-upload>
  <div class="imgs" v-else v-viewer>
    <img :src="item.url" alt="" v-for="(item,index) in fileList" :key="index" style="width:148px;height:148px">
  </div>
</template>
<script>
export default {
  props:{
    limit:{

    },
    disabled:{
      default:false
    },
    multiple:{
      default:false
    },
    value:{

    }
  },
  data(){
    return{
      files:[],
      fileList:[],
      oldImgs:[]
    }
  },
  methods:{
    exceed(){
      this.$message.error("最多上传"+this.limit+'张图片')
    },
    //预览图片
    preview(file){
      let index = this.fileList.indexOf(file);
      console.log(file,index)
    },
    //添加图片
    change(file){    
      this.files.push(file.raw)   
    },
    //移除图片
    remove(file){
      if(file.key!='old'){
        var index = this.files.findIndex(item => item.uid == file.raw.uid);
        this.files.splice(index,1);
      };
      var olds =  this.fileList.map(item=>item.url)
      this.$emit('input',olds.concat(this.files))      
    },
    upload(){
      return new Promise((resolve)=>{
        if(!this.files.length){
          return resolve(this.oldImgs); 
        }
        var data = new FormData();
        for(let file of this.files){
          data.append("images",file)
        }    
        this.$http.upload(data).then(res=>{
          var arr = this.oldImgs.concat(res)
          resolve(arr); 
        })
      })  
    },
    getImage(){
      this.fileList = []
      for(let item of this.value){
        if(typeof(item) === 'string'){
          //是链接说明已上传
          this.fileList.push({
            url:item,
            key:'old'
          })
        }
      }
    }
  }
  
}
</script>

