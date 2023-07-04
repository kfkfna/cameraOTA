<template>
    <div v-loading="isLoading" style="width: 1100px;">
      <div class="page-header">
          <h1 class="page-header-title">Camera Information</h1>
          <el-button type="primary" class="el-icon-refresh-right refresh-btn" @click="refresh">Refresh</el-button>
      </div>
      <el-table :data="tableData" style="width: 100%;">
        <el-table-column prop="item" label="Item" > </el-table-column>
        <el-table-column prop="status" label="Status">
          <template slot-scope="scope">
            <div v-if="scope.row.item === 'Camera Image'" >
              <el-image
							style="width:160px; height: 120px;border-radius: 6px;"
							:src="scope.row.status"
							fit="cover" alt="image"
              :preview-src-list="[scope.row.status]"
							></el-image>
            </div>
            <span v-else>{{scope.row.status}}</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="page-header">
          <h1 class="page-header-title">Camera Config</h1>
      </div>
      <el-table :data="ConfigData" style="width: 100%;">
        <el-table-column prop="item" label="Item" > </el-table-column>
        <el-table-column prop="status" label="Status">
          <template slot-scope="scope">
            <div v-if="scope.row.item === 'LED Ready Mode'" ><span style="background-color: #008000; color: #777777;">{{scope.row.status}}</span></div>
            <div v-else-if="scope.row.item === 'LED Incal Mode'" ><span style="background-color: #808080; color: #777777;">{{scope.row.status}}</span></div>
            <span v-else>{{scope.row.status}}</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="page-header">
          <h1 class="page-header-title">Camera Status</h1>
      </div>
      <el-table :data="StatusData" style="width: 100%">
        <el-table-column prop="item" label="Item"> </el-table-column>
        <el-table-column prop="status" label="Status"> </el-table-column>
      </el-table>
      <!-- <el-table :data="tableData" style="width: 100%; height: 1040px">
        <template slot="empty">
            <span>loading... </span>
        </template>
        <el-table-column prop="item" label="Item" > </el-table-column>
        <el-table-column prop="status" label="Status">
          <template slot-scope="{ row, column, $index }">
            <div v-if="row.item === 'Camera Image'" >
              <el-image
							style="width:160px; height: 120px;border-radius: 6px;"
							:src="row.status"
							fit="cover" alt="image"
              :preview-src-list="[row.status]"
							></el-image>
            </div>
            <span v-else>{{row.status}}</span>
          </template>
        </el-table-column>
      </el-table>
      <engineer-header-title :title="'Camera Cnpmonfig'" :isRefreshBtn="false"></engineer-header-title>
      <el-table :data="ConfigData" style="width: 100%">
        <el-table-column prop="item" label="Item"> </el-table-column>
        <el-table-column prop="status" label="Status">
          <template slot-scope="{ row, column, $index }">
            <div v-if="row.item === 'LED Ready Mode'" ><span style="background-color: #008000; color: #777777;">{{row.status}}</span></div>
            <div v-else-if="row.item === 'LED Incal Mode'" ><span style="background-color: #808080; color: #777777;">{{row.status}}</span></div>
            <span v-else>{{row.status}}</span>
          </template>
        </el-table-column>
      </el-table>
      <engineer-header-title :title="'Camera Status'" :isRefreshBtn="false"></engineer-header-title>
      <el-table :data="StatusData" style="width: 100%">
        <el-table-column prop="item" label="Item"> </el-table-column>
        <el-table-column prop="status" label="Status"> </el-table-column>
      </el-table> -->
    </div>
  </template>
  
  <script>

export default {
    data() {
        return {
          isLoading: false,
          deviceId: '',
          tableData: [],
          ConfigData: [],
          StatusData: [
            {
              item: "WIFI Signal Level",
              status: ''
            },
            {
              item: "WIFI Link Quality",
              status: ''
            }
          ]
        }
    },
    created() {
      this.deviceId = this.$route.params.deviceId;
      this.getCameraInfo()
    },
    methods: {
        refresh() {
          this.getCameraInfo()
        },
        async getCameraInfo() {
          this.isLoading = true;
          await this.getCameraInfoByDeviceId()
          await this.getCamreaConfigByDeviceId()
          await this.getCamreaStatusByDeviceId()
          
        },
        getCameraInfoByDeviceId() {
            this.$http.get('/camera/web/getCameraInfoByDeviceId?deviceId='+ this.deviceId).then(res => {
            if (res.data.result == false && res.data.error == '-1') {
              this.$message.error('query failed!')
              return;
            }
            let infoData = res.data

            function exchangeAble(cellValue) {
              if (Object.prototype.toString.call(cellValue)=='[object Boolean]') {
                  if(cellValue === true) return 'Enable';
                  if(cellValue === false) return 'Disable';
              }
              return '';
            }

            function exchangeStatus(v) {
              switch (v) {
                case 0:
                  return 'Inactive'
                case 1:
                  return 'Active'
                default:
                  return ''
              }
            }

            this.tableData = [
            {
              item: "Camera Sn",
              status: infoData.cameraSn,
            },
            {
              item: "imei",
              status: infoData.imei,
            },
            {
              item: "Camera Name",
              status: infoData.cameraName,
            },
            /* {
              item: "Camera Uid",
              status: infoData.cameraUid,
            }, */
            {
              item: "MAC Address",
              status: infoData.cameraMac,
            },
            /* {
              item: "Camera Image",
              status: infoData.cameraImage,
            }, */
            {
              item: "Camera UserName",
              status: infoData.cameraUsername,
            },
            /* {
              item: "Camera Password",
              status: infoData.cameraPassword,
            }, */
            {
              item: "Camera Type",
              status: infoData.cameraType,
            },
            {
              item: "Hw Version",
              status: infoData.hwVersion,
            },
            {
              item: "Fw Version",
              status: infoData.fwVersion,
            },
            {
              item: "Mcu Version",
              status: infoData.mcuVersion,
            },
            {
              item: "WIFI Ssid",
              status: infoData.wifiSsid,
            },
            {
              item: "Online Update Time",
              status: this.formatTimeStr(infoData.onlineUpdateTime),
            },
            {
              item: "Push Notification",
              status: exchangeAble(infoData.pushNotification),
            },
            {
              item: "Email Notification",
              status: exchangeAble(infoData.emailNotification),
            },
            {
              item: "Description",
              status: infoData.description,
            },
            {
              item: "Kvs Stream Arn",
              status: infoData.kvsStreamArn,
            },
            {
              item: "Region",
              status: infoData.region,
            },
            {
              item: "Camera Online",
              status: this.exchangeLine(infoData.cameraOnline),
            },
            {
              item: "Location",
              status: infoData.location,
            },
            {
              item: "Model Name",
              status: infoData.modelName,
            },
            {
              item: "IP Address",
              status: infoData.internalIp,
            },
            {
              item: "TimeZone",
              status: infoData.timeZone,
            },
            {
              item: "Heartbeat Time",
              status: infoData.heartbeatTime,
            },
            {
              item: "OTA Version",
              status: infoData.otaVersion,
            },
            {
              item: "OTA Status",
              status: infoData.otaStatus,
            },
            {
              item: "Activate Status",
              status: exchangeStatus(infoData.activateStatus),
            }
          ]
          for (let i = this.tableData.length - 1; i >= 0; --i) {
            const element = this.tableData[i];
            if(element.status === null || element.status === '') {
              this.tableData.splice(i, 1)
            }
          }
          }).catch(e => {
          })
        },
        exchangeLine(cellValue) {
          if (Object.prototype.toString.call(cellValue)=='[object Boolean]') {
              if(cellValue === true) return 'Online';
              if(cellValue === false) return 'Offline';
          }
          return '';
        },
        formatTimeStr(cellValue) {
          var ret = ''  //你想在页面展示的值
          if (Object.prototype.toString.call(cellValue)=="[object String]") {
            let str = cellValue.split('.')[0]
            ret = str.replaceAll('T', ' ')
          }
          return ret;
        },
        getCamreaConfigByDeviceId() {
          this.$http.get('/camera/web/getCameraSetting?deviceId='+ this.deviceId).then(res => {
					if (res.data.result == false && res.data.error == '-1') {
						this.$message.error('query failed!')
						return;
					}
          let configData = res.data

          function exchangeStr(cellValue) {
            if (Object.prototype.toString.call(cellValue)=='[object Boolean]') {
                if(cellValue === true) return 'On';
                if(cellValue === false) return 'Off';
            }
            return '';
          }

          function exchangeLevel(v) {
            switch (v) {
              case 0:
                return 'High'
              case 1:
                return 'Medium'
              case 2:
                return 'Low'
              default:
                return ''
            }
          }
          function exchangeType(v) {
            switch (v) {
              case 0:
                return 'Standard chime'
              case 1:
                return 'Digital door chime'
              default:
                return ''
            }
          }

          function exchangeImg(v) {
            switch (v) {
              case 0:
                return '1080P'
              case 1:
                return '720P(Better)'
              case 2:
                return '720P(Good)'
              case 3:
                return '480P'
              default:
                return ''
            }
          }


          this.ConfigData = [
          {
            item: "Button Notification",
            status: exchangeStr(configData.buttonNotification),
          },
          {
            item: "Motion Notification",
            status: exchangeStr(configData.motionNotification),
          },
          {
            item: "LED",
            status: exchangeStr(configData.led),
          },
          {
            item: "LED Brightness",
            status: exchangeLevel(configData.ledBrightness),
          },
          {
            item: "LED Ready Mode",
            status: configData.ledReadyMode
          },
          {
            item: "LED Incal Mode",
            status: configData.ledIncallMode
          },
          {
            item: "Doorbell Chime Sound",
            status: exchangeStr(configData.doorbellChimeSound)
          },
          {
            item: "Doorbell Chime Volume",
            status: exchangeLevel(configData.doorbellChimeVolume)
          },
          {
            item: "Doorbell Chime Ringtone",
            status: configData.doorbellChimeRingtone
          },
          {
            item: "External Chime Enable",
            status: exchangeStr(configData.externalChimeEnable)
          },
          {
            item: "External Chime Type",
            status: exchangeType(configData.externalChimeType)
          },
          {
            item: "Motion Detection",
            status: exchangeStr(configData.motionDetection)
          },
          {
            item: "Motion Detection Sensitivity",
            status: exchangeLevel(configData.motionDetectionSensitivity)
          },
          {
            item: "Image Quality",
            status: exchangeImg(configData.imageQuality)
          },
          {
            item: "Video Timestamp",
            status: exchangeStr(configData.videoTimestamp)
          },
          {
            item: "Avatar",
            status: exchangeStr(configData.avatar)
          },
          {
            item: "Siren",
            status: exchangeStr(configData.siren)
          },
          {
            item: "Speaker Volume",
            status: exchangeLevel(configData.speakerVolume)
          },
          {
            item: "Message Button Pressed",
            status: exchangeStr(configData.messageButtonPressed)
          },
          {
            item: "Message Motion Detection",
            status: exchangeStr(configData.messageMotionDetection)
          },
          {
            item: "Message Wifi Loss",
            status: exchangeStr(configData.messageWifiLoss)
          },
          {
            item: "Message Tamper",
            status: exchangeStr(configData.messageTamper)
          },
          {
            item: "Message Power Disconnected",
            status: exchangeStr(configData.messagePowerDisconnected)
          },
          {
            item: "Night Vision Auto",
            status: exchangeStr(configData.nightVisionAuto)
          },
          {
            item: "Ir LED",
            status: exchangeLevel(configData.irLed)
          }
        ]
				}).catch(e => {
				})
        },
        getCamreaStatusByDeviceId() {
          this.$http.get('/camera/web/getCameraStatusByDeviceId?deviceId='+ this.deviceId).then(res => {
            this.isLoading = false;
            if (res.data.result == false && res.data.error == '-1') {
              this.$message.error('query failed!')
              return;
            }
            let statusData = res.data

            this.StatusData = [
                {
                  item: "WIFI Signal Level",
                  status: statusData.wifiSignalLevel,
                },
                {
                  item: "WIFI Link Quality",
                  status: statusData.wifiLinkQuality
                }
            ]
          }).catch(e => {
            this.isLoading = false;
          })
        }
    },
}
  </script>
  
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
  .page-header {
      margin: 20px 0px;
      padding-bottom: 26px;
   }
  
   .page-header-title {
      float: left;
      font-family: inherit;
      font-weight: 500;
      line-height: 1.1;
      font-size: 24px;
      margin: 0;
   }
  
   .refresh-btn {
      float: right;
      width: 80px;
      height: 29px;
      font-size: 12px;
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

  </style>
  

  