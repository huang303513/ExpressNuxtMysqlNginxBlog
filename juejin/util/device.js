const UA = window.navigator.userAgent

const isIpad = /(iPad).*OS\s([\d_]+)/.test(UA)
const isIpod = /(iPod)(.*OS\s([\d_]+))?/.test(UA)
const isIphone = !isIpad && /(iPhone\sOS)\s([\d_]+)/.test(UA)
const isIos = isIpad || isIpod || isIphone
const isAndroid = /(Android);?[\s\/]+([\d.]+)?/.test(UA)
const isWechat = /micromessenger/i.test(UA)
const isQQ = /QQ\/([\d\.]+)/.test(UA)
const isQZone = /Qzone\//.test(UA)
const isQQMBrowser = /MQQBrowser/i.test(UA) && !isWechat && !isQQ
const isUCMBrowser = /UCBrowser/i.test(UA)
const isBAIDUMBrowser = /mobile.*baidu/i.test(UA)
const isApple = isIos;
export default {
    isIpad,
    isIpod,
    isIphone,
    isIos,
    isAndroid,
    isWechat,
    isQQ,
    isQZone,
    isQQMBrowser,
    isUCMBrowser,
    isBAIDUMBrowser,
    isApple
}
