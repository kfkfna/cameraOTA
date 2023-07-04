import whiteList from '@/api/whiteList/whiteList'
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ]),
    showRoles(){
    
        const role = this.roles;
       
        if(role.search("admin") != -1){
          return true
        }else{
          return false
        }
        
       
      
    }
  },
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
              deleteListdialog:false,
              cameraSnList:null,
              //查询条件集合
              camera:{
                cameraSn:null,
                fwVersion:null,
                online:null
              },
              action:null,
              courseList:[],
              cameraSnList1:null,
              // cameraOTAVO:{
              //   version:'',
              //   cameraSnList:{}
              // }

        }
    },
    methods: {
      handleClose(done) {
        this.$confirm('Confirm closure?')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      selectionChange(val) {
        this.multipleSelection = val
        this.cameraSnList = this.multipleSelection.map(function(item) {
          return item['deviceId']
        })
        console.log('选中的deviceId数组：' + this.cameraSnList)
      },
      gotoDeleteWhiteList(){
        this.deleteListdialog = true
      },

      deleteCameraWhite(cameraSn){
      

        this.$confirm("Are you sure to delete it?  "+cameraSn, "", {
          confirmButtonText: "confirm",
          cancelButtonText: "Cancel",
          type: "warning"
        }).then(() => {
            whiteList.deleteCameraWhiteList(cameraSn).then(response => {
      
              if(response.result){
                this.$message({
                  type: "success",
                  message: response.data
                });
              }else{
                this.$message({
                  type: "error",
                  message: response.data.message
                });
              }
              this.queryCoursePageByCondition();
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "Cancel!"
            });
          });
      },
    
      deleteCameraWhiteList(){
        if(this.action === null){
          this.$message({
            type: 'error',
            message: 'Please input CameraSn'
        });
        }
        else{
          
          whiteList.deleteCameraWhiteList(this.action).then(response => {

          
          if(response.result){
           
              this.$message({
                type: 'success',
                message: response.data
              });
            
            this.action = null;
            this.deleteListdialog = false;
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


      resetData(){
        this.camera.cameraSn = null
        this.camera.fwVersion = null
        this.camera.online = null
      },
      gotoCameraOTA(){
        if(this.cameraSnList === null || this.cameraSnList.length === 0){
          this.$message({
            type: 'error',
            message: 'Please select at least one CameraSn'
        });
        }else{
          this.dialogVisible = true;
          this.cameraSnList1 = this.cameraSnList;
        }
        
      },
      addCameraWhiteList(){
       
        if(this.action === null){
          this.$message({
            type: 'error',
            message: 'Please input CameraSn'
        });
        }
        else{
          
        whiteList.addCameraWhiteList(this.action).then(response => {
          if(response.result){
             
            this.$message({
              type: 'success',
              message: response.data
            });
          
            this.action = null;
            this.dialogVisible = false;
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
      gotoAddWhiteList(){
        
        this.dialogVisible = true;
     
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
            whiteList.queryCameraWhiteListPageByCameraSn(this.pageNum, this.pageSize, this.camera.cameraSn)
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