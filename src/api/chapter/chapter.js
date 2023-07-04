import chapter from "@/api/chapter/chapter_back";
import section from "@/api/chapter/section_back";
export default {
  data() {
    return {
      saveBtnDisabled: false,
      courseId: '',
      //章节和小节数据信息
      chapterSectionList: [],
      chapterFormVisible: false,
      //章节输入信息
      chapterUI: {
        title: '',
        sort: 0,
        courseId: '',
      },
      //章节保持按钮是否可用
      saveChapterBtnDisabled: false,
      sectionFormVisible: false,
      sectionUI: {
        title: '',
        sort: 0,
        isFree: 0,
        videoSourceId: '',
        videoOriginalName: '',
        courseId: '',
        chapterId: '',
      },
      saveSectionBtnDisabled: false,
       //视频上传相关属性
       fileList: [],

    }
  },

  created() {
    this.courseId = this.$route.params.courseId;
    this.getChapterAndSection();

  },

  methods: {
    //添加小节
    saveSection() {
      section.saveSection(this.sectionUI).then(response => {
        this.$message({
          type: 'success',
          message: '添加成功'
        })
        this.sectionFormVisible = false
        this.getChapterAndSection()
      })
    },
    //修改小节
    updateSection() {
      section.updateSection(this.sectionUI).then(response => {
        this.$message({
          type: 'success',
          message: 'xiugai成功'
        })
        this.sectionFormVisible = false
        this.getChapterAndSection()
      })
    },
    //添加小节弹框
    saveSectionDialog(chapterId) {
      this.sectionFormVisible = true;
      this.sectionUI = {};
      this.sectionUI.courseId = this.$route.params.courseId;
      this.sectionUI.chapterId = chapterId
    },
    //修改小节弹框
    updateSectionDialog(sectionId) {
      this.sectionFormVisible = true;
      section.getSectionById(sectionId).then(response => {
        this.sectionUI = response.data.section
      }
      )
    },
    //删除章节
    deleteChapter(chapterId) {
      this.$confirm("你确定要下此狠手吗?", "提示", {
        confirmButtonText: "确定干",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          chapter.deleteChapter(chapterId)
            .then(() => {
              //a.弹框提醒添加成功
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.getChapterAndSection();
            })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //删除小节
    deleteSection(sectionId) {
      this.$confirm("您是否确定要下此狠手吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        section.deleteSection(sectionId).then(() => {
          this.$message({
            type: "success",
            message: "删除小节成功!"
          });
          this.getChapterAndSection();
        })
      })
    },
    //修改章节弹框
    updateChapterDialog(chapterId) {
      this.chapterFormVisible = true;
      chapter.getChapterById(chapterId)
        .then(response => {
          this.chapterUI = response.data.chapter;
          this.fileList = [{'name':this.sectionUI.videoOriginalName}]
        })
    },
    //添加或修改小节方法
    saveOrUpdateSection() {
      if (this.sectionUI.id) {
        this.updateSection();
      } else {
        this.saveSection();
      }
    },
    //添加或修改章节方法
    saveOrUpdateChapter() {
      if (this.chapterUI.id) {
        this.updateChapter()
      } else {
        this.saveChapter()
      }
    },
    //修改章节方法
    updateChapter() {
      chapter.updateChapter(this.chapterUI).then(response => {
        this.$message({
          type: 'success',
          message: "xiugai成功!"
        })
        this.chapterFormVisible = false;
        this.getChapterAndSection();
      })
    },
    //添加章节方法
    saveChapter() {
      chapter.saveChapter(this.chapterUI).then(response => {
        this.$message({
          type: 'success',
          message: "添加成功!"
        })
        this.chapterFormVisible = false;
        this.getChapterAndSection();
      })
    },
    //上传视频
    
    //上传视频成功之后
    uploadVideoSuccess(response, file) {
      this.sectionUI.videoSourceId = response.data.videoId;
      this.sectionUI.videoOriginalName = file.name;
    },
    //2.删除视频之前
    beforeVideoDelete(file) {
      return this.$confirm(`确定要删除${file.name}`);
    },
    //3.删除视频
    deleteVideo() {
      section.deleteSingleVideo(this.sectionUI.videoSourceId)
        .then(response => {
          this.$message({
            type: "success",
            message: "删除视频成功!"
          });
          this.sectionUI.videoSourceId = '';
          this.sectionUI.videoOriginalName = '';
          //清空文件列表
          this.fileList = {};
        })
    },
    //3.视频上传多于一个的时候
    uploadExceed() {

    },
    //添加章节弹框
    saveChapterDialog() {
      this.chapterUI = {};
      this.chapterFormVisible = true;
      this.chapterUI.courseId = this.$route.params.courseId;

    },
    //获取章节和小节
    getChapterAndSection() {
      chapter.getChapterAndSection(this.courseId)
        .then(response => {
          this.chapterSectionList = response.data.chapterSectionList;
        })
    },
    previous() {
      console.log('previous')
      this.$router.push({ path: '/course/form/'+this.courseId })
    },

    next() {
      console.log('next')
      this.$router.push({ path: '/course/publish/'+this.courseId })
    }
  }
}