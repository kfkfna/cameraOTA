import statistics from "@/api/statistics/statistics";
import echarts from "echarts";
export default {
  data() {
    return {
      queryObj: {
        beginTime: "",
        endTime: "",
        dataType: ""
      },
      xData: [],
      yData: [],
      title: ""
    };
  },
  methods: {
    showResult() {
      statistics.showStatistics(this.queryObj).then(response => {
        this.xData = response.data.xData;
        this.yData = response.data.yData;
        switch (this.queryObj.dataType) {
          case "register_num":
            this.title = "学员注册数统计";
            break;
          case "login_num":
            this.title = "学员登录数统计";
            break;
          case "video_view_num":
            this.title = "课程播放数统计";
            break;
          case "course_num":
            this.title = "每日课程数统计";
            break;
          default:
            break;
        }
        this.createEcharts();
      });
    },
    //画图
    createEcharts() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("chart"));

      // 指定图表的配置项和数据
      var option = {
        title: {
          text: this.title
        },
        tooltip: {},
        legend: {
          data: ['数据']
        },
        xAxis: {
          data: this.xData
        },
        yAxis: {},
        series: [
          {
            name: "数据",
            type: "bar",
            data: this.yData
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  }
};
