<template>
  <div class="app-container">
    <h1>Camera List</h1>
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="camera.cameraSn" placeholder="CameraSn"/>
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
      <el-table-column label="CameraSn" width="400" align="center" prop="cameraSn">
      </el-table-column>

      

    
      <el-table-column prop="createdTime" align="center" label="Created Time" width="320" />
      

     
      
 <el-table-column label="Operation" width="300" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-download"
            @click="gotoCameraLogList(scope.row.cameraSn)"
          >View Log</el-button>
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-upload2"
            @click="gotoUploadLog(scope.row.cameraSn)"
          >Upload log</el-button>
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
      @current-change="queryCoursePageByCondition"
    />
  </div>
</template>
<script src="../../api/log/cameralist.js"></script>
