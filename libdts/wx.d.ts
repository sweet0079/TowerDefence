declare var wx: wx
interface wx {
    showShareMenu:wx.showShareMenu
    getUserInfo:wx.getUserInfo
    login:wx.login
    setUserCloudStorage:wx.setUserCloudStorage
    postMessage:wx.postMessage
    getUserCloudStorage:wx.getUserCloudStorage
    getFriendCloudStorage:wx.getUserCloudStorage
    onMessage:_li.errCallBack
    createImage:norCallBack
    onShareAppMessage:_li.errCallBack
    shareAppMessage:ShareAppMessage
    vibrateShort:vibrateShort
    vibrateLong:vibrateLong
}

declare namespace wx {
    interface vibrateLong{
        (para:vibrateShortAug):void
    }
    interface vibrateShort{
        (para:vibrateShortAug):void
    }
    interface ShareAppMessage{
        (para:ShareAppMessageAug):void
    }
    interface getUserCloudStorage{
        (para:getUserCloudStorageAug):void
    }
    interface postMessage{
        (para:any):void
    }
    interface setUserCloudStorage{
        (para:setUserCloudStorageAug):void
    }
    interface login{
        (para:loginAug):void
    }
    interface getUserInfo{
        (para:getUserInfoAug):void
    }
    interface showShareMenu {
        (para:showShareMenuAug):void
    }
    interface vibrateShortAug{
        success: _li.errCallBack
        fail: _li.errCallBack
        complete: _li.errCallBack
    }
    interface ShareAppMessageAug{
        title: string
        imageUrl: string
    }
    interface getUserCloudStorageAug{
        keyList: Array<string>
        success: _li.errCallBack
        fail: _li.errCallBack
        complete: _li.errCallBack
    }
    interface loginAug{
        success: _li.errCallBack
    }
    interface setUserCloudStorageAug{
        KVDataList:Array<any>
        success: _li.errCallBack
        fail: _li.errCallBack
        complete: _li.errCallBack
    }
    interface getUserInfoAug{
        openIdList:Array<string>
        lang:string
        success: _li.errCallBack
        fail: _li.errCallBack
        complete: _li.errCallBack
    }
    interface showShareMenuAug {
        withShareTicket:boolean
        success: _li.errCallBack
        fail: _li.errCallBack
        complete: _li.errCallBack
    }
}