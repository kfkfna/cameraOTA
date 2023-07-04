<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="Version" :model="form">
        <el-input v-model="form.version"/>
      </el-form-item>

      <el-form-item label="Model">
           <el-select v-model="form.modelId" placeholder="Model">
           <el-option v-for="item in modelList"
                     :key="item.version"
                     :value="item.modelId"
                     :label="item.modelName"
                     >
          </el-option>
        </el-select>
      </el-form-item>


      <el-form-item label="Type">
        <el-select v-model="form.type" clearable placeholder="">
          <!--
            数据类型一定要和取出的json中的一致，否则没法回填
            因此，这里value使用动态绑定的值，保证其数据类型是number
          -->
          <!-- <el-option :value="1" label="高级讲师"/> -->
          <el-option :value="2" label="Camera"/>
        </el-select>
      </el-form-item>
      <el-form-item label="Sha256">
        <el-input v-model="form.sha256sum"/>
      </el-form-item>
      <el-form-item label="Auto OTA">
        <el-radio v-model="form.autoOta" :label="true">Yes</el-radio>
        <el-radio v-model="form.autoOta" :label="false">No</el-radio>
      </el-form-item>
      <el-form-item label="Version File">
   <el-upload
        :on-success="onUploadSuccess"
        :before-upload="beforeUpload"
        :on-preview="onUploadPreview"
        :on-remove="onUploadRemove"
        :limti = 1
        :action="BASE_API"
        class="upload-demo"
       >
       
       <el-button  type="primary" @click="updateBaseAPI()">Check to Upload</el-button>
      </el-upload>
    
 </el-form-item>


      <!-- 讲师头像：TODO -->
      
      <el-form-item>
        <el-button  type="primary" @click="saveTeacher">Save Version</el-button>
      </el-form-item>
    
      <!-- 讲师头像 -->
      
    </el-form>
  </div>
</template>
<script>
//引入teacher.js模块
import ImageCropper from "@/components/ImageCropper";
import PanThumb from "@/components/PanThumb";
import teacher from "@/api/teacher";
//初始默认值
const defaultFormParam = {
  version: null,
  type: null,
  modelId: null,
  sha256sum: "",
  autoOta: false
};
export default {
  components: {
    ImageCropper,PanThumb
  },
  //定义数据
data() {
  return {
    cameraVersion: defaultFormParam,
    //是否显示上传组件
    imagecropperShow:false,
    modelList:null,
    //上传组件id
    imagecropperKey:0,
    BASE_API: process.env.BASE_API +'/camera/web/fileUpload',
    DELETE_FILE_API:process.env.BASE_API +'/camera/web/deleteFile',
    fileList: File,
    dialogVisible: false,
        picUrl:'',
        uploadForm: new FormData(),
        form: {
          version:null,
          type:'',
          model: "",
          sha256sum:'',
          uploadfilesize:'',
          s3key: '',
          autoOta: false
        },
        fileList:null,
        uploadStatus:0
  };
},
  //整个页面可能调用的方法
  methods: {
    updateBaseAPI(){
       this.BASE_API = this.BASE_API +"/"+this.form.version
    },
    
    // 文件上传限制条件
    beforeUpload(file) {
      console.log("this.form.version = "+this.form.version)
      this.form.s3key = ''
       if(this.form.version === null || this.form.version === ''){
        this.BASE_API = process.env.BASE_API +'/camera/web/fileUpload'
        this.$message({
          type: "error",
          message: "Input version!"
        })
        return false;
      }else{
        this.form.uploadfilesize = file.size/(1024*1024);
        console.log(this.BASE_API)
        return true;
      }
    },
  

    // 上传图片成功的回调
    onUploadSuccess(res, file) {
      console.log('res:', res, res.data.s3key)
      if(res.data.s3key) {
        this.form.s3key = res.data.s3key;
      }
      // 填充上传文件列表
      
      this.uploadStatus = 1;
      this.BASE_API = process.env.BASE_API +'/camera/web/fileUpload'
      file = null;
    },

    // 上传的文件预览
    onUploadPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogImageVisible = true
    },

    // 删除上传的文件
    onUploadRemove(file, fileList) {
       if(this.form.version === null || this.form.version === ''){
         return false;
       }
    teacher.deleteFile(this.form.version).then(response => {
      if(response.result){
          this.$message({
            type: "success",
            message: "Delete File Success"
          });
      }else{
           this.$message({
            type: "error",
            message: response.data.message
          })
          return false;
      }
  
    })
      this.BASE_API = process.env.BASE_API +'/camera/web/fileUpload'
      this.uploadStatus = 0
      this.form.s3key = ''
    },


    // saveOrUpdate() {
    //   if (this.$route.params.teacherId) {
    //     this.updateTeacher();
    //   } else {
    //     this.saveTeacher();
    //   }
    // },
    // updateTeacher() {
    //   teacher.updateTeacher(this.teacherParam).then(response => {
    //     this.$message({
    //       type: "success",
    //       message: "修改成功"
    //     });
    //     this.$router.push({ path: "/teacher/list" });
    //   });
    // },

    queryDeviceModelList(){
        teacher.queryDeviceModelList().then(response =>{
           this.modelList = response.data

        })
     
    },
    saveTeacher() {
      if(!this.form.s3key) {
        return  this.$message({
            type: "warning",
            message: "The s3key parameter is missing, please upload the file again"
          });
      }
      if(this.uploadStatus === 1){
        console.log(123123123)
        console.log(this.form)
        teacher.saveTeacher(this.form).then(response => {
          if(response.result){
            this.$message({
              type: "success",
              message: "success"
            });
          }else{
            this.$message({
              type: "error",
              message: response.data.message
            });
            return false;
          }
          this.$router.push({ path: "/teacher/list" });
      });
      }else{
          this.$message({
            type: "error",
            message: "Please Upload File"
          });
          return false
      }
    },
  },
  created () {
   this.queryDeviceModelList()
  },
  //页面一加载就会执行的内容
  watch: {
    
    $route(to, from) {
        this.form=defaultFormParam;
    }
  
  },

};
</script>
<style lang="scss" scoped>
::v-deep .el-radio__input.is-checked .el-radio__inner::after {
        content: '';
        width: 8px;
        height: 5px;
        border: 2px solid white;
        border-top: transparent;
        border-right: transparent;
        text-align: center;
        display: block;
        position: absolute;
        top: 2px;
        left: 2px;
        vertical-align: middle;
        transform: rotate(-45deg);
        border-radius: 0px;
        background: none;  
    }


</style>