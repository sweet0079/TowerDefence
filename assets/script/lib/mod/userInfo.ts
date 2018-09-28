
class WxUserinfo {
    constructor() { }
    /** 头像地址 */
    avatarUrl: string = null;
    /** 登录凭证 */
    code: string = null;
    /** appId */
    appId: string = "wxed988900f738b004";
    /** ver */
    ver: string = "1.0.0";
    /** 是否是 iOS */
    isiOS: boolean = false;
    /** 是否合法 */
    isLegal: boolean = false;
}

export default class userInfo {
    private static instance: userInfo = null
    static getinstance() {
        if (userInfo.instance) return userInfo.instance;
        else return new userInfo();
    }
    static newinstance() {
        return new userInfo();
    }
    User: WxUserinfo

    constructor() {
        this.User = new WxUserinfo();
        userInfo.instance = this;
    }
    //获取是否合法
    getisLegal() {
        return this.User.isLegal;
    }

    //设置是否合法
    setisLegal(str:boolean) {
        this.User.isLegal = str;
    }

    //获取是否是 iOS
    getisiOS() {
        return this.User.isiOS;
    }

    //设置是否是 iOS
    setisiOS(str:boolean) {
        this.User.isiOS = str;
    }

    //获取登录凭证
    getver() {
        return this.User.ver;
    }

    //获取登录凭证
    getappID() {
        return this.User.appId;
    }

    //获取登录凭证
    getcode() {
        return this.User.code;
    }

    setcode(str:string) {
        this.User.code = str;
    }

    //获取用户头像地址
    getuserAvatar() {
        return this.User.avatarUrl;
    }

    setuserAvatar(str:string) {
        this.User.avatarUrl = str;
    }
}