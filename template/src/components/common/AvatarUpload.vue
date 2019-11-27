<template>
  <el-upload
    v-if="!disabled"
    class="avatar-uploader"
    action=""
    accept="'image/*'"           
    :auto-upload="false"
    :show-file-list="false"
    :on-change="change">
    <img v-if="imageUrl" :src="imageUrl" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
  <img v-else :src="imageUrl" class="avatar" v-viewer>
</template>
<script>
export default {
  props:{
    value:{

    },
    disabled:{
      default:false
    }
  },
  data(){
    return{
      imageUrl:'',
    }
  },
  mounted(){
    this.getImage()
  },
  watch:{
    value(){
      this.getImage()
    }
  },
  methods:{
    //添加图片
    change(file){
      this.$emit('input',file.raw)
    },
    getImage(){
      if(typeof(this.value)=='object'){
        //是文件
        this.imageUrl = URL.createObjectURL(this.value);
      }else if(typeof(this.value)=='string'){
        //是链接
        this.imageUrl = this.value;
      }
    }
  }
}
</script>
<style lang="scss">
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 148px;
    height: 148px;
    line-height: 148px;
    text-align: center;
  }
  .avatar {
    width: 148px;
    height: 148px;
    display: block;
  }
</style>

