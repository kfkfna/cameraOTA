import request from '@/utils/request'
export default {
    getPanelEnvList(queryData){
        return request({
            url: '/camera/web/panelEnvList',
            method: 'post',
            data: queryData,
        })
    },
   
    //4.分页查询课程信息带条件
    queryCoursePageByCondition(pageNum, pageSize, camera) {
        return request({
            url: '/camera/web/getCameraList/'+pageNum+"/"+pageSize,
            method: 'get',
            params: camera
        })
    },
    UserqueryCameraSnList(cameraSn) {
        return request({
            url: '/camera/web/getCameraInfo?cameraSn=' + cameraSn,
            // url: '/camera/web/selectDeviceLog/'+cameraSn+"/"+pageNum+"/"+pageSize,
            method: 'get'
        })
    },
    queryTeacherPageByCondition(pageNum,pageSize,cameraVersion) {
        return request({
            url: '/camera/web/getVersionList/'+pageNum+"/"+pageSize,
            method: 'get',
            params: cameraVersion
        })
    },
    cameraOTA(version,cameraSnList){
        return request({
            url: '/camera/web/cameraOta/'+version+"/"+cameraSnList,
            method: 'post',
            //data:version,cameraSnList
        })
    },
    cameraCreateJob(cameraData){
        return request({
            url: '/camera/web/createJob',
            method: 'post',
            data: cameraData
        })
    },
    cameraAction(action,deviceIdList){
        return request({
            url: '/camera/web/updateCameraAction',
            method: 'post',
            data:deviceIdList,
            params:{
                action
            }
        })
    },
    cameraAction2(deviceAction2){
        return request({
            url: '/camera/web/createAction',
            method: 'post',
            data: deviceAction2,
        })
    },
    queryCameraLogList(pageNum,pageSize,cameraSn) {
        return request({
            url: '/camera/web/selectDeviceLog/'+cameraSn+"/"+pageNum+"/"+pageSize,
            method: 'get',           
        })
    },
    deleteCamera(deviceId){
        return request({
            url: '/camera/web/deleteCamera/'+deviceId,
            method: 'post',
        })
    },
    queryDeviceModelList(){
        return request({
            url:'/camera/web/getModelList',
            method:'get',
        })
    },
    resetOta(deviceId){
        return request({
            url: '/camera/web/resetOta/'+deviceId,
            method: 'post',
        })
    },
    getCameraEventPage(queryData){
        return request({
            url: '/camera/web/event/page',
            method: 'post',
            data: queryData,
        })
    },
    getCameraWifiList(queryData){
        return request({
            url: '/camera/web/getCameraWifiList',
            method: 'post',
            data: queryData,
        })
    },
    getCameraWifiChart(queryData){
        return request({
            url: '/camera/web/getCameraWifiChart',
            method: 'post',
            data: queryData,
        })
    },
    getCameraBetterySignalList(queryData){
        return request({
            url: '/camera/web/getCameraBetterySignalList',
            method: 'post',
            data: queryData,
        })
    },
    getCameraBetterySignalChart(queryData){
        return request({
            url: '/camera/web/getCameraBetterySignalChart',
            method: 'post',
            data: queryData,
        })
    },

}