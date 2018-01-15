export function getCookie(key) {
    if (!document) {
        return key;
    }
    var cookies = document.cookie;
    var value;
    if (cookies) {
        var cookieArr = cookies.split("; ");
        for (var i = 0, cookie, index; i < cookieArr.length; i++) {
            cookie = cookieArr[i];
            index = cookie.indexOf("=");
            if (cookie.substr(0, index) == key) {
                value = cookie.substr(index + 1);
            }
        }
    }
    return value;
};


export function setCookie(cname, cvalue, exdays = 1) {
    if (!document) {
        return;
    }
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

export function delCookie(name) {
    if (!document) {
        return;
    }
    var exp = new Date();
    exp.setTime(exp.getTime() - 100000);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}
