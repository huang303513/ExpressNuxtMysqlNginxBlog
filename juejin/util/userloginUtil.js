import {
    getCookie,
    setCookie,
    delCookie
} from "~/util/cookieSessionStorate.js";

let hasLoginedCookKey = Symbol('hasLoginedCookKey');
let userSessionKey = Symbol('userSessionKey');


export default {
    checkLogined() {
        var cookValue = getCookie(hasLoginedCookKey.toString());
        return cookValue?true:false;
    },
    setLoginedUser(user) {
        setCookie(hasLoginedCookKey.toString(), true, 0.05);
        sessionStorage.setItem(userSessionKey.toString(), JSON.stringify(user));
    },
    getLoginedUser() {
        let user;
        if (!this.checkLogined()) {
            return null;
        }
        try {
            user = sessionStorage.getItem(userSessionKey.toString());
            if (user) {
                user = JSON.parse(user);
            }
        } catch (error) {
            user = null;
        }

        return user;
    },
    setLogout() {
        delCookie(hasLoginedCookKey.toString());
        sessionStorage.removeItem(userSessionKey.toString());
    }
}
