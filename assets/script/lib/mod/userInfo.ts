
class WxUserinfo {
    constructor() { }
    /** 头像地址 */
    avatarUrl: string = null
    /** 本局双倍 */
    DoubleFlag: boolean = false
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