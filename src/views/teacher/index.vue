<template>
  <div class="app-container">
    <!--查询表单-->
    <h1>Version Management</h1>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="cameraVersion.version" placeholder="Version"/>
      </el-form-item>

      <el-form-item>
        <el-select v-model="cameraVersion.type" clearable placeholder="Type">
          <!-- <el-option :value="1" label="Panel FW"/> -->
          <el-option :value="2" label="Camera"/>
          <!-- <el-option :value="3" label="Panel System" /> -->
        </el-select>
      </el-form-item>
      <!-- <el-form-item>
       <el-select v-model="cameraVersion.model" placeholder="ModelName">
           <el-option
           v-for="item in reduce(versionModelList)"
                     :key="item.model"
                     :value="item.model"
                     :label="item.model"
                     >
          </el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item >
        <el-select v-model="cameraVersion.modelId" placeholder="Model">
          <el-option
            v-for="item in modelList"
            :key="item.version"
            :value="item.modelId"
            :label="item.modelName"
          />
        </el-select>
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="queryTeacherPageByCondition()">Query</el-button>
      <el-button type="default" @click="resetData()">Reset</el-button>
    </el-form>
    <!-- 表格 -->
    <el-table
      v-loading="listLoading"
      :data="versionList"
      element-loading-text="Data loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column prop="version" label="Version" width="338" align="center"/>
      <!-- <template slot-scope="scope">{{ (pageNum - 1) * pageSize + scope.$index + 1 }}</template> -->

      <el-table-column prop="modelName" label="ModelName" width="160"/>

      <el-table-column prop="fileSize" label="Size" width="160"/>

      <el-table-column prop="time" label="Update Time" width="245"/>

      <el-table-column v-if="showRoles" label="Operation" width="305" align="center">
        <template slot-scope="scope">
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="deleteTeacherById(scope.row.versionId)"
          >delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :current-page="pageNum"
      :page-size="pageSize"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="queryTeacherPageByCondition"
    />
  </div>
</template>
<script>
// 引入teacher.js模块
import teacher from '@/api/teacher'
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ]),
    showRoles() {
      const role = this.roles

      console.log(role)
      console.log(typeof (role))

      if (role.indexOf('admin') !== -1) {
        return true
      } else {
        return false
      }
    }
  },
  // 页面需要绑定的数据/初始化数据
  data() {
    return {
      // 默认不转圈
      listLoading: false,
      // Version集合
      versionList: [],
      // versionModelList:null,
      pageNum: 1,
      pageSize: 10,
      total: 0,
      modelList: null,
      // 查询Version的条件
      cameraVersion: {
        version: null,
        modelId: null,
        type: null
      }
    }
  },
  // 页面一加载就会执行的内容
  created() {
    this.requery()
  },
  // 整个页面可能调用的方法
  methods: {
    //  reduce(arr) {
    //   const res = new Map();
    //   return arr.filter(arr => !res.has(arr._model) && res.set(arr._model, 1));
    // },
    resetData() {
      this.cameraVersion.version = null
      this.cameraVersion.type = null
      this.cameraVersion.modelId = null
    },

    queryDeviceModelList() {
      teacher.queryDeviceModelList().then(response => {
        this.modelList = response.data.data
      })
    },
    deleteTeacherById(version) {
      this.$confirm('Are you sure to delete it?', 'prompt', {
        confirmButtonText: 'confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      })
        // 当用户点击确定的时候执行
        .then(() => {
          teacher.deleteTeacherById(version).then(response => {
            // a.删除成功之后提醒一下
            if (response.result) {
              this.$message({
                type: 'success',
                message: 'success!'
              })
            } else {
              this.$message({
                type: 'error',
                message: response.data.message
              })
            }
            // b.刷新页面
            this.requery()
          })
        })
        // 当用户点击取消的时候执行
        .catch(() => {
          this.$message({
            type: 'info',
            message: 'Cancel!'
          })
        })
    },

    queryDeviceModelList() {
      teacher.queryDeviceModelList().then(response => {
        this.modelList = response.data
      })
    },
    // 1.分页查询讲师信息带条件
    queryTeacherPageByCondition(pageNumUI = 1) {
      this.pageNum = pageNumUI
      // this.cameraVersion.model = 'DoorBell'
      teacher
        .queryTeacherPageByCondition(
          this.pageNum,
          this.pageSize,
          this.cameraVersion
        )
        // 调用成功之后
        .then(response => {
          this.versionList = response.data.rows
          // this.versionModelList = response.data.rows;
          console.log(this.versionList)
          for(let i = 0; i < this.versionList.length; i++) {
            let element = this.versionList[i]
            let str = element.time.split('.')[0]
            element.time = str.replaceAll('T', ' ')
          }

          this.total = response.data.total
          this.cameraVersion.version = null
          this.cameraVersion.type = null
          this.cameraVersion.model = null
        })
    },
    requery() {
      this.queryTeacherPageByCondition()
      this.queryDeviceModelList()
    }
  }
}
</script>
