
class WxUserinfo {
    constructor() { }
    /** 头像地址 */
    avatarUrl: string = null;
    /** 本局双倍 */
    DoubleFlag: boolean = false;
    /** 登录凭证 */
    code: string = null;
    /** appId */
    appId: string = "wxed988900f738b004";
    /** ver */
    ver: string = "1.0.0";
    
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

    //获取是否本局双倍
    getDoubleFlag() {
        return this.User.DoubleFlag;
    }

    setDoubleFlag(flag:boolean) {
        this.User.DoubleFlag = flag;
    }
}