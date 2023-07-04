import request from '@/utils/request'
export default {
    getChapterAndSection(courseId) {
        return request({
            url: '/edu/chapter/getChapterAndSection/' + courseId,
            method: 'get'
        })
    },
    deleteChapter(chapterId) {
        return request({
            url: '/edu/chapter/' + chapterId,
            method: 'delete'
        })
    },
    saveChapter(chapter) {
        return request({
            url: '/edu/chapter/saveChapter',
            method: 'post',
            params: chapter
        })
    },
    getChapterById(id) {
        return request({
            url: '/edu/chapter/getChapter/' + id,
            method: 'get'
        })
    },
    updateChapter(chapter) {
        return request({
            url: '/edu/chapter/',
            method: 'put',
            params: chapter
        })
    },
   
}