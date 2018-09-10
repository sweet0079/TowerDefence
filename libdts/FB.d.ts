
declare namespace _fb {
    interface userInfo {
        nick_name: string,// 设置昵称
        id: string,// 设置 ID
        photoUrl: string,//设置头像
        contextID: string, // 游戏 ID
        contextType: number, // 游戏类型
        locale: string,  // 地区
        platform: string,// 平台
        sdkVersion: string,// SDK 版本号
    }
}