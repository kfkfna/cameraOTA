<template>
  <div class="app-container">
    <h1>{{ this.$store.getters.roles === 'user'? 'Camera Management': 'Camera List' }}</h1>
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline" @submit.native.prevent>
      <el-form-item>
        <el-input v-model="camera.cameraSn" clearable placeholder="Camera SN"/>
      </el-form-item>

      <el-form-item v-permission="{ allowRoles: ['admin', 'client'] }">
       <el-select v-model="camera.fwVersion" placeholder="Version">
           <el-option v-for="item in versionList"
                     :key="item.version"
                     :value="item.version"
                     :label="item.version"
                     >
          </el-option>
        </el-select>
      </el-form-item>

       <el-form-item v-permission="{ allowRoles: ['admin', 'client'] }">
        <el-select v-model="camera.online" clearable placeholder="Status">
          <el-option :value="true" label="Online"/>
          <el-option :value="false" label="Offline"/>
        </el-select>
      </el-form-item>
       <el-form-item v-permission="{ allowRoles: ['admin', 'client'] }">
           <el-select v-model="camera.modelId" placeholder="Model">
           <el-option v-for="item in modelList"
                     :key="item.version"
                     :value="item.modelId"
                     :label="item.modelName"
                     >
          </el-option>
        </el-select>
      </el-form-item>
      
<!-- roleQueryCameraSnInfo queryCoursePageByCondition -->
      <el-button type="primary" icon="el-icon-search" @click="roleQueryCameraSnInfo()">Query</el-button>
      <el-button v-permission="{ allowRoles: ['admin', 'client'] }" type="default" @click="resetData()">Reset</el-button>
      <el-button v-permission="{ allowRoles: ['admin'] }" type="action" icon="el-icon-caret-right" @click="gotoCameraAction()">Action</el-button>
      
    </el-form>
    
    <!-- 表格 -->
    <el-table :data="courseList" 
    border fit highlight-current-row 
    ref="multipleTable"
    @selection-change="selectionChange">
      <el-table-column type="selection" width="50" align="center"></el-table-column>
      <!-- <el-table-column label="CameraSn" width="403" align="center" prop="cameraSn">
        <template slot-scope="scope">{{ (pageNum - 1) * pageSize + scope.$index + 1 }}</template>
      </el-table-column> -->
      <el-table-column label="CameraSn" width="148" align="center" prop="cameraSn">
        <template slot-scope="{ row, column, $index }">
				<span class="cameraSnLink" style="cursor: pointer; color: #0000ff" @click="clickBtn(row)">{{row.cameraSn}}</span>
			</template>
      </el-table-column>
      <el-table-column prop="deviceId" label="Camera DeviceId" align="center" width="280" />
      
        <el-table-column label="Imei" width="115" align="center" prop="imei"/>
      <el-table-column label="Online" width="70" prop="online" align="center" :formatter="formatState">
        
      </el-table-column>
      <el-table-column prop="onlineUpdateTime" label="Online Update Time" align="center" width="160" />

      <el-table-column prop="fwVersion" align="center" label="FwVersion" width="92"/>
      <el-table-column prop="description" align="center" label="OtaStatus" width="110"/>
      
    <el-table-column label="Operation" width="220" align="center" v-if="showRoles">
        <template slot-scope="scope">
          <el-button
            v-if="isUser || (scope.row.isDelete == 1)"
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="deleteCourse(scope.row.deviceId)"
          >delete</el-button>
        <el-button
            v-if="isAdmin && (scope.row.otaStatus == 2 ||scope.row.otaStatus == 7 ||scope.row.otaStatus == 1)"
            type="primary"
            size="mini"
            icon="el-icon-refresh-right"
            @click="resetOta(scope.row.deviceId)"
          >resetOta</el-button>
  
        </template>
     
      </el-table-column>
     
      
      
    </el-table>
    <div align="center" margin-top:10>
    <el-button v-permission="{ allowRoles: ['admin', 'client'] }" type="primary" @click="gotoCameraOTA()">Camera OTA</el-button>
    </div>


    <el-dialog
      title="Camera OTA"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose1">
      <el-select v-model="version"
                   style="width: 75%"
                   placeholder="Version">
          <el-option v-for="item in otaversionList"
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
    </el-dialog>

    <el-dialog
      title="Camera Action"
      :visible.sync="actionDialog"
      width="30%"
      :before-close="handleClose">
     <el-input v-model="action" placeholder="Camera Action"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="actionDialog = false">Cancel</el-button>
        <el-button type="primary" @click="cameraAction()">Confirm</el-button>
      </span>
    </el-dialog>
    

    <!-- 分页 -->
    <el-pagination
      v-permission="{ allowRoles: ['admin', 'client'] }"
      :current-page="pageNum"
      :page-size="pageSize"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="queryCoursePageByCondition"
    />
  </div>
</template>
<script src="../../api/course/list.js"></script>
<style>

.cameraSnLink:hover, .cameraSnLink:focus {
    text-decoration: underline;
}
</style>
