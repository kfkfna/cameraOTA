// 获取最近一个月的时间
export function getAMonth() {
    let end = new Date()
    let year = end.getFullYear()
    let month = end.getMonth() + 1 //0-11表示1-12月
    let day = end.getDate()

    function repair(i){
        if (i >= 0 && i <= 9) {
            return "0" + i;
        } else {
            return i;
        }
    }

    let hour = repair(end.getHours());//时
    let minute = repair(end.getMinutes());//分
    let second = repair(end.getSeconds());//秒

    let dateObj = {}
    // dateObj.end = year + '-' + month + '-' + day
    dateObj.end =
      year +
      '-' +
      (month >= 1 && month <= 9 ? '0' : '') +
      month +
      '-' +
      (day >= 0 && day <= 9 ? '0' : '') +
      day + ' ' + hour + ':' + minute + ':' + second
    let endMonthDay = new Date(year, month, 0).getDate() //当前月的总天数
    if (month - 1 <= 0) {
      //如果是1月，年数往前推一年
      dateObj.start =
        year - 1 + '-' + 12 + '-' + (day >= 0 && day <= 9 ? '0' : '') + day + ' 00:00:00'
    } else {
      let startMonthDay = new Date(year, parseInt(month) - 1, 0).getDate()
      if (startMonthDay < day) {
        //1个月前所在月的总天数小于现在的天日期
        if (day < endMonthDay) {
          //当前天日期小于当前月总天数
          //
          dateObj.start =
            year +
            '-' +
            (month - 1 >= 1 && month - 1 <= 9 ? '0' : '') +
            (month - 1) +
            '-' +
            (startMonthDay - (endMonthDay - day) >= 1 &&
            startMonthDay - (endMonthDay - day) <= 9
              ? '0'
              : '') +
            (startMonthDay - (endMonthDay - day)) + ' 00:00:00'
        } else {
          dateObj.start =
            year +
            '-' +
            (month - 1 >= 1 && month - 1 <= 9 ? '0' : '') +
            (month - 1) +
            '-' +
            (startMonthDay >= 0 && startMonthDay <= 9 ? '0' : '') +
            startMonthDay + ' 00:00:00'
        }
      } else {
        dateObj.start =
          year +
          '-' +
          (month - 1 >= 1 && month - 1 <= 9 ? '0' : '') +
          (month - 1) +
          '-' +
          (day >= 0 && day <= 9 ? '0' : '') +
          day + ' 00:00:00'
      }
    }
    return dateObj
  }