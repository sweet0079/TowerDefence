// 获取地址栏参数
export const GetQueryString = function (name: string) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    let r = window.location.search.substr(1).match(reg);
    if (r != null) return r ? decodeURIComponent(r[2]) : null;
    return null;
}

export const IsWeChat = function () {
    let ua = navigator.userAgent;
    if (ua.indexOf('MicroMessenger') > 1) return true;
    if (typeof wx !== 'undefined') return true;
    return false;
}

// 不好使 废弃 直接同时判断是否在微信环境和是否是pc环境就行了
// export const IsWeChatPc = function () {
//     let ua = navigator.userAgent;
//     let iswechatpc = ua.toLowerCase().match(/MicroMessenger\/(\d+\.\d+\.\d+)/) || ua.toLowerCase().match(/MicroMessenger\/(\d+\.\d+)/);
//     return iswechatpc ? iswechatpc[1] : null;
// }
export const IsPc = function () {
    let ua = navigator.userAgent;
    let ispc = /macintosh|window/.test(ua.toLowerCase());
    return ispc;
}

export const checkchinese = function (str: string) {
    let reg = new RegExp("[\\u4E00-\\u9FFF]+", "g");
    if (reg.test(str)) {
        return true;
    }
    else return false;
}

export const random = function (min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export let readcookie = function (name) {
    let cookievalue = "";
    let search = name + "=";
    if (document.cookie.length > 0) {
        let offset = document.cookie.indexOf(search);
        if (offset != -1) {
            offset += search.length;
            let end = document.cookie.indexOf(";", offset);
            if (end == -1) end = document.cookie.length;
            cookievalue = unescape(document.cookie.substring(offset, end))
        }
    }
    if (cookievalue !== '') return cookievalue;
    else return undefined;
}