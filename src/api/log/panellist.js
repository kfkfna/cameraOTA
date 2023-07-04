import log from '@/api/log/log'
import axios from 'axios'

export default {
    data() {
        return {
          modelName:"DoorBell",
            pageNum:1,
            pageSize:10,
            total:0,
            //课程列表
         
              versionList: [
               
              ],
              versionList1:null,
              version:null,
             
            
              cameraSnList:null,
              //查询条件集合
              camera:{
                cameraSn:null,
                fwVersion:null,
                online:null
              },
              courseList: [],
              cameraSnList1:null,
              // cameraOTAVO:{
              //   version:'',
              //   cameraSnList:{}
              // }

        }
    },
    methods: {
      resetData(){
        this.camera.cameraSn = null
        this.camera.fwVersion = null
        this.camera.online = null
      },
      
      gotoCameraLogList(cameraSn){
       
        log.queryPanelLogList(this.pageNum,this.pageSize,cameraSn).then(response=>{
          if(response.data.total === '' || response.data.total <1){
            this.$message({
              type: 'error',
              message: 'There\'s no log on this panel'
            });
            return false;
          }

          if(response.result === false){
            this.$message({
              type: 'error',
              message: response.data.message
            });
            return false;
          }else{
            console.log(this.cameraSn)  
            this.$router.push({ path: '/log/panellogList/' + cameraSn})
          }
        })    
        
       },
       gotoUploadLog(cameraSn, cameraId){
        this.$confirm(`Are you sure to upload ${cameraSn} logs to the background?`)
        .then(_ => {
          var asyncApi = null;
          switch (cameraId) {
            case 1:
              asyncApi = axios({
                url: 'https://ecosystem.redbeecloud.com/RedbeeBackend/v1/panel/sendAction/log',
                method: 'POST',
                params: {
                  imei:cameraSn
                }
              })
              break;
            case 2:
              asyncApi = axios({
                url: 'https://ecosystem.redbeecloud.com/RedbeeBackend/v1/panel/sendCmd/log',
                method: 'POST',
                params: {
                  imei:cameraSn
                }
              })
              break;
          
            default:
              break;
          }
          if (asyncApi === null) return;
          asyncApi.then(response=>{
            // console.log(response)
            if(response.data.result){
              this.$message({
                type: 'success',
                message: 'uploading log Successfully！'
              });
            } else {
              this.$message({
                type: 'error',
                message: `${response.data.data.message}`
              });
            }
          }).catch((err) => {
            this.$message({
              type: 'error',
              message: err
            });
          })

        })
        .catch(_ => { });
        
        
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
        if (Online === true){
            return 'Online';
        }else if (Online === false){
            return 'Offline';
        }
    },

     
        //1.分页查询课程信息带条件
        queryCoursePageByCondition(pageNumUI = 1) {
            this.pageNum = pageNumUI
          //   this.total = 367
          //   this.courseList = [
          //     {
          //         "imei": "0e67d59b48e1",
          //         "appId": "903618926624112640",
          //         "status": false,
          //         "isDeleted": false,
          //         "customerId": 1,
          //         "createdTime": "2022-09-15 01:18:04"
          //     },
          //     {
          //         "imei": "0e67d526c7c7",
          //         "appId": "903618926624112640",
          //         "status": false,
          //         "isDeleted": false,
          //         "customerId": 1,
          //         "createdTime": "2022-09-15 01:18:04"
          //     },
          //     {
          //         "imei": "166f06644448",
          //         "appId": "903618926624112640",
          //         "status": false,
          //         "isDeleted": false,
          //         "customerId": 1,
          //         "createdTime": "2022-09-13 06:49:42"
          //     },
          //     {
          //         "imei": "166f06410356",
          //         "appId": "903618926624112640",
          //         "status": false,
          //         "isDeleted": false,
          //         "customerId": 1,
          //         "createdTime": "2022-09-12 20:36:36"
          //     },
          //     {
          //         "imei": "166f0631bdbc",
          //         "appId": "903618926624112640",
          //         "status": false,
          //         "isDeleted": false,
          //         "customerId": 1,
          //         "createdTime": "2022-09-07 09:45:37"
          //     },
          //     {
          //         "imei": "166f06648d16",
          //         "appId": "903618926624112640",
          //         "status": false,
          //         "isDeleted": false,
          //         "customerId": 1,
          //         "createdTime": "2022-09-02 20:27:14"
          //     },
          //     {
          //         "imei": "166f06319fe5",
          //         "appId": "903618926624112640",
          //         "status": false,
          //         "isDeleted": false,
          //         "customerId": 1,
          //         "createdTime": "2022-09-02 10:25:39"
          //     },
          //     {
          //         "imei": "166f0664af8a",
          //         "appId": "903618926624112640",
          //         "status": false,
          //         "isDeleted": false,
          //         "customerId": 1,
          //         "createdTime": "2022-08-30 01:42:57"
          //     },
          //     {
          //         "imei": "166f0640edf0",
          //         "appId": "903618926624112640",
          //         "status": false,
          //         "isDeleted": false,
          //         "customerId": 2,
          //         "createdTime": "2022-08-26 06:17:29"
          //     },
          //     {
          //         "imei": "166f06319b59",
          //         "appId": "903618926624112640",
          //         "status": false,
          //         "isDeleted": false,
          //         "customerId": 2,
          //         "createdTime": "2022-08-26 04:02:07"
          //     }
          // ]
            log.queryPanelWhiteListPageByImei(this.pageNum, this.pageSize, this.camera.cameraSn)
            .then(response=>{
                this.total=response.data.total;
                this.courseList=response.data.rows;

                for(let i = 0; i < this.courseList.length; i++) {
                  let element = this.courseList[i]
                  let str = element.createdTime.split('.')[0]
                  element.createdTime = str.replaceAll('T', ' ')
                }
                // this.camera.cameraSn = null
                // this.camera.fwVersion = null
                // this.camera.online = null
                console.log(this.courseList);
            })
        },
    
      

    
       
    },
    created() {
      this.$nextTick(() => {
        for (let i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].isRerationItem.status == 1) {
            this.$refs.multipleTable.toggleRowSelection(this.tableData[i])
          }
        }
      });
  
        this.queryCoursePageByCondition();
        
       
    }
}