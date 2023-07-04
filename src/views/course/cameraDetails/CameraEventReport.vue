<template>
    <div>
		<!--查询表单-->
    <el-form :inline="true" class="demo-form-inline" style="margin: 20px 0 0 0;width: 100%;" @submit.native.prevent>
      <el-form-item label="CameraSn:" class="item-label item-label-sn">
        <el-input v-model="params.cameraSn" placeholder="Camera SN" disabled style="cursor: not-allowed;"/>
      </el-form-item>

      <el-form-item label="From(Start):" class="item-label">
        <el-date-picker ref="timeStart" id="timeStart" type="datetime" :picker-options="timeOptionByStart" value-format="yyyy-MM-dd HH:mm:ss" v-model="params.startTime">
					</el-date-picker>
					<i class="el-icon-date" @click="datePickerStart"></i>
      </el-form-item>

       <el-form-item label="From(End):" class="item-label">
        <el-date-picker ref="timeEnd" id="timeEnd" type="datetime" :picker-options="timeOptionByEnd" value-format="yyyy-MM-dd HH:mm:ss" v-model="params.endTime">
					</el-date-picker>
					<i class="el-icon-date" @click="datePickerEnd"></i>
      </el-form-item>
      
<!-- roleQueryCameraSnInfo queryCoursePageByCondition -->
      <el-button type="primary" icon="el-icon-search" @click="doSearch">Query</el-button>
      <el-button type="default" @click="doSearchClear">Reset</el-button>
      
    </el-form>
    <!-- 表格 -->
    <el-table :data="dataList" 
    border fit highlight-current-row 
    ref="eventReportTable"
    v-loading="loading"
    @selection-change="selectionChange">
      <el-table-column type="selection" align="center"></el-table-column>
      <el-table-column align="center" prop="imei" :label="'imei'"></el-table-column>
			<el-table-column align="center" prop="title" :label="'Title'"></el-table-column>
			<el-table-column align="center" prop="message"  :label="'Message'"></el-table-column>
			<el-table-column align="center" prop="eventType" width="92" :label="'EventType'"></el-table-column>
			<el-table-column align="center" prop="eventTime" width="142" :label="'Time'"></el-table-column>
			<el-table-column align="center" prop="eventEndTime" width="145" :label="'EndTime'"></el-table-column>
			<el-table-column align="center" prop="deviceId" width="268" :label="'DeviceId'"></el-table-column>
			<el-table-column align="center" prop="userId" :label="'UserId'"></el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :current-page="pageNum"
      :page-size="pageSize"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="handleCurrentChange"
    />
    </div>
  </template>
  
  <script>
import course from '@/api/course/course'

export default {
    data() {
        return {
          //查询条件集合
            camera: {
              cameraSn: null,
              fwVersion: null,
              online: null,
              modelId: null
            },
            versionList: [],
            modelList: null,
            saveBtnDisabled: false,
            BASE_API: process.env.BASE_API,
            //讲师列表信息
            teacherList: [],
            //一级课程分类信息
            parentSubjectList: [],
            //二级课程分类信息
            childSubjectList: [],
            //接收页面传递过来的数据信息
            courseInfo: {
                teacherId: '',
                //一级分类id
                parentSubjectId: '',
                //二级分类id
                childSubjectId: '',
                cover: '/static/ey1rk8.jpg',
                description: '',
                lessonNum: 0,
                price: 0,
                title: '',
                id: ''
            },
            //课程id
            courseId: '',
            // cnahsu
            pageNum: 1,
            pageSize: 10,
            total: 0,
            loading: false,
            deviceId: '',
            dataList: [],
            params: {
              cameraSn: '',
              state: '',
              country: '',
              dealerId: '',
              keywords: '',
              startTime: '',
              endTime: '',
              CameraSn: ''
            },
            timeOptionByStart: {
              disabledDate:(time)=> {
                if(this.params.endTime) {
                  return time.getTime() > new Date(this.params.endTime).getTime() || time.getTime() > Date.now()
                } else {
                  return time.getTime() > Date.now()
                }
              }
            },
            timeOptionByEnd: {
              disabledDate:(time)=> {
                return time.getTime() < new Date(this.params.startTime).getTime() || time.getTime() > Date.now()
              }
            }
        }
    },
    created() {
      this.params.cameraSn = this.$route.params.cameraSn;
      this.deviceId = this.$route.params.deviceId;
      this.getCameraEventPage()
    },
    methods: {
        datesFormat(timesStamp, datePattern = '') {
          return (new Date(parseInt(timesStamp)).toLocaleString('zh', { hour12: false }))
        },
        handleCurrentChange(e) {
          this.pageNum = e;
          this.getCameraEventPage()
        },
        doSearch() {
          this.pageNum = 1
          this.getCameraEventPage()
        },
        doSearchClear() {
          this.params.startTime = ''
          this.params.endTime = ''
          this.pageNum = 1
          this.pageSize = 10
          this.getCameraEventPage()
        },
        selectionChange() {},
        datePickerStart() {
          if(this.$refs.timeStart.pickerVisible){
            this.$refs.timeStart.blur()
          } else {
            this.$refs.timeStart.focus()
          }
        },
        datePickerEnd() {
          if(document.activeElement.id === 'timeEnd') {
            this.$refs.timeEnd.blur()
          } else {
            this.$refs.timeEnd.focus()
          }
        },
        getCameraEventPage() {
            if (this.params.startTime && !this.params.endTime) {
              this.$message.warning('Please select the endtime.')
              return
            }
            if (new Date(this.params.startTime) > new Date()) {
              this.$message.warning('The starttime cannot be greater than the currenttime.')
              return
            }
            if (!this.params.startTime && this.params.endTime) {
              this.$message.warning('Please select the starttime.')
              return
            }
            if (new Date(this.params.endTime) > new Date()) {
              this.$message.warning('The endtime cannot be greater than the currenttime.')
              return
            }
            if (new Date(this.params.endTime) < new Date(this.params.startTime)) {
              this.$message.warning('Endtime cannot be greater than starttime.')
              return
            }
            let paramsData = {
               pageNum: this.pageNum,
               pageSize: this.pageSize,
               params: {
                  deviceId: this.deviceId,
                  startTime: this.params.startTime,
                  endTime: this.params.endTime
              }
            }
            this.loading = true;
            course.getCameraEventPage(paramsData).then(res => {
              this.loading = false;
              if (res.result == false) {
                this.$message.error(res.data.message || res.data)
                return;
              }
              this.dataList = res.data.rows
              this.dataList.forEach(r => {
                if(r.eventTime !== null){
                  r.eventTime = this.datesFormat(r.eventTime, 'YYYY-MM-DD hh:mm:ss');
                }
                if(r.eventEndTime !== null){
                  r.eventEndTime = this.datesFormat(r.eventEndTime, 'YYYY-MM-DD hh:mm:ss');
                }
              })
              for(let i = 0; i < this.dataList.length; i++) {
                this.dataList[i].indexId = i
                if(this.dataList[i].userId !== null) {
                  this.dataList[i].userId = this.dataList[i].userId.toString()
                }
              }
              // this.dataList.forEach(r => {
              //   this.srcList.push(r.videoFirstImageUrl)
              // })
              this.total = res.data.total
            }).catch(e => {
              console.log(e)
              this.loading = false;
              this.$message.error('network Error!')
            })
        }
    },
}
  </script>
  <style lang="scss">
	.item-label .el-form-item__label {
		font-size: 12px;
	}
	.item-label-sn .el-input__inner {
		padding: 0;
		padding-left: 8px;
	}
  </style>
  <style lang="scss" scoped>
  ::v-deep .el-button {
	width: 80px;
    height: 29px;
    line-height: 0px;
    text-align: center;
    font-size: 12px;
    padding: 0;
    margin: 5px;
  }
  ::v-deep .el-table {
      background-color: transparent;
      
  }
  ::v-deep .el-table th.el-table__cell {
      background-color: transparent;
  }
  ::v-deep .el-table tr {
      background-color: transparent;
  }
  
  ::v-deep .el-input.is-disabled .el-input__inner {
    background-color: #ffffff;
    color: #7c8599;
  }
   .page-header {
      margin: 20px 8px;
      padding-bottom: 26px;
   }
  
   .page-header-title {
      float: left;
      font-family: inherit;
      font-weight: 500;
      line-height: 1.1;
      font-size: 28px;
   }
  
   .refresh-btn {
      float: right;
      width: 80px;
      height: 29px;
      font-size: 12px;
   }
  </style>
  

  