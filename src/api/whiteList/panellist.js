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
        
       
      
    },
  
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
              deletedialog: false,
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
      resetData(){
        this.camera.cameraSn = null
        this.camera.fwVersion = null
        this.camera.online = null
      },
     
      
      gotoAddWhiteList(){
        
        this.dialogVisible = true;
     
      },
      handleClose(done) {
        this.$confirm('Confirm closure?')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },

      gotoDeleteWhiteList(){
        this.deleteListdialog = true
      },

  
      deletePanelWhite(imei){
      

        this.$confirm("Are you sure to delete it?  "+imei, "", {
          confirmButtonText: "confirm",
          cancelButtonText: "Cancel",
          type: "warning"
        })
          //当用户点击确定的时候执行
          .then(() => {
            whiteList.deletePanelWhiteList(imei).then(response => {
              //a.删除成功之后提醒一下
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
              //b.刷新页面
              this.cameraSnList =null;
              this.queryCoursePageByCondition();
            });
          })
          //当用户点击取消的时候执行
          .catch(() => {
            this.$message({
              type: "info",
              message: "Cancel!"
            });
          });
      },
    
      deletePanelWhiteList(){
        if(this.action === null){
          this.$message({
            type: 'error',
            message: 'Please input imei'
        });
        }
        else{
          
        whiteList.deletePanelWhiteList(this.action).then(response => {

          
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
    
    
      addPanelWhiteList(){
       
          if(this.action === null){
            this.$message({
              type: 'error',
              message: 'Please input imei'
          });
          }
          else{
            
          whiteList.addPanelWhiteList(this.action).then(response => {

            
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
            
            whiteList.queryPanelWhiteListPageByImei2(this.pageNum, this.pageSize, this.camera.cameraSn)
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