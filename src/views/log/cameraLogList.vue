<style>
a:link    {color:blue;}
a:visited {color:blue;}
a:hover   {color:red;}
a:active  {color:yellow;}
</style>
<template>
  <div class="app-container">
    <h1>Camera Log List </h1>
    <h2>cameraSn: {{cameraSn}}</h2>
    <!-- 查询表单
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="camera.cameraSn" placeholder="Camera SN"/>
      </el-form-item>

      <el-form-item>
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
      </el-form-item>
      

      <el-button type="primary" icon="el-icon-search" @click="queryCoursePageByCondition()">Query</el-button>
      <el-button type="default" @click="resetData()">Reset</el-button>
      <el-button type="action" icon="el-icon-caret-right" @click="gotoCameraAction()">Action</el-button>
      
    </el-form> -->
    
    <!-- 表格 -->
    <!-- <span style="float:right;"> -->
      <span style=" position: relative;left: 750px;">
     <el-button type="primary" icon="el-icon-plus" @click="gotoCameraAction()">Camera Action</el-button>
    </span>
    
    <div style="height:15px;"/>
     
    
    <el-table :data="courseList" 
    border fit highlight-current-row 
    ref="multipleTable"
    @selection-change="selectionChange">
      <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
      <!-- <el-table-column label="CameraSn" width="403" align="center" prop="cameraSn">
        <template slot-scope="scope">{{ (pageNum - 1) * pageSize + scope.$index + 1 }}</template>
      </el-table-column> -->
      <el-table-column label="LogName" width="500" align="center" prop="fileName">
      </el-table-column>

      

     
      <el-table-column prop="logUrlCreatedTime" label="Created Time" width="245" />
      
      <el-table-column label="Operation"
        width="400">
        <template slot-scope="scope">
       
          <a :href="scope.row.logUrl"
           
            class="buttonText">Download LOG</a>
        </template>
      </el-table-column>


     
      
    </el-table>
    

   
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
      :current-page="pageNum"
      :page-size="pageSize"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="queryCoursePageByCondition"
    />
  </div>
</template>
<script src="../../api/log/cameralogList.js"></script>
