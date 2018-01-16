import {getCookie,setCookie,delCookie} from "./cookieSessionStorate.js";
let hasLoginedCookKey = 'hasLoginedCookKey';
let userSessionKey = 'userSessionKey';
let homeSessionListKey = "homeSessionListKey";


export default {
    checkLogined() {
        var cookValue = getCookie(hasLoginedCookKey);
        return cookValue?true:false;
    },
    setLoginedUser(user) {
        setCookie(hasLoginedCookKey, true, 0.05);
        if (sessionStorage) {
            sessionStorage.setItem(userSessionKey, JSON.stringify(user));
        }
    },
    getLoginedUser() {
        let user;
        if (!this.checkLogined()) {
            return null;
        }
        try {
            if (sessionStorage) {
                user = sessionStorage.getItem(userSessionKey);
            }
            if (user) {
                user = JSON.parse(user);
            }
        } catch (error) {
            user = null;
        }

        return user;
    },
    setLogout() {
        delCookie(hasLoginedCookKey);
        if (sessionStorage) {
            sessionStorage.removeItem(userSessionKey);
        }
    },
    setSessionData(value){
        if (sessionStorage) {
            sessionStorage.setItem(homeSessionListKey,JSON.stringify(value));
        }
        
    },
    getSessionData(){
        let data = {};
        if (sessionStorage) {
            data = sessionStorage.getItem(homeSessionListKey) || {};
        }
        return data;
    }
}
