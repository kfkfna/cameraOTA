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
    queryPanelWhiteListPageByImei2(pageNum, pageSize, imei) {
        return request({
            url: '/camera/web/getPanelWhiteList/'+pageNum+"/"+pageSize,
            method: 'get',
            params: {
                customerId: 1,
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
    addPanelWhiteList(imeiList){
        return request({
            url: '/camera/web/addPanelWhiteList/'+imeiList,
            method: 'post',
           
        })
    },
    addCameraWhiteList(cameraSn){
        return request({
            url: '/camera/web/addCameraWhiteList/'+cameraSn,
            method: 'post',
            
        })
    },

    deletePanelWhiteList(imeiList){
        return request({
            url: '/camera/web/deletePanelWhiteList/'+imeiList,
            method: 'post',
            
        })
    },

    deleteCameraWhiteList(cameraSn){
        return request({
            url: '/camera/web/deleteCameraWhiteList/'+cameraSn,
            method: 'post',
            
        })
    },
   
   

}