import request from '@/utils/request'
export default {
    deleteSection(id) {
        return request({
            url: '/edu/section/' + id,
            method: 'delete'
        })
    },
    saveSection(section) {
        return request({
            url: '/edu/section/saveSection',
            method: 'post',
            params: section
        })
    },
    getSectionById(id) {
        return request({
            url: '/edu/section/getSection/' + id,
            method: 'get'
        })
    },
    updateSection(section) {
        return request({
            url: '/edu/section/',
            method: 'put',
            params: section
        })
    },
    deleteSingleVideo(videoId){
        return request({
            url: '/aliyun/' + videoId,
            method: 'delete'
        })
    }
}