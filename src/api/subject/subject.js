import request from '@/utils/request'

export default {
    //1.查询所有的课程分类
    getAllSubject() {
        return request({
            url: '/edu/subject/getAllSubject/',
            method: 'get',
        })
    },
    //删除课程分类
    deleteSubjectById(subjectId){
        return request({
            url:'/edu/subject/'+subjectId,
            method:'delete'
        })
    }, 
    //添加一级分类
    saveParentSubject(subject) {
        return request({
            url: '/edu/subject/saveParentSubject',
            method: 'post',
            params:subject
        })
    },
    //4.添加二级分类
    saveChildSubject(subject) {
        return request({
            url: '/edu/subject/saveChildSubject',
            method: 'post',
            params:subject
        })
    },
}