<template>
  <div class="app-container">
    <h1>Panel List</h1>
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="camera.cameraSn" placeholder="Imei"/>
      </el-form-item>

      <!-- <el-form-item>
       <el-select v-model="camera.fwVersion" placeholder="Version">
           <el-option v-for="item in versionList"
                     :key="item.version"
                     :value="item.version"
                     :label="item.version"
                     >
          </el-option>
        </el-select>
      </el-form-item>

       <el-form-item>
        <el-select v-model="camera.online" clearable placeholder="Status">
          <el-option :value="true" label="Online"/>
          <el-option :value="false" label="Offline"/>
        </el-select>
      </el-form-item> -->
      

      <el-button type="primary" icon="el-icon-search" @click="queryCoursePageByCondition()">Query</el-button>
      <el-button type="default" @click="resetData()">Reset</el-button>
      
    </el-form>
    
    <!-- 表格 -->
    <el-table :data="courseList" 
    border fit highlight-current-row 
    ref="multipleTable"
    >
     
      <!-- <el-table-column label="CameraSn" width="403" align="center" prop="cameraSn">
        <template slot-scope="scope">{{ (pageNum - 1) * pageSize + scope.$index + 1 }}</template>
      </el-table-column> -->
      <el-table-column label="Imei" align="center" prop="imei" width="400">
      </el-table-column>

      

    
      <el-table-column prop="createdTime" align="center" label="Created Time" width="320" />

      <el-table-column prop="customerId" align="center" width="120" label="Type" />
      

     
      
<el-table-column label="Operation" width="300" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-download"
            @click="gotoCameraLogList(scope.row.imei)"
          >View Log</el-button>
          <el-button
            v-if="scope.row.customerId === 2 || scope.row.customerId === 1"
            type="primary"
            size="mini"
            icon="el-icon-upload2"
            @click="gotoUploadLog(scope.row.imei, scope.row.customerId)"
          >Upload log</el-button>
        </template>
      </el-table-column>
     
      
    </el-table>
    <!-- <div align="center" margin-top:10>
    <el-button type="primary" @click="gotoCameraOTA()">Camera OTA</el-button>
    </div>


    <el-dialog
      title="Camera OTA"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-select v-model="version"
                   style="width: 75%"
                   placeholder="Version">
          <el-option v-for="item in versionList"
                     :key="item.version"
                     :value="item.version"
                     :label="item.version"
                     >
          </el-option>
        </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="cameraOTA()">Confirm</el-button>
      </span>
    </el-dialog> -->
    

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
<script src="../../api/log/panellist.js"></script>
