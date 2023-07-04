import course from "@/api/course/course";
import Tinymce from '@/components/Tinymce';
export default {
    components: { Tinymce },
    data() {
        return {
            saveBtnDisabled: false,
            BASE_API: process.env.BASE_API,
            //讲师列表信息
            teacherList: [],
            //一级课程分类信息
            parentSubjectList: [],
            //二级课程分类信息
            childSubjectList: [],
            //接收页面传递过来的数据信息
            courseInfo: {
                teacherId: '',
                //一级分类id
                parentSubjectId: '',
                //二级分类id
                childSubjectId: '',
                cover: '/static/ey1rk8.jpg',
                description: '',
                lessonNum: 0,
                price: 0,
                title: '',
                id: ''
            },
            //课程id
            courseId: '',
        }
    },
    methods: {
        saveOrUpdateCourseInfo() {
            if (this.$route.params.courseId) {
                //代表更新课程信息
                this.updateCourseInfo();
            } else {
                this.saveCourseInfo();
            }

        },
        updateCourseInfo() {
            course.updateCourseInfo(this.courseInfo)
                .then(response => {
                    this.$message({
                        type: "success",
                        message: "Course modification successful!"
                    });
                    //跳转到一个新的页面
                    this.$router.push({ path: '/course/chapter/' + this.courseId })
                })
        },
        saveCourseInfo() {

            
            course.saveCourseInfo(this.courseInfo).then(response => {
                this.$message({
                    type: "success",
                    message: "The addition succeeded"
                });
                this.$router.push({ path: '/course/chapter/' + response.data.courseId })
            })
        },

        getCourseById() {
            course.getCourseById(this.courseId).then(response => {
                this.courseInfo = response.data.courseInfoVo
                this.getAllTeacher();
                course.getAllSubject().then(response => {
                    this.parentSubjectList = response.data.allSubject
                    for (let i = 0; i < this.parentSubjectList.length; i++) {
                        const parentSubject = this.parentSubjectList[i];
                        if (this.courseInfo.parentSubjectId === parentSubject.id) {
                            this.childSubjectList = parentSubject.children
                        }
                    }
                })
            })
        },

        //1.查询所有讲师
        getAllTeacher() {
            course.getAllTeacher()
                .then(response => {
                    this.teacherList = response.data.teacherList;
                })
        },
        getAllSubject() {
            course.getAllSubject().then(response => {
                this.parentSubjectList = response.data.allSubject;
            })
        },
        getAllChildSubject(currentParentId) {
            for (let i = 0; i < this.parentSubjectList.length; i++) {
                const parentSubject = this.parentSubjectList[i];
                if (currentParentId === parentSubject.id) {
                    this.childSubjectList = parentSubject.children
                }

            }

        },
        //4.封面上传之前
        beforeUploadCover(file) {
            const isJPG = file.type === "image/jpeg";
            const isLittleThan2M = file.size / 1024 / 1024 < 2;
            if (!isJPG) {
                this.$message.error("Uploading avatar images can only be in JPG format!");
            }
            if (!isLittleThan2M) {
                this.$message.error("The size of the uploaded avatar image cannot exceed 2MB!");
            }
            return isJPG && isLittleThan2M;
        },
        //5.封面上传成功之后
        afterUploadCover(response) {
            this.courseInfo.cover = response.data.retUrl;
        },
    },
    created() {
        if (this.$route.params.courseId) {
            //编辑回显 根据id查询课程

            this.courseId = this.$route.params.courseId;
            this.getCourseById();
            // console.log(courseInfo);

        }
        else {
            //显示所有教师列表
            this.getAllTeacher();
            //显示所有科目
            this.getAllSubject();
        }
    },
    // watch: {
    //     $route(to,from){
    //         this.courseInfo=courseInfoVo
    //     }
    // }
}