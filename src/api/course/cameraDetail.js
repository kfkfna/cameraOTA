import course from '@/api/course/course'
import CameraInfo from '@/views/course/cameraDetails/CameraInfo';
import CameraEventReport from '@/views/course/cameraDetails/CameraEventReport';
import CameraHeartbeat from '@/views/course/cameraDetails/CameraHeartbeat';
import CameraWIFISignal from '@/views/course/cameraDetails/CameraWIFISignal';
import CameraBatterySignal from '@/views/course/cameraDetails/CameraBatterySignal';

import { mapGetters } from 'vuex'
export default {
  components: { CameraInfo, CameraEventReport, CameraHeartbeat, CameraWIFISignal, CameraBatterySignal },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ]),
  },
  data() {
    return {
        tabCurrentComponent: 'CameraInfo',
        type: 0,
        navList: [{
            name: 'Camera Information',
        },
        {
            name: 'Event Report List',
        },
        {
            name: 'Camera Heartbeat',
        },
        {
            name: 'Camera WIFI List',
        },
        {
            name: 'Camera Battery List',
        }],
        //
      modelName: "DoorBell",
      pageNum: 1,
      pageSize: 10,
      total: 0,
      //课程列表
      versionList: [

      ],
      versionList1: null,
      version: null,
      dt: new Date(),

      dialogVisible: false,
      actionDialog: false,
      cameraSnList: null,
      //查询条件集合
      camera: {
        cameraSn: null,
        fwVersion: null,
        online: null,
        modelId: null
      },
      action: null,
      courseList: null,
      cameraSnList1: null,
      modelList: null,
      selectModelList: null,
      otaversionList: null,
      // cameraOTAVO:{
      //   version:'',
      //   cameraSnList:{}
      // }

      otaversion: {
        modelId: null
      }

    }
  },
  methods: {
    navListClick(index) {
      if(this.type != index) {
        switch (index) {
          case 0:
            this.tabCurrentComponent = CameraInfo;
            break;
          case 1:
            this.tabCurrentComponent = CameraEventReport;
            break;
          case 2:
            this.tabCurrentComponent = CameraHeartbeat;
            break;
          case 3:
            this.tabCurrentComponent = CameraWIFISignal;
            break;
          case 4:
            this.tabCurrentComponent = CameraBatterySignal;
            break;
          default:
            break;
        }
        // switch (index) {
        //   case 0:
        //     this.tabCurrentComponent = CameraInfo;
        //     break;
        //   case 1:
        //     this.tabCurrentComponent = CameraEventReport;
        //     break;
        //   case 2:
        //     this.tabCurrentComponent = CameraHeartbeat;
        //     break;
        //   case 3:
        //     this.tabCurrentComponent = CameraWIFISignal;
        //     break;
        //   case 4:
        //     this.tabCurrentComponent = CameraBatterySignal;
        //     break;
        //   default:
        //     break;
        // }
      }
      this.type = index
    },
    resetData() {
      this.camera.cameraSn = null
      this.camera.fwVersion = null
      this.camera.online = null
      this.camera.modelId = null

    },
    gotoCameraOTA() {
      var selectModelList = Array.from(new Set(this.selectModelList))
      if (selectModelList.length > 1) {
        this.$message({
          type: 'error',
          message: 'Select Camera contains different models'
        });
        return false
      }
      if (this.cameraSnList === null || this.cameraSnList.length === 0) {
        this.$message({
          type: 'error',
          message: 'Please select at least one CameraSn'
        });
      } else {
        this.dialogVisible = true;
        this.cameraSnList1 = this.cameraSnList;
        this.otaversion.modelId = selectModelList[0];
        var cameraVersion = this.otaversion;
        course
          .queryTeacherPageByCondition(
            1,
            100,
            cameraVersion
          )
          // this.pageNum,
          // this.pageSize, 固定参数后面优化
          //调用成功之后
          .then(response => {
            this.otaversionList = response.data.rows;


          });

      }

    },

    gotoCameraAction() {
      if (this.cameraSnList === null || this.cameraSnList.length === 0) {
        this.$message({
          type: 'error',
          message: 'Please select at least one CameraSn'
        });
      } else {
        this.actionDialog = true;
        this.cameraSnList1 = this.cameraSnList;
      }

    },
    cameraOTA() {

      if (this.version === null) {
        this.$message({
          type: 'error',
          message: 'Please select a version'
        });
      }
      else {
        // this.cameraOTAVO.cameraSnList = this.cameraSnList;
        // this.cameraOTAVO.version = this.version

        // var cameraOTAVO ={version:'',
        //                   cameraSnList:{}
        // }
        // cameraOTAVO.cameraSnList = this.cameraSnList;
        // cameraOTAVO.version = this.version;
        // console.log("qqqqqq", this.version, this.cameraSnList)
        // console.log("this.cameraSnList", this.cameraSnList)
        // console.log("cameraVersion", this.otaversion)
        if(this.otaversion.modelId === 4 || this.otaversion.modelId === 7) {
          // 请求
          console.log('modelId 4 or 7', this.otaversion)
          let postData = {
            "deviceIds": this.cameraSnList,
            "modifyBy": 'snet@smarttech.snet.com',
            "version": this.version,
            "time": this.dt,
          }

          course.cameraCreateJob(postData).then(response => {
            if (response.result) {
              if (response.data === '' || response.data === null) {
                this.$message({
                  type: 'success',
                  message: 'OTA Success!'
                });
              } else {
                this.$message({
                  type: 'error',
                  message: 'error'
                });
              }
  
              this.dialogVisible = false;
              this.cameraSnList = null;
              this.selectModelList = null;
  
              this.version = null;
              this.requery();
            } else {
              this.$message({
                type: 'error',
                message: response.data.message
              })
              return false
            }
          })
          return
        } 
        course.cameraOTA(this.version, this.cameraSnList).then(response => {
          if (response.result) {
            if (response.data.message === '' || response.data.message === null) {
              this.$message({
                type: 'success',
                message: 'OTA Success!'
              });
            } else {
              this.$message({
                type: 'error',
                message: response.data.message
              });
            }

            this.dialogVisible = false;
            this.cameraSnList = null;
            this.selectModelList = null;

            this.version = null;
            this.requery();
          } else {
            this.$message({
              type: 'error',
              message: response.data.message
            })
            return false
          }
        })
      }
    },

    cameraAction() {
      if (this.action === null) {
        this.$message({
          type: 'error',
          message: 'Please input action'
        });
      }
      else {
        // console.log('this.multipleSelection', this.multipleSelection)
        // console.log('this.selectModelList', this.selectModelList)
        // console.log('this.cameraSnList', this.cameraSnList)
        // console.log('this.action, this.cameraSnList', this.action, this.cameraSnList)
        let deviceIdList1 = [];
        let deviceIdList2 = [];
        for (let i = 0; i < this.multipleSelection.length; i++) {
          const element = this.multipleSelection[i];
          if(element['modelId'] === 4 || element['modelId'] === 7) {
            deviceIdList1.push(element['deviceId'])
          }else {
            deviceIdList2.push(element['deviceId'])
          }
        }
        // console.log(deviceIdList1, deviceIdList2)
        if(deviceIdList1.length > 0) {
          let paramsData = {
            "deviceIds": deviceIdList1,
            "action": this.action
          }
          course.cameraAction2(paramsData).then(response => {
            if (response.result) {
              this.$message({
                type: 'success',
                message: 'Action Success!'
              });
              this.actionDialog = false;
              this.cameraSnList = null;
              this.requery();
            } else {
              this.$message({
                type: 'error',
                message: response.data.message
              })
              return false
            }
          })
        }
        if(deviceIdList2.length > 0) {
          course.cameraAction(this.action, deviceIdList2).then(response => {
            if (response.result) {
              this.$message({
                type: 'success',
                message: 'Action Success!'
              });
              this.actionDialog = false;
              this.cameraSnList = null;
              this.requery();
            } else {
              this.$message({
                type: 'error',
                message: response.data.message
              })
              return false
            }
          })
        }
        
      }
    },


    handleClose(done) {
      this.$confirm('Confirm closure?')
        .then(_ => {
          done();
        })
        .catch(_ => { });
    },
    selectionChange(val) {
      this.multipleSelection = val
      this.cameraSnList = this.multipleSelection.map(function (item) {
        return item['deviceId']
      })
      this.selectModelList = this.multipleSelection.map(function (item) {
        return item['modelId']
      })
      console.log('选中的deviceId数组：' + this.cameraSnList)
    },
    // timeStampToDate:function(data){
    //   var date = new Date(data)
    //   var Y = date.getFullYear() + '-'
    //   var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    //   var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
    //   var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
    //   var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
    //   var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
    //   return Y + M + D + h + m + s

    // },
    formatState: function (row, column, Online) {
      if (Online === true) {
        return 'Online';
      } else if (Online === false) {
        return 'Offline';
      }
    },
    queryDeviceModelList() {
      course.queryDeviceModelList().then(response => {
        this.modelList = response.data
      })
    },
    // 1.分页查询课程信息带条件
    queryCoursePageByCondition(pageNumUI = 1) {
      this.pageNum = pageNumUI
      course.queryCoursePageByCondition(this.pageNum, this.pageSize, this.camera)
        .then(response => {
          this.total = response.data.total;
          this.courseList = response.data.rows;
          for(let i = 0; i < this.courseList.length; i++) {
            let element = this.courseList[i]
            let str = element.onlineUpdateTime.split('.')[0]
            element.onlineUpdateTime = str.replaceAll('T', ' ')
          }
          // this.camera.cameraSn = null
          // this.camera.fwVersion = null
          // this.camera.online = null
        })
    },

    roleQueryCameraSnInfo() {
      if (this.isUser) {
        this.UserqueryCameraSnInfo(1)
      } else {
        this.queryCoursePageByCondition()
      }
    },

    UserqueryCameraSnInfo(v) {
      // console.log('2333', this.camera.cameraSn)
      if (this.camera.cameraSn === '' || this.camera.cameraSn === null) {
        this.courseList = []
        return
      }
      course.UserqueryCameraSnList(this.camera.cameraSn)
        .then(response => {
          // this.total = response.data.total;
          // console.log(response)
          if (response.data && response.result) {
            // console.log([response.data.data])
            this.courseList = [response.data]
            for(let i = 0; i < this.courseList.length; i++) {
              let element = this.courseList[i]
              let str = element.onlineUpdateTime.split('.')[0]
              element.onlineUpdateTime = str.replaceAll('T', ' ')
            }
          } else {
            this.courseList = []
            if (v) {
              this.$message({
                type: 'info',
                message: 'The search results are empty!'
              })
            }
          }
        })
    },

    queryTeacherPageByCondition(pageNumUI = 1) {
      this.pageNum = pageNumUI;
      course
        .queryTeacherPageByCondition(
          1,
          100,
          this.cameraVersion
        )
        // this.pageNum,
        // this.pageSize,
        //调用成功之后
        .then(response => {
          this.versionList = response.data.rows;
        });
    },

    resetOta(deviceId) {
      this.$confirm("deviceId: " + deviceId, "Are you sure Reset OTA ? ", {

        confirmButtonText: "confirm",
        cancelButtonText: "Cancel",
        type: "warning"
      })
        .then(() => {
          course.resetOta(deviceId)
            .then(response => {
              if (response.result) {
                this.$message({
                  type: "success",
                  message: "ResetOTA Success!"
                });

              } else {

                this.$message({
                  type: "error",
                  message: response.data.message
                });
              }
              this.requery();
            })

        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Cancel"
          });
        });
    },


    deleteCourse(deviceId) {
      this.$confirm("deviceId: " + deviceId, "Are you sure delete this camera?", {

        confirmButtonText: "confirm",
        cancelButtonText: "Cancel",
        type: "warning"
      })
        .then(() => {
          course.deleteCamera(deviceId)
            .then(response => {
              if (response.result) {
                this.$message({
                  type: "success",
                  message: "Delete Success!"
                })
              } else {
                this.$message({
                  type: "error",
                  message: response.data.message
                })
              }
              if (this.$store.getters.roles === 'user') {
                this.UserqueryCameraSnInfo()
              }
              this.requery()
            })

        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Cancel"
          });
        });
    },

    requery() {
      // console.log(this.$store.getters.roles)
      if (!(this.$store.getters.roles === 'user')) {
        this.queryCoursePageByCondition()
        this.queryTeacherPageByCondition()
        this.queryDeviceModelList()
      }
    }
  },
  created() {
    this.$nextTick(() => {
      // console.log('ddddd', this.tableData)
      /* for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].isRerationItem.status == 1) {
          this.$refs.multipleTable.toggleRowSelection(this.tableData[i])
        }
      } */
    })
    this.requery()
  }
}
