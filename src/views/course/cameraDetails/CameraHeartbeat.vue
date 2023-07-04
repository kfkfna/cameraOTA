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
      <el-button type="default" @click="doExport">Export</el-button>
      
    </el-form>
    <!-- 表格 -->
    <el-table :data="dataList" 
    border fit highlight-current-row 
    ref="eventReportTable"
    v-loading="loading"
    @selection-change="selectionChange">
        <el-table-column type="selection" width="42" align="center"></el-table-column>
		<el-table-column align="center" prop="deviceId" width="300" :label="'DeviceId'"></el-table-column>
		<el-table-column align="center" prop="status" :label="'Status'"  :formatter="formatTimeStr"></el-table-column>
		<el-table-column align="center" prop="wifiSignalLevel" :label="'SignalLevel'"></el-table-column>
		<el-table-column align="center" prop="wifiLinkQuality" :label="'LinkQuality'"></el-table-column>
		<el-table-column align="center" prop="createdTime" :label="'Time'"></el-table-column>
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
            // cnahsu
            SelectionData: [],
            deviceId: '',
            loading: false,
            filename: '',
            pageNum: 1,
            pageSize: 10,
            total: 0,
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
      this.getCameraHeartbeatList()
    },
    methods: {
        doExport() {
          if(!this.dataList.length) {
            this.$message.warning('No Data.');
            return;
          }
          if(!this.SelectionData.length) {
            this.$message.warning('Please select an export row.');
            return;
          }
          this.filename = 'Camera-Heartbeat.xls';
          let field_row = [
            'deviceId',
            'status',
            'wifiSignalLevel',
            'wifiLinkQuality',
            'time'
          ];
          let json_data = [];
          this.SelectionData.forEach(res=>{
            let _json_data = {};
            field_row.forEach(r=>{
              if(r == 'deviceId') {
                _json_data[r] = res.deviceId+""
              }
              if(r == 'status') {
                _json_data[r] = res.status
              }
              if(r == 'wifiLinkQuality') {
                _json_data[r] = res.wifiLinkQuality
              }
              if(r == 'wifiSignalLevel') {
                _json_data[r] = res.wifiSignalLevel
              }
              if(r == 'time') {
                _json_data[r] = res.createdTime
              }
            })
            json_data.push(_json_data)
          })
          this.toXlsx(json_data);
        },
        toXlsx(json_data) {
          var data = []
          let title_row = [
            'deviceId',
            'status',
            'wifiSignalLevel',
            'wifiLinkQuality',
            'time'
          ];
          let field_row = [
            'deviceId',
            'status',
            'wifiSignalLevel',
            'wifiLinkQuality',
            'time'
          ];
          // for (let key in this.json_fields) {
          // 	title_row.push(key);
          // 	field_row.push(this.json_fields[key]);
          // }
          data.push(title_row);
          json_data.forEach(res => {
            let item = [];
            field_row.forEach(f => {
              item.push(res[f]);
            })
            data.push(item);
          })
          var ws_name = this.filename.replace('.xls', '');
          var wb = XLSX.utils.book_new(),
            ws = XLSX.utils.aoa_to_sheet(data);
          XLSX.utils.book_append_sheet(wb, ws, ws_name);
          XLSX.writeFile(wb, this.filename.replace('.xls', '.xlsx'));
        },
        formatTimeStr: function (row, column, cellValue) {
          if (Object.prototype.toString.call(cellValue)=='[object Boolean]') {
            if(cellValue === true) return 'Online';
            if(cellValue === false) return 'Offline';
          }
          return '';
        },
        datesFormat(timesStamp, datePattern = '') {
          return (new Date(parseInt(timesStamp)).toLocaleString('zh', { hour12: false }))
        },
        handleCurrentChange(e) {
          this.pageNum = e;
          this.getCameraHeartbeatList()
        },
        doSearch() {
          this.pageNum = 1
          this.getCameraHeartbeatList()
        },
        doSearchClear() {
          this.params.startTime = ''
          this.params.endTime = ''
          this.pageNum = 1
          this.pageSize = 10
          this.getCameraHeartbeatList()
        },
        getCameraHeartbeatList() {
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
                  startDate: this.params.startTime,
                  endDate: this.params.endTime
              }
            }
            this.loading = true;
            course.getCameraWifiList(paramsData).then(res => {
              this.loading = false;
              if (res.result == false) {
                this.$message.error(res.data.message || res.data)
                return;
              }
              let resList = res.data.rows
              for( let i = 0; i < resList.length; i++ ) {
                let element = resList[i]
                let str1 = element.createdTime.split('.')[0]
                element.createdTime = str1.replaceAll('T', ' ')
              }
              this.dataList = resList
              this.total = res.data.total
            }).catch(e => {
              this.loading = false;
              this.$message.error('network Error!')
            })
        },
        selectionChange(e) {
          let SelectionData = [];
          e.forEach(res => {
            SelectionData.push(res)
          })
          this.SelectionData = SelectionData;
        },
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
  

  