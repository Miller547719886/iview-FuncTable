import Vue from 'vue'
let bus = new Vue()
/**
 * 触发事件
 * @param {String} eventName
 * @param {any} object
 */
function sendEvent (eventName, object) {
  bus.$emit(eventName, object)
}
/**
 * 绑定事件
 * @param {String} eventName
 * @param {Function} func
 */
function addEvent (eventName, func) {
  bus.$on(eventName, func)
}
/**
 * json转string
 * @param json
 * @returns {*}
 */
function jsonToStr (json) {
  if (typeof json === 'object') {
    try {
      return JSON && JSON.stringify(json)
    } catch (e) {
      return null
    }
  } else {
    return json
  }
}
/**
 * string转json
 * @param str
 * @returns {*}
 */
function strToJson (str) {
  if (typeof str === 'string') {
    try {
      return JSON && JSON.parse(str)
    } catch (e) {
      return null
    }
  } else {
    return str
  }
}
/**
 * 设置缓存
 * @param key
 * @param value
 */
function setStorage (key, value) {
  if (arguments.length === 2) {
    let v = value
    if (typeof v === 'object') {
      v = JSON.stringify(v)
      v = 'obj-' + v
    } else {
      v = 'str-' + v
    }
    localStorage.setItem(key, v)
  }
}
/**
 * 根据key取得缓存
 * @param key
 */
function getStorage (key) {
  let v = localStorage.getItem(key)
  if (!v) {
    return
  }
  if (v.indexOf('obj-') === 0) {
    v = v.slice(4)
    return JSON.parse(v)
  } else if (v.indexOf('str-') === 0) {
    return v.slice(4)
  }
}
/**
 * 根据key删除缓存
 * @param key
 */
function rmStorage (key) {
  localStorage.removeItem(key)
}
/**
 * 清空缓存
 */
function clearStorage () {
  localStorage.clear()
}
/**
 * 设置缓存
 * @param key
 * @param value
 */
function setSessionStorage (key, value) {
  if (arguments.length === 2) {
    let v = value
    if (typeof v === 'object') {
      v = JSON.stringify(v)
      v = 'obj-' + v
    } else {
      v = 'str-' + v
    }
    sessionStorage.setItem(key, v)
  }
}
/**
 * 根据key取得缓存
 * @param key
 */
function getSessionStorage (key) {
  let v = sessionStorage.getItem(key)
  if (!v) {
    return
  }
  if (v.indexOf('obj-') === 0) {
    v = v.slice(4)
    return JSON.parse(v)
  } else if (v.indexOf('str-') === 0) {
    return v.slice(4)
  }
}
/**
 * 根据key删除缓存
 * @param key
 */
function rmSessionStorage (key) {
  sessionStorage.removeItem(key)
}
/**
 * 清空缓存
 */
function clearSessionStorage () {
  sessionStorage.clear()
}

/**
 * 解析page
 * @param {*} page
 */
function analysisPage (page) {
  return page <= 0 ? 0 : page - 1
}
/**
 * 得到某一列的数据
 * @param {*} data
 * @param {*} column
 */
function getColumnData (data, column) {
  let result = []
  data.forEach(function (element) {
    result.push(element[column])
  })
  return result
}
/**
 * 去重
 * @param arr
 */
function unique (arr) {
  let set = new Set(arr)
  return Array.from(set)
}

/**
 * 删除多余空格与字符
 * @param str
 */
function trim (str) {
  var pattern = new RegExp("[`':;',‘；：”“'。，、？ ]")
  var rs = ''
  for (var i = 0; i < str.length; i++) {
    rs = rs + str.substr(i, 1).replace(pattern, '')
  }
  return rs
}

/**
 * 对象中指定值删除多余空格
 * @param obj
 * @param keys
 */
function clearString (obj, keys) {
  keys.map((key) => {
    if (Object.keys(obj).includes(key)) {
      obj[key] = trim(obj[key])
    }
  })
}

/**
 * 筛选复制对象不为空的内容
 * @param targetObj
 * @param initialObj
 */
function copyObj (targetObj, initialObj) {
  Object.keys(targetObj).forEach((key) => {
    if (initialObj[key] != null) {
      targetObj[key] = initialObj[key]
    }
  })
}
/**
 * 筛选复制对象所有内容
 * @param targetObj
 * @param initialObj
 */
function copyObjAll (targetObj, initialObj) {
  Object.keys(targetObj).forEach((key) => {
    targetObj[key] = initialObj[key]
  })
}

/**
 * 完全复制对象
 * @param targetObj
 * @param initialObj
 * @return { Object }
 */
function fullCopyObj (obj) {
  if (typeof obj === 'object') {
    if (Array.isArray(obj)) {
      var newArr = []
      for (var i = 0; i < obj.length; i++) newArr.push(obj[i])
      return newArr
    } else {
      var newObj = {}
      for (var key in obj) {
        newObj[key] = this.cloneObject(obj[key])
      }
      return newObj
    }
  } else {
    return obj
  }
};

/**
 * 计算年龄
 * @param strBirthday
 */
function computeAge (strBirthday) {
  if (!strBirthday) {
    return '--'
  }
  var returnAge
  var strBirthdayArr = strBirthday.split('-')
  var birthYear = strBirthdayArr[0]
  var birthMonth = strBirthdayArr[1]
  var birthDay = strBirthdayArr[2]

  var d = new Date()
  var nowYear = d.getFullYear()
  var nowMonth = d.getMonth() + 1
  var nowDay = d.getDate()

  if (nowYear === birthYear) {
    returnAge = 0 // 同年 则为0岁
  } else {
    var ageDiff = nowYear - birthYear // 年之差
    if (ageDiff > 0) {
      if (nowMonth === birthMonth) {
        var dayDiff = nowDay - birthDay // 日之差
        if (dayDiff < 0) {
          returnAge = ageDiff - 1
        } else {
          returnAge = ageDiff
        }
      } else {
        var monthDiff = nowMonth - birthMonth // 月之差
        if (monthDiff < 0) {
          returnAge = ageDiff - 1
        } else {
          returnAge = ageDiff
        }
      }
    } else {
      returnAge = -1 // 返回-1 表示出生日期输入错误 晚于今天
    }
  }

  return returnAge // 返回周岁年龄
}

function checkNumber (str) {
  var re = /[0-9]+/
  console.log(re.test(str), str)
  return re.test(str)
}

/**
 * ------------------
 * 格式化日期
 * ------------------
 */
function formatDate (date, fmt = 'yyyy-MM-dd') {
  var o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o) { if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) }
  return fmt
}

/* 去除表单的html和javascript代码 */
function delHtmlTag (str) {
  return str.replace(/<[^>]+>/g, '') // 去掉所有的html标记
}

export default {
  jsonToStr,
  strToJson,
  setStorage,
  getStorage,
  rmStorage,
  clearStorage,
  setSessionStorage,
  getSessionStorage,
  rmSessionStorage,
  clearSessionStorage,
  analysisPage,
  getColumnData,
  addEvent,
  sendEvent,
  unique,
  trim,
  clearString,
  copyObj,
  copyObjAll,
  fullCopyObj,
  computeAge,
  checkNumber,
  delHtmlTag,
  formatDate
}
