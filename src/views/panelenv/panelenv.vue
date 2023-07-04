<template>
  <div class="app-container">
    <h1>Panel Environment</h1>
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="camera.cameraSn" placeholder="Imei" />
      </el-form-item>

      <el-button
        type="primary"
        icon="el-icon-search"
        @click="queryCoursePageByCondition()"
        >Query</el-button
      >
      <el-button type="default" @click="resetData()">Reset</el-button>
    </el-form>

    <!-- 表格 -->
    <el-table
      :data="courseList"
      border
      fit
      highlight-current-row
      ref="multipleTable"
    >
      <el-table-column label="Imei" align="center" prop="imei" />

      <el-table-column prop="environment" align="center" label="environment" />

      <el-table-column prop="cloud" align="center" label="cloud" />

      <el-table-column prop="createTime" align="center" label="Created Time" />
    </el-table>

    <!-- 分页 -->
    <el-pagination
      :current-page="pageNum"
      :page-size="pageSize"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="queryCoursePageByCondition"
    />
  </div>
</template>
<!-- <script src="../../api/log/panellist.js"></script> -->
<script>
import course from "@/api/course/course";

export default {
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      total: 0,

      cameraSnList: null,
      //查询条件集合
      camera: {
        cameraSn: '',
        fwVersion: null,
        online: null
      },
      courseList: [],
      cameraSnList1: null
    };
  },
  created() {
    this.queryCoursePageByCondition();
  },
  methods: {
    queryCoursePageByCondition(pageNumUI = 1) {
      this.pageNum = pageNumUI;
      let panelEnvPrams = {
          "imei": this.camera.cameraSn,
          "pageNum": this.pageNum,
          "pageSize": this.pageSize
      }
      course.getPanelEnvList(panelEnvPrams).then(response => {
          if (response.result) {
              this.total=response.data.total;
              this.courseList=response.data.rows;
              console.log(response);
              for(let i = 0; i < this.courseList.length; i++) {
                let element = this.courseList[i]
                let str = element.createTime.split('.')[0]
                element.createTime = str.replaceAll('T', ' ')
              }
          } else {
            this.$message({
              type: 'error',
              message: response.data.message
            })
          }

        })
    },
    resetData() {
      // this.pageNum = 1;
      this.camera.cameraSn = '';
      this.queryCoursePageByCondition()
    },
  }
};
</script>
