import request from '@/utils/request'

export default {
    //1.分页查询讲师信息带条件
    queryTeacherPageByCondition(pageNum,pageSize,cameraVersion) {
        return request({
            url: '/camera/web/getVersionList/'+pageNum+"/"+pageSize,
            method: 'get',
            params: cameraVersion
        })
    },
    deleteTeacherById(version){
        return request({
            url:'/camera/web/versionDelete/'+version,
            method:'post'
        

        })
    },
    saveTeacher(cameraVersion){
        return request({
            url:'/camera/web/versionUpload',
            method:'post',
            data:cameraVersion
        })
    },
    deleteFile(version){
        return request({
            url:'/camera/web/deleteFile/'+version,
            method:'post',
        })
    },
    queryDeviceModelList(){
        return request({
            url:'/camera/web/getModelList',
            method:'get',
        })
    }
}