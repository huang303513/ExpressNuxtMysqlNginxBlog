
export function formatDate(timestamp) {
  let date = new Date(timestamp);
  return date.getYear() + "-" + date.getMonth() + 1 + "-" + date.getDate() + "   " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
}
/**
 * 把一个js对象转换为sql操作字符串
 * @param {*} object 
 */
export function postToSQLUpdate(object) {
  let updated = [], params = [];
  for (var key in object) {
    if (object.hasOwnProperty(key)) {
      if (key === 'id') {
        continue;
      }
      updated.push(key + ' = ?')
      params.push(object[key])
    }
  }
  updated.push('updated_at = ?')
  params.push(Date.now())
  return {
    updated: updated.join(','),
    params: params
  }
}

export function deepCopy(object) {
  return JSON.parse(JSON.stringify(object))
}

export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time)

  if (between < 3600) {
    return pluralize(~~(between / 60), ' 分钟前')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' 小时前')
  } else {
    return pluralize(~~(between / 86400), ' 天前')
  }
}
/**
 * 在服务端获取cookie
 * @param {获取request的cookie} req 
 */
export function getCookiesInServer(req) {
  let Cookies = {};
  req && req.headers.cookie && req.headers.cookie.split(';').forEach(function (Cookie) {
    let parts = Cookie.split('=');
    Cookies[parts[0].trim()] = (parts[1] || '').trim();
  });
  return Cookies;
}
/**
 * 在客户端设置cookie
 * @param {*} name 
 * @param {*} value 
 * @param {*} minutes 
 */
export function setCookieInClient(name, value, minutes) {
  let exp = new Date();
  exp.setTime(exp.getTime() + minutes * 60 * 1000);
  document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

/**
 * 获取浏览器端指定的cookie
 * @param {*} name 
 */
export function getCookieInClient(name) {
  let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return unescape(arr[2]);
  else
    return null;
}

/**
 * 百度统计脚本
 */
export function baidutongji() {
  var _hmt = _hmt || [];
  (function() {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?96b0d09e8d132a6e61f66ea86b479b70";
    var s = document.getElementsByTagName("script")[0]; 
    s.parentNode.insertBefore(hm, s);
  })();


}
/**
 * 适配移动端屏幕
 */
export function mobilePage() {
  (function() {
    var hm = document.createElement("script");
    hm.src = "https://www.huangchengdu.com/javascripts/screen.js";
    var s = document.getElementsByTagName("script")[0]; 
    s.parentNode.insertBefore(hm, s);
  })();
}
