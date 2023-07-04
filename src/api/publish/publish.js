import course from "@/api/course/course";
export default {
    data() {
        return {
            saveBtnDisabled: false, // 保存按钮是否禁用
            courseComfirmVO: {
                cover:'',

            },
            courseId: ''
        }
    },

    created() {
        this.courseId = this.$route.params.courseId;
        this.getCourseConfirmInfo();
    },

    methods: {
        publishCourse() {
            this.$confirm('Are you sure you want to publish this course?', 'prompt', {
                confirmButtonText: 'Confirm',
                cancelButtonText: 'Cancel',
                type: 'warning'
            })
                //确定的时候执行
                .then(() => {
                    course.publishCourse(this.courseId)
                        .then(response => {
                            this.$message({
                                type: "success",
                                message: "The release was successful!"
                            });
                            this.$router.push({ path: "/course/list" });
                        })
                })
                //取消的时候执行
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: 'Unpublished'
                    });
                });
        },
        getCourseConfirmInfo() {
            course.getCourseConfirmInfo(this.courseId)
                .then(response => {
                    this.courseComfirmVO = response.data.courseConfirmVo;
                })
        },
        previous() {
            console.log('previous')
            this.$router.push({ path: '/course/chapter/1' })
        },

        publish() {
            console.log('publish')
            this.$router.push({ path: '/course/list' })
        }
    }
}