<template>
  <div class="app-container">
    <h1>Camera White List</h1>
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
          <el-input v-model="camera.cameraSn" placeholder="CameraSn" />
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
       <el-button type="action" icon="el-icon-plus" @click="gotoAddWhiteList()">Add White List</el-button>
      <el-button type="danger" v-if="showRoles" icon="el-icon-delete" @click="gotoDeleteWhiteList()">Delete White List</el-button>

    </el-form>
    
    <!-- 表格 -->
    <el-table :data="courseList" 
    border fit highlight-current-row 
    ref="multipleTable"
    @selection-change="selectionChange">
     
      <!-- <el-table-column label="CameraSn" width="403" align="center" prop="cameraSn">
        <template slot-scope="scope">{{ (pageNum - 1) * pageSize + scope.$index + 1 }}</template>
      </el-table-column> -->
      
      <el-table-column label="CameraSn" width="500" align="center" prop="cameraSn">
      </el-table-column>

      

    
      <el-table-column prop="createdTime" label="Created Time" align="center" width="400" />
      

     
        
     <el-table-column label="Operation" width="250" align="center" v-if="showRoles">
        <template slot-scope="scope">
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="deleteCameraWhite(scope.row.cameraSn)"
          >delete</el-button>
        </template>
      </el-table-column>
 

     
      
    </el-table>
   <el-dialog
      title="Camera Add White List"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-test />
      <h3>Multiple CameraSn are separated by ","</h3>
        <el-input  v-model="action" type="textarea" placeholder="Input CameraSn"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="addCameraWhiteList()">Confirm</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="Delete White List"
      :visible.sync="deleteListdialog"
      width="30%"
      :before-close="handleClose">
      <el-test />
         <h3>Multiple CameraSn are separated by ","</h3>
         

        <el-input v-model="action" type="textarea" placeholder="Input CameraSn"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteListdialog = false">Cancel</el-button>
        <el-button type="primary" @click="deleteCameraWhiteList()">Confirm</el-button>
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
<script src="../../api/whiteList/cameralist.js"></script>
