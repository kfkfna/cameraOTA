import log from '@/api/log/log'
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
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
            
              cameraSnList:null,
              //查询条件集合
              camera:{
                cameraSn:null,
                fwVersion:null,
                online:null
              },
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
     
      formatState: function (row, column, Online) {
        if (Online === true){
            return 'Online';
        }else if (Online === false){
            return 'Offline';
        }
    },

    gotoCameraLogList(cameraSn){
     
       
      log.queryCameraLogList(this.pageNum,this.pageSize,cameraSn).then(response=>{
        if(response.result === false){
          this.$message({
            type: 'error',
            message: response.data.message
          });
          return false;
        }else{
          console.log(this.cameraSn)  
          this.$router.push({ path: '/log/cameralogList/' + cameraSn})
        }
      })    
      
     },
        //1.分页查询课程信息带条件
        queryCoursePageByCondition(pageNumUI = 1) {
            this.pageNum = pageNumUI
            log.queryCameraWhiteListPageByCameraSn(this.pageNum, this.pageSize, this.camera.cameraSn)
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
        gotoUploadLog(cameraSn, cameraId){
          this.$http.get('/camera/web/uploadLogActionByCameraSn/'+ cameraSn).then(response => {
            if(response.result){
              this.$message({
                type: 'success',
                message: 'uploading log Successfully！'
              });
            }

            if(response.result === false){
              this.$message({
                type: 'error',
                message: response.data.message
              });
            }

          }).catch(err => {
            this.$message({
              type: 'error',
              message: err
            });
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