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
      <el-button v-if="isChart" type="default" @click="cellClick(1)">Chart</el-button>
      <el-button v-else type="default" @click="switchTable">Table</el-button>
    </el-form>
    <!-- 表格 -->
    <div v-if="isChart">
    <el-table :data="dataList" 
    border fit highlight-current-row 
    ref="eventReportTable"
    v-loading="loading"
    @selection-change="selectionChange">
        <el-table-column type="selection" width="42" align="center"></el-table-column>
		<el-table-column align="center" prop="deviceId" :label="'DeviceId'"></el-table-column>
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
  <!-- 统计图 -->
  <div v-else class="network-panel">
			<div class="network-panel__title">Camera Battery Voltage / Battery Temperature</div>
			<div class="network-panel__charts">
				<div ref="chartSignal" style="height: 400px"></div>
			</div>
		</div>
    </div>
  </template>
  
  <script>
import course from '@/api/course/course'
import { getAMonth } from '@/utils/computationTime.js'
import chartOption from  '@/utils/chartoption1.js'

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
            loading: false,
            deviceId: '',
            isChart: true,
            pageNum: 1,
            pageSize: 10,
            total: 0,
            dataList: [],
            chart: null,
            resChartData: {},
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
      this.getCameraWifiList()
      
      if(this.chart) {
				this.chart.dispose();
			}
			this.chart = null;
    },
    methods: {
        switchTable() {
          this.params.startTime = '';
          this.params.endTime = '';
          this.isChart = true;
        },
        cellClick(v) {
          this.isChart = false;
          let timeObj = getAMonth()
          this.params.startTime = timeObj.start;
          this.params.endTime = timeObj.end;
          this.$nextTick(() => {
              this.newgetSignal()
          })
        },
        newgetSignal() {
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
          if(this.chart) {
            this.chart.dispose();
          }
          this.chart = null;
          this.chart = this.$echarts.init(this.$refs.chartSignal)
          this.chart.showLoading({
            text: '',
            color: '#16afff',
            lineWidth: 2,
            maskColor: 'rgba(255, 255, 255, 0.2)',
            zlevel: 0,
            });
          let _this = this
          let paramsData = {
                deviceId: this.deviceId,
                startDate: this.params.startTime,
                endDate: this.params.endTime
            }
            this.loading = true;
            course.getCameraWifiChart(paramsData).then(res => {
              this.loading = false;
              if (res.result == false) {
                this.$message.error(res.data.message || res.data)
                return;
              }
              this.resChartData = res.data
              this.initChart()
            }).catch(e => {
              console.log(e)
              this.loading = false;
              this.$message.error('network Error!')
            })
        },
        initChart() {
          let _this = this

          let comStatusList = _this.resChartData.onlineStatus.map((item)=>{
            if(item == true) return 1
            if(item == false) return 0
            return ''
          })
          let option = {
              title: {
                top: '20',
                left: '5%',
                subtextStyle: {
                  color: '#b03a5b'
                }
              },
              tooltip: {
                trigger: 'axis',
              },
              legend: {
                right: '3%',
                top: 0,
                data: ['Wifi Link Quality', 'Wifi Signal Level', 'Online Status']  // , 'Reboot'
              },
              grid: {
                left: '3%',
                right: '4%',
                bottom: '15%',
                containLabel: true
              },
              yAxis: [
                {
                  name: 'dB ( Signal value )' + '\n',
                  type: 'value',
                  nameLocation: 'middle',
                  axisLabel: {
                    show: true
                  },
                  axisTick: {           //坐标轴刻度设置
                    show: true
                  },
                  nameRotate: '90',
                  nameTextStyle: {
                    fontSize: 14 ,
                  },
                  boundaryGap: ['20%', '0%']
                },
                {
                  name: 'online / offline',
                  nameLocation: 'middle',
                  nameRotate: '90',
                  nameTextStyle: {
                    /* color: '#000', */
                    fontSize: 14 ,
                    /* fontStyle: 'italic', */
                    /* fontStyle: 'italic', */
                    /* fontWeight: 'bold', */
                    padding: [18, 0, 0, 0],
                    /* align: 'left' */
                  },
                  minInterval: 1,
                  min: 0,
                  max: 5,
                  // alignTicks: true,
                  type: 'value',
                  // inverse: true
                }
              ],
              xAxis: [{
                type: 'category',
                boundaryGap: false,
                splitLine: {
                  show: true,
                },
                axisLine: {
                  show: true, // 显示坐标轴线
                },
                data: _this.resChartData.createDate.map(function (str) {
                  let str1 = str.split('.')[0]
                  return str1.replace('T', '\n');
                })
              }],
              
              dataZoom: [
                {
                  type: 'inside',
                  start: 0,
                  end: 100,
                  xAxisIndex: [0],  // 控制第一个x轴
                },
                {
                  start: 10,
                  end: 30,
                  bottom: 30,
                  height: 25,
                  left: 65,
                }
              ],
              color: ['#87cefa', '#4169e1', '#78b693', '#e7a832'],
              series: [
                {
                  name:"Wifi Link Quality",
                  data: _this.resChartData.wifiLinkQuality,
                  type: 'line',
                  symbol: 'circle'
                },
                {
                  name: "Wifi Signal Level",
                  data: _this.resChartData.wifiSignalLevel,
                  type: 'line',
                  symbol: 'rect',
                  symbolSize: 6
                },
                {
                  name: "Online Status",
                  type: 'line',
                  symbol: 'circle',
                  yAxisIndex: 1,
                  data: comStatusList,
                },
              ]
            }
          if(this.resChartData.createDate.length === 0) {
            option.yAxis = [
              {
                show: true ,
                type: 'value'
              },
              {
                show: true ,
                type: 'value'
              }
            ]
            option.dataZoom = []
          }
          this.chart.setOption(option)
          this.chart.hideLoading();
        },
        newgetSignal1() {
          if(this.chart) {
            this.chart.dispose();
          }
          this.chart = null;

          this.chart = this.$echarts.init(this.$refs.chartSignal);
          this.chart.setOption(chartOption);
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
          this.getCameraWifiList()
        },
        doSearch() {
          if(!this.isChart) {
            this.newgetSignal();
          }else{
            this.pageNum = 1
            this.getCameraWifiList()
          }
        },
        doSearchClear() {
          if(!this.isChart) {
            this.params.startTime = ''
            this.params.endTime = ''
            this.newgetSignal();
          } else {
            this.params.startTime = ''
            this.params.endTime = ''
            this.pageNum = 1
            this.pageSize = 10
            this.getCameraWifiList()
          }
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
        getCameraWifiList() {
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

   .network {
		&-item {
			display: flex;
			justify-content: space-between;

			&>li {
				width: 30%; // 23
				margin-right: 0;
			}
		}

		&-lastPanelOffline {
			&__btnDate {
				width: 18px;
				height: 18px;
				margin-top: 0;
			}
		}

		&-panel {
			width: 100%;
			// height: 500px;
			height: 100%;
			background: #ffffff;
			box-shadow: 0px 3px 6px rgba(17, 30, 87, 0.2);
			border-radius: 4px;
			padding-top: 21px;
			margin-top: 24px;

			&__title {
				font-size: 16px;
				font-weight: bold;
				color: #333333;
				text-align: center;
			}

			&__charts {
				width: 100%;
				// height: 350px;
				height: 100%;


				&-legend {
					margin-right: 53px;

					li {
						display: flex;
						align-items: center;
						font-size: 10px;
						font-weight: bold;
						margin-top: 2px;

						.line {
							display: flex;
							align-items: center;
							justify-content: flex-end;
							width: 32px;
							height: 2px;
							margin-left: 10px;

							&::after {
								// content: "";
								// display: block;
								// width: 8px;
								// height: 8px;
								// border-radius: 50%;
								// margin-left: 1px;
								// background: inherit;
							}
						}

						.name {
							margin: 0 7px;
							color: #999999;
						}

						div {
							font-size: inherit;
						}
					}
				}
			}
		}
	}
  </style>
  

  