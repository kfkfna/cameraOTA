import subject from "@/api/subject/subject";
export default {
    data() {
        return {
            //课程分类集合
            subjectList: [],
            //默认属性值 映射关系
            defaultProps: {
                label: "title"
            },
            filterText: "",
            dialogFormVisible: false,
            subjectUI: {
                title: '',
                parentId: ''
            }
        };
    },
    methods: {
        //1.查询所有的课程分类
        getAllSubject() {
            subject.getAllSubject()
                .then(response => {
                    this.subjectList = response.data.allSubject;
                })
        },
        filterNode(value, data) {
            if (!value) return true;
            return data.title.indexOf(value) !== -1;
        },
        deleteSubjectById(node, data) {
            this.$confirm("确定要下此狠手吗?", "提示", {
                confirmButtonText: "确定干",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                subject.deleteSubjectById(data.id).then(response => {
                    this.$message({
                        type: "success",
                        message: "删除节点成功!"
                    })
                    this.$refs.subjectTree.remove(node)
                })
            }).catch(() => {
                this.$message({
                    type: "info",
                    message: "已取消删除"
                });

            })
        },
        //弹出添加页面
        openParentDialog() {
            this.dialogFormVisible = true;
            this.subjectUI.title = '';
            this.subjectUI.parentId = '';
        },
        //4.添加一级分类
        saveParentSubject() {
            subject.saveParentSubject(this.subjectUI).then(response => {
                this.$message({
                    type: 'success',
                    message: '已成功添加节点'
                });
                this.dialogFormVisible = false;
                this.getAllSubject();
            })
        },
        //5.添加二级分类弹框 data里面保存的是当前一级分类节点信息
        openChildDialog(data) {
            this.dialogFormVisible = true;
            //把data里面的id传递给subjectUi里面的parentid
            this.subjectUI.parentId = data.id;
            //清空title里面的内容
            this.subjectUI.title = '';

        },
        //添加二级分类
        saveChildSubject() {
            subject.saveChildSubject(this.subjectUI).then(response => {
                this.$message({
                    type: "success",
                    message: "添加二级节点成功"
                })
                this.dialogFormVisible = false;
                this.getAllSubject();
            })
        },
        saveParentOrChildSubject() {
            if (this.subjectUI.parentId) {
                this.saveChildSubject();
            } else {
                this.saveParentSubject();
            }

        }


    },
    watch: {
        filterText(val) {
            this.$refs.subjectTree.filter(val);
        }
    },
    created() {
        this.getAllSubject();
    }


}