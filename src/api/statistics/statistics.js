import request from '@/utils/request'

export default {
    //1.生成数据
    generateData(day) {
        return request({
            url: '/daily/statistics/generateData/'+day,
            method: 'get'
        })
    },
    //2.显示数据
    showStatistics(queryObj) {
        return request({
            url: `/daily/statistics/showStatistics/${queryObj.dataType}/${queryObj.beginTime}/${queryObj.endTime}`,
            method: 'get'
        })
    }
}