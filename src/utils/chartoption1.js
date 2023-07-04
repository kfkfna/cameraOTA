// chartOptions.js
export default {
    title: {
      /* text: 'Camera Battery Temperature Comparison' */
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      orient: 'vertical',
      top: 25,
      left: 100,
      data: ['1200000001421391', '1200000004021391', '7203000001622421', '1200000030011161', '6202000009732421']
    },
    grid: {
      top: 20,
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    toolbox: {
      feature: {
  
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      splitLine: {
        show: true,
      },
      axisLine: {
        show: true, // 显示坐标轴线
      },
      data: ['11-23 10:16:49', '11-23 10:21:49', '11-23 10:26:49', '11-23 10:31:49', '11-23 10:36:49', '11-23 10:41:49', '11-23 10:46:49', '11-23 10:51:50', '11-23 10:56:50', '11-23 11:01:50', '11-23 11:06:50', '11-23 11:11:50']
    },
    yAxis: {
      show: true ,
      type: 'value'
      
    },
    series: [
      {
        name: '1200000001421391',
        type: 'line',
        symbol: 'circle',
        symbolSize: 8,
        data: [120, 132, 101, 134, 90, 230, 210, 132, 101, 134, 90, 230]
      },
      {
        name: '1200000004021391',
        type: 'line',
        symbol: 'circle',
        symbolSize: 8,
        data: [120, 132, 191, 234, 290, 330, 310, 232, 201, 154, 190, 330]
      },
      {
        name: '7203000001622421',
        type: 'line',
        symbol: 'circle',
        symbolSize: 8,
        data: [150, 232, 201, 154, 190, 330, 410, 332, 301, 334, 390, 330]
      },
      {
        name: '1200000030011161',
        type: 'line',
        symbol: 'circle',
        symbolSize: 8,
        data: [320, 332, 301, 334, 390, 330, 320, 290, 330, 310, 232, 201]
      },
      {
        name: '6202000009732421',
        type: 'line',
        symbol: 'circle',
        symbolSize: 8,
        data: [420, 432, 401, 434, 490, 430, 320, 334, 590, 330, 410, 232, 401]
      }
    ]
  }