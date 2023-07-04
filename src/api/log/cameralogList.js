import log from '@/api/log/log'

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
             
              dialogVisible: false,
              actionDialog: false,
              cameraSnList:null,
              //查询条件集合
              cameraSn:this.$route.params.cameraSn,
              action:null,
              courseList:null,
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
     
     
    
     
      selectionChange(val) {
        console.log(val)
        this.multipleSelection = val
        this.cameraSnList = this.multipleSelection.map(function(item) {
          return item['deviceId']
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
        if (Online === true){
            return 'Online';
        }else if (Online === false){
            return 'Offline';
        }
    },
    handleClose(done) {
        this.$confirm('Confirm closure?')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      gotoCameraAction(){
    
          this.actionDialog = true;
      
      },
      cameraAction(){
        if(this.action === null){
          this.$message({
            type: 'error',
            message: 'Please input action'
        });
        }
        else{
          
        log.cameraActionBySn(this.action,this.cameraSn).then(response => {
          if(response.result){
            this.$message({
              type: 'success',
              message: 'Action Success!'
            });
            this.actionDialog = false;
            this.cameraSnList =null;
            this.queryCoursePageByCondition();
          }else{
            this.$message({
              type: 'error',
              message: response.data.message
            })
            return false
          }
        
          
      })
    }
      },

     
        //1.分页查询课程信息带条件
        queryCoursePageByCondition(pageNumUI = 1) {
            this.pageNum = pageNumUI
            console.log(this.cameraSn)
            log.queryCameraLogList(this.pageNum, this.pageSize, this.cameraSn)
            .then(response=>{
                this.total=response.data.total;
                this.courseList=response.data.rows;     
                for(let i = 0; i < this.courseList.length; i++) {
                  let element = this.courseList[i]
                  let str = element.logUrlCreatedTime.split('.')[0]
                  element.logUrlCreatedTime = str.replaceAll('T', ' ')
                }
      
                
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