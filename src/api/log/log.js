import request from '@/utils/request'
export default {
   
     //4.分页查询课程信息带条件
     queryPanelWhiteListPageByImei(pageNum, pageSize, imei) {
        return request({
            url: '/camera/web/getPanelWhiteList/'+pageNum+"/"+pageSize,
            method: 'get',
            params: {
                imei:imei
            }
        })
    },
    queryCameraWhiteListPageByCameraSn(pageNum,pageSize,cameraSn) {
        return request({
            url: '/camera/web/getCameraWhiteList/'+pageNum+"/"+pageSize,
            method: 'get',
            params: {
                cameraSn:cameraSn
            }
        })
    },
 
    cameraActionBySn(action,cameraSn){
        return request({
            url: '/camera/web/updateCameraActionByCameraSn/'+cameraSn,
            method: 'post',
            params:{
                action
            }
        })
    },
 
    queryCameraLogList(pageNum,pageSize,cameraSn) {
        return request({
            url: '/camera/web/selectCameraLog/'+pageNum+"/"+pageSize,
            method: 'get',   
            params: {
                cameraSn:cameraSn
            }        
        })
    },
    queryPanelLogList(pageNum,pageSize,imei) {
        return request({
            url: '/camera/web/selectPanelLog/'+pageNum+"/"+pageSize,
            method: 'get',   
            params: {
                imei:imei
            }        
        })
    },
    UploadLogBySn(cameraSn){
        return request({
            url: 'https://test.redbeecloud.com/RedbeeBackend/v1/panel/sendCmd/log',
            method: 'post',
            params:{
                imei:cameraSn
            }
        })
    },

}