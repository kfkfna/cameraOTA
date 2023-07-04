<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="Description information">
        <el-tag type="info">Excel template description</el-tag>
        <el-tag>
          <i class="el-icon-download"/>
          <a :href="'/static/one.xls'">Click Download template</a>
        </el-tag>
      </el-form-item>

      <el-form-item label="Select Excel">
        <el-upload
          ref="upload"
          :auto-upload="false"
          :on-success="fileUploadSuccess"
          :on-error="fileUploadError"
          :disabled="importBtnDisabled"
          :limit="1"
          :action="BASE_API+'/edu/subject/uploadSubject'"
          name="file"
          accept="application/vnd.ms-excel"
        >
          <el-button slot="trigger" size="small" type="primary">Select file</el-button>
          <el-button
            :loading="loading"
            style="margin-left: 10px;"
            size="small"
            type="success"
            @click="submitUpload"
          >{{ fileUploadBtnText }}</el-button>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //上传按钮是否禁用
      importBtnDisabled: false,
      BASE_API: process.env.BASE_API,
      loading: false,
      //按钮上面的文字
      fileUploadBtnText: "Upload the file to the server"
    };
  },
  methods: {
    //文件上传成功
    fileUploadSuccess() {
      //a.弹框告诉前端 上传成功
      this.$message({
        type: "success",
        message: "The import succeeded!"
      });
      //b.按钮文字变值
      this.fileUploadBtnText = "The data was imported successfully";
      //c.去掉转圈图案
      this.loading=false;
    },
    //文件上传失败
    fileUploadError() {},
    //点击上传按钮
    submitUpload() {
      //提交上传的文件后台
      this.$refs.upload.submit();
      //a.上传文件按钮不可以再点击
      this.importBtnDisabled = true;
      //b.有一个转圈上传加载的图案
      this.loading = true;
      //c.按钮文字变值
      this.fileUploadBtnText = "The file is uploading";
    }
  }
};
</script>